<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaystackController;

Route::post('/paystack/verify', [PaystackController::class, 'verify']);
Route::post('/paystack/webhook', [PaystackController::class, 'webhook']);
