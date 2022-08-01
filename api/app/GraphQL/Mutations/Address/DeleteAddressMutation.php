<?php

namespace App\GraphQL\Mutations\Address;

use App\Models\Address;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;

class DeleteAddressMutation extends Mutation
{

    protected $attributes = [
        'name' => 'deleteAddress',
        'description' => 'Deletes an address.'
    ];

    public function type(): Type
    {
        return Type::boolean();
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

    public function resolve($root, $args): bool
    {
        $address = Address::findOrFail($args['id']);
        return (bool)$address->delete();
    }
}
