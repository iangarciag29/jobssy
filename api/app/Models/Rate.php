<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $primaryKey = 'id';

    protected $fillable = ['value', 'comment', 'anonymous'];

    public function job(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Job::class, 'rate_id', 'id');
    }

    public function offerer() {
        return $this->belongsTo(Offerer::class, 'offerer_id');
    }
}
