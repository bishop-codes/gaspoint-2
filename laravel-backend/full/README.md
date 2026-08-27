# GasPoint Laravel Backend

This is the Laravel backend for the GasPoint payment flow.

## Features
- Paystack verification endpoint: `POST /api/paystack/verify`
- Paystack webhook endpoint with HMAC signature validation: `POST /api/paystack/webhook`
- Transaction persistence and idempotency using a `transactions` table
- Email receipts via Laravel mailers and `PaymentReceipt` mailable
- Uses server-side secret keys only in `.env`

## Setup

1. Copy `.env.example` to `.env` and fill in real values.
2. Run migrations:

```bash
php artisan migrate
```

3. Start the app:

```bash
php artisan serve
```

## Required environment values

```env
PAYSTACK_SECRET_KEY=sk_test_xxx
PAYSTACK_WEBHOOK_SECRET=whsec_xxx

MAIL_MAILER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=your_smtp_user
MAIL_PASSWORD=your_smtp_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=no-reply@example.com
MAIL_FROM_NAME="GasPoint"
```

## Frontend integration

Set this in your Next.js app:

```env
NEXT_PUBLIC_LARAVEL_URL=https://your-laravel-backend.example
```

Then the frontend will call:

```text
${NEXT_PUBLIC_LARAVEL_URL}/api/paystack/verify
```

## Deployment notes
- Keep the Paystack secret key and webhook secret in Laravel `.env` only.
- Expose the Laravel app with HTTPS.
- Add the webhook URL in Paystack dashboard: `https://your-laravel-domain/api/paystack/webhook`.

