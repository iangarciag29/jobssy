<?php

namespace App\GraphQL\Queries\Rate;

use App\Models\Rate;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class RateQuery extends Query
{

    protected $attributes = [
        'name' => 'rate'
    ];

    public function type(): GraphQLType
    {
        return GraphQL::type('Rate');
    }

    public function args(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::nonNull(Type::int()),
                'rules' => ['required']
            ]
        ];
    }

    public function resolve($root, $args)
    {
        return Rate::findOrFail($args['id']);
    }
}
