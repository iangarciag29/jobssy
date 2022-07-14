<?php

namespace App\GraphQL\Queries\Rate;

use App\Models\Rate;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class RatesQuery extends Query
{

    protected $attributes = [
        'name' => 'rates'
    ];

    public function type(): Type
    {
        return Type::listOf(GraphQL::type('Rate'));
    }

    public function resolve($root, $args)
    {
        return Rate::all();
    }

}
