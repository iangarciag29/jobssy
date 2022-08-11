<?php

namespace App\GraphQL\Queries\Offerer;

use App\Models\Offerer;
use App\Models\Rate;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class OffererQuery extends Query
{

    protected $attributes = [
        'name' => 'offerer'
    ];

    public function type(): GraphQLType
    {
        return GraphQL::type('Offerer');
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
        return Offerer::findOrFail($args['id']);
    }
}
