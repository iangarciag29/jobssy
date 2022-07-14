<?php

namespace App\GraphQL\Queries\Service;

use App\Models\Service;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class ServiceQuery extends Query
{

    protected $attributes = [
        'name' => 'service'
    ];

    public function type(): GraphQLType
    {
        return GraphQL::type('Service');
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
        return Service::findOrFail($args['id']);
    }
}
