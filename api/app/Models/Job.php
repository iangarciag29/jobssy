<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Job extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $primaryKey = 'id';

    protected $fillable = ['rate_id', 'user_id', 'offerer_id', 'description', 'title', 'price', 'currency'];

    /**
     * @return BelongsTo User the job belongs to. [VALUE CAN NOT CHANGE]
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return BelongsTo Offerer who is making the job. [VALUE CAN NOT CHANGE]
     */
    public function offerer(): BelongsTo
    {
        return $this->belongsTo(Offerer::class, 'offerer_id');
    }

    /**
     * @return HasOne Address where the job is going to be done.
     */
    public function address(): HasOne
    {
        return $this->hasOne(Address::class);
    }

    /**
     * @return BelongsTo Rate that user gives after the job is done.
     */
    public function rate(): BelongsTo
    {
        return $this->belongsTo(Rate::class, 'rate_id');
    }

    /**
     * @return HasMany State logs that happen during the job realization.
     */
    public function logs(): HasMany
    {
        return $this->hasMany(Logs::class);
    }
}
