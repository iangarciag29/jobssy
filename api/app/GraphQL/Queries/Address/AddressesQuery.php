<?php

namespace App\GraphQL\Queries\Address;

use App\Models\Address;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class AddressesQuery extends Query
{

    protected $attributes = [
        'name' => 'addresses'
    ];

    public function type(): GraphQLType
    {
        return Type::listOf(GraphQL::type('Address'));
    }

    public function resolve($root, $args): \Illuminate\Database\Eloquent\Collection
    {
        return Address::all();
    }
}
