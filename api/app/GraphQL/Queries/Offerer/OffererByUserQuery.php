<?php

namespace App\GraphQL\Queries\Offerer;

use App\Models\Offerer;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class OffererByUserQuery extends Query
{

    protected $attributes = [
        'name' => 'offererByUser'
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
        $id = $args['id'];

        return Offerer::where("user_id", $id)->get()[0];
    }
}
