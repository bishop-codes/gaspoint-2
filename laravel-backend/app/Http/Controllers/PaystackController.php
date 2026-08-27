<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Models\Transaction;
use App\Mail\PaymentReceipt;

class PaystackController extends Controller
{
    public function verify(Request $request)
    {
        $reference = $request->input('reference');
        if (!$reference) return response()->json(['error' => 'Missing reference'], 400);

        $secret = config('services.paystack.secret') ?? env('PAYSTACK_SECRET_KEY');
        if (!$secret) return response()->json(['error' => 'PAYSTACK_SECRET_KEY missing'], 500);

        $res = Http::withToken($secret)->get("https://api.paystack.co/transaction/verify/{$reference}");
        $body = $res->json();

        if (!$res->ok()) {
            return response()->json(['error' => 'Verification failed', 'details' => $body], 502);
        }

        $tx = $body['data'] ?? null;

        if ($tx) {
            // Idempotent persistence
            $transaction = Transaction::firstOrCreate(
                ['reference' => $tx['reference']],
                [
                    'status' => $tx['status'],
                    'email' => $tx['customer']['email'] ?? null,
                    'amount' => $tx['amount'] ?? null,
                    'payload' => $tx,
                ]
            );

            // Update status if changed
            if ($transaction->status !== $tx['status']) {
                $transaction->update(['status' => $tx['status'], 'payload' => $tx]);
            }

            // Send receipt if success and email available
            $emailResult = ['sent' => false];
            $customerEmail = $tx['customer']['email'] ?? $request->input('email');
            if ($tx['status'] === 'success' && $customerEmail) {
                try {
                    Mail::to($customerEmail)->send(new PaymentReceipt($tx));
                    $emailResult = ['sent' => true];
                } catch (\Throwable $e) {
                    Log::error('Receipt send failed: ' . $e->getMessage());
                    $emailResult = ['sent' => false, 'error' => $e->getMessage()];
                }
            }

            return response()->json(['status' => $body['status'] ?? null, 'data' => $tx, 'emailResult' => $emailResult]);
        }

        return response()->json(['error' => 'No transaction data'], 500);
    }

    public function webhook(Request $request)
    {
        $signature = $request->header('x-paystack-signature');
        $secret = env('PAYSTACK_WEBHOOK_SECRET');
        $payload = $request->getContent();

        if ($secret) {
            $computed = hash_hmac('sha512', $payload, $secret);
            if (!hash_equals($computed, $signature)) {
                Log::warning('Invalid Paystack webhook signature.');
                return response()->json(['error' => 'Invalid signature'], 400);
            }
        }

        $body = $request->json()->all();
        $event = data_get($body, 'event');
        $tx = data_get($body, 'data');

        if ($tx && data_get($tx, 'reference')) {
            $reference = data_get($tx, 'reference');
            $transaction = Transaction::firstOrCreate(
                ['reference' => $reference],
                ['payload' => $tx, 'status' => data_get($tx, 'status'), 'email' => data_get($tx, 'customer.email'), 'amount' => data_get($tx, 'amount')]
            );

            // Update status
            if ($transaction->status !== data_get($tx, 'status')) {
                $transaction->update(['status' => data_get($tx, 'status'), 'payload' => $tx]);
            }

            // Optionally send receipt on successful charge
            if (data_get($tx, 'status') === 'success' && data_get($tx, 'customer.email')) {
                try {
                    Mail::to(data_get($tx, 'customer.email'))->send(new PaymentReceipt($tx));
                } catch (\Throwable $e) {
                    Log::error('Webhook receipt send failed: ' . $e->getMessage());
                }
            }
        }

        return response()->json(['received' => true]);
    }
}
