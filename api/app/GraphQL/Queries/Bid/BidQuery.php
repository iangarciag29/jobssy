<?php

namespace App\GraphQL\Queries\Bid;

use App\Models\User;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class BidQuery extends Query
{

    protected $attributes = [
        'name' => 'bid'
    ];

    public function type(): GraphQLType
    {
        return GraphQL::type('Bid');
    }

    public function args(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::nonNull(Type::id()),
                'rules' => ['required']
            ]
        ];
    }

    public function resolve($root, $args)
    {
        return User::findOrFail($args['id']);
    }
}
