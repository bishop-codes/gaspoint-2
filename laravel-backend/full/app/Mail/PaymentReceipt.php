<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentReceipt extends Mailable
{
    use Queueable, SerializesModels;

    public $tx;
    public $amount;

    public function __construct($tx)
    {
        $this->tx = $tx;
        $this->amount = number_format(($tx['amount'] ?? 0) / 100, 2);
    }

    public function build()
    {
        return $this->subject("Payment receipt — {$this->tx['reference']}")
                    ->view('emails.receipt')
                    ->with(['tx' => $this->tx, 'amount' => $this->amount]);
    }
}
