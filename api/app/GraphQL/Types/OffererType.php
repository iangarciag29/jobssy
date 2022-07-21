<?php

namespace App\GraphQL\Types;


use App\Models\Offerer;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

class OffererType extends GraphQLType
{

    protected $attributes = [
        'name' => 'Offerer',
        'description' => 'User\'s offerer profile.',
        'model' => Offerer::class
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::id()),
                'description' => 'ID of the offerer profile.'
            ],
            'rating' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Offerer\'s rating.'
            ],
            'user' => [
                'type' => GraphQL::type('User'),
                'description' => 'Offerer\'s user details.'
            ],
            'bids' => [
                'type' => Type::listOf(GraphQL::type('Bid')),
                'description' => 'Offerer\'s placed bids.'
            ],
            'description' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Offerer\'s profile description.'
            ],
            'rates' => [
                'type' => Type::listOf(GraphQL::type('Rate')),
                'description' => 'Offerer\'s rates.'
            ],
            'services' => [
                'type' => Type::listOf(GraphQL::type('Service')),
                'description' => 'Offerer\'s services.'
            ],
            'start_time' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Profile creation date.'
            ],
            'jobs_completed' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Amount of jobs completed.'
            ],
            'created_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Created at date.'
            ],
            'updated_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Updated at date.'
            ],
        ];
    }

}
