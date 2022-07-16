<?php

namespace App\GraphQL\Types\enums;

use Rebing\GraphQL\Support\EnumType;

class JobStateType extends EnumType
{
    /**
     * @var array Enum type details.
     */
    protected $attributes = [
        'name' => 'JobState',
        'description' => 'Valid states that a job can have.',
        'values' => [
            'USER_CREATED' => 1,
            'OFFERER_CREATED' => 2,
            'STARTED' => 3,
            'DENIED_BY_USER' => 4,
            'DENIED_BY_OFFERER' => 5,
            'OFFERER_APPROVED' => 6,
            'USER_APPROVED' => 7,
            'PENDING_START' => 8,
            'USER_CHANGES' => 9,
            'OFFERER_CHANGES' => 10,
        ],
    ];
}
