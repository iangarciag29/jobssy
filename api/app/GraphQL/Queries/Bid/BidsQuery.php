<?php

namespace App\GraphQL\Queries\Bid;

use App\Models\Bid;
use App\Models\Offerer;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class BidsQuery extends Query
{

    protected $attributes = [
        'name' => 'bids'
    ];

    public function type(): Type
    {
        return Type::listOf(GraphQL::type('Bid'));
    }

    public function resolve($root, $args)
    {
        return Bid::all();
    }

}
