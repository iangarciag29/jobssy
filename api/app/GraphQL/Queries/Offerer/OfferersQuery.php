<?php

namespace App\GraphQL\Queries\Offerer;

use App\Models\Offerer;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class OfferersQuery extends Query
{

    protected $attributes = [
        'name' => 'offerers'
    ];

    public function type(): Type
    {
        return Type::listOf(GraphQL::type('Offerer'));
    }

    public function resolve($root, $args)
    {
        // FILTER
        // Price range (min/max)
        // Rating value+ (4+)


        return Offerer::all();
    }

}
