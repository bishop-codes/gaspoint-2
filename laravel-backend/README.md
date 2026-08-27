# GasPoint Laravel Backend

This folder contains a ready-to-use Laravel backend scaffold to verify Paystack payments, handle webhooks, persist transactions, and send email receipts.

Overview
- Routes: `POST /api/paystack/verify` (server-side verification), `POST /api/paystack/webhook` (Paystack webhook receiver)
- Transaction persistence with idempotency (unique `reference`)
- Webhook signature validation using HMAC-SHA512
- Email receipts via Laravel `Mail` (configurable SMTP in `.env`)

Quick setup
1. Create a new Laravel project (Laravel 10+ recommended) or copy these files into your existing app.
2. Copy `.env.example` values into your Laravel `.env` and set real credentials.
3. Run migrations: `php artisan migrate`.
4. Configure `config/services.php` to include Paystack secret (see snippet below).
5. Deploy Laravel backend to a host (Heroku, DigitalOcean, Render, etc.) and ensure CORS allows requests from your Next.js frontend domain.

Config snippet for `config/services.php`:

```php
'paystack' => [
    'secret' => env('PAYSTACK_SECRET_KEY'),
],
```

Routes (add to `routes/api.php`):

```php
use App\\Http\\Controllers\\PaystackController;
Route::post('/paystack/verify', [PaystackController::class, 'verify']);
Route::post('/paystack/webhook', [PaystackController::class, 'webhook']);
```

Frontend
Set `NEXT_PUBLIC_LARAVEL_URL` in your Next.js project's environment to point at the Laravel API base URL (e.g. `https://api.gaspoint.example`). The Next frontend will post payment references to `{{NEXT_PUBLIC_LARAVEL_URL}}/api/paystack/verify`.

Security notes
- Keep `PAYSTACK_SECRET_KEY` in the Laravel `.env` only. Do not expose it to the client.
- Use HTTPS for both frontend and backend in production.
