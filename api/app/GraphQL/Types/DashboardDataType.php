<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

class DashboardDataType extends GraphQLType
{

    protected $attributes = [
        'name' => 'DashboardData',
        'description' => 'Data needed for Jobssy\'s dashboard',
    ];

    public function fields(): array
    {
        return [
            'total_jobs' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Total jobs the user is related to.'
            ],
            'total_bids' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Total bid the worker has offered.'
            ],
            'total_rates' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Total rates the user has given.'
            ],
            'total_active_jobs' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Total active jobs the user has.'
            ],
            'total_listings' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Total listings the user has posted.'
            ],
            'active_jobs' => [
                'type' => Type::listOf(GraphQL::type('Job')),
                'description' => 'Active jobs by the user.'
            ],
            'listings' => [
                'type' => Type::listOf(GraphQL::type('Post')),
                'description' => 'Listings posted by the user.'
            ]
        ];
    }
}
