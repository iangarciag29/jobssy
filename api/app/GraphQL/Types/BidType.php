<?php

namespace App\GraphQL\Types;

use App\Models\Bid;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

class BidType extends GraphQLType
{

    protected $attributes = [
        'name' => 'Bid',
        'description' => 'Bid object used for posts.',
        'model' => Bid::class
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::id()),
                'description' => 'ID of the bid.'
            ],
            'offerer' => [
                'type' => GraphQL::type('Offerer'),
                'description' => 'Bid offerer.'
            ],
            'post' => [
                'type' => GraphQL::type('Post'),
                'description' => 'Post the bid was made on.'
            ],
            'amount' => [
                'type' => Type::nonNull(Type::float()),
                'description' => 'Bid amount.'
            ],
            'currency' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Currency.'
            ],
            'created_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Bid creation date.'
            ],
            'updated_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Last time bid was updated.'
            ]
        ];
    }
}
