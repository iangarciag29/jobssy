<?php

namespace App\GraphQL\Queries\Service;

use App\Models\Service;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class ServicesQuery extends Query
{

    protected $attributes = [
        'name' => 'services'
    ];

    public function type(): Type
    {
        return Type::listOf(GraphQL::type('Service'));
    }

    public function resolve($root, $args)
    {
        return Service::all();
    }

}
