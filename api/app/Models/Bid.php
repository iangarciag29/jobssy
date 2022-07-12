<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    use HasFactory;

    public function post(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->belongsTo(Post::class, 'post_id');
    }

    public function offerer() {
        return $this->belongsTo(Offerer::class, 'offerer_id');
    }
}
