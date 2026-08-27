Deployment notes

- Host the Laravel app on a stable PHP host (Laravel Forge, DigitalOcean App Platform, Render, Heroku, etc.).
- Ensure `.env` contains real `DB_*`, `PAYSTACK_SECRET_KEY`, `PAYSTACK_WEBHOOK_SECRET`, and `MAIL_*` values.
- Expose webhook endpoint `https://your-backend.example/api/paystack/webhook` to Paystack dashboard and set the webhook secret.
- In Paystack dashboard, configure webhooks and set webhook signing secret to `PAYSTACK_WEBHOOK_SECRET`.
- Set CORS to permit the Next.js frontend origin.

Vercel/Next deployment

- Set `NEXT_PUBLIC_LARAVEL_URL` in Vercel environment variables to the public URL of your Laravel backend.
- Continue to keep Paystack secret key only in Laravel `.env`.
