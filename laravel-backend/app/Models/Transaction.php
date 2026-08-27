<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference', 'status', 'email', 'amount', 'payload'
    ];

    protected $casts = [
        'payload' => 'array',
        'amount' => 'integer',
    ];
}
