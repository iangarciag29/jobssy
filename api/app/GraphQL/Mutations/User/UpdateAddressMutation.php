<?php

namespace App\GraphQL\Mutations\User;

use App\Models\Address;
use App\Models\User;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class UpdateAddressMutation extends Mutation
{

    /**
     * @var string[] Mutation details.
     */
    protected $attributes = [
        'name' => 'updateAddress',
        'description' => 'Updates an address'
    ];

    /**
     * @return Type Mutation model type.
     */
    public function type(): Type
    {
        return GraphQL::type('Address');
    }

    /**
     * @return array[] Mutation arguments.
     */
    public function args(): array
    {
        return [
            'user_id' => [
                'name' => 'user_id',
                'type' => Type::nonNull(Type::id()),
            ],
            'name' => [
                'name' => 'name',
                'type' => Type::nonNull(Type::string())
            ],
            'latitude' => [
                'name' => 'latitude',
                'type' => Type::nonNull(Type::float()),
            ],
            'longitude' => [
                'name' => 'longitude',
                'type' => Type::nonNull(Type::float()),
            ],
        ];
    }

    /**
     * @param $root Mutation root object.
     * @param $args Mutation arguments.
     * @return Address
     */
    public function resolve($root, $args): Address
    {
        $user = User::findOrFail($args['user_id']);
        if (!$user) throw new Error('Couldn\'t find this user.');
        $user->address()->update([
            'name' => $args['name'],
            'latitude' => $args['latitude'],
            'longitude' => $args['longitude']
        ]);

        $address = $user->address;

        return $address;
    }
}
