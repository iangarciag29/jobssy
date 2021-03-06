<?php

namespace App\GraphQL\Mutations\Address;

use App\Models\Address;
use App\Models\User;
use Exception;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class CreateAddressMutation extends Mutation
{

    /**
     * Mutation details.
     */
    protected $attributes = [
        'name' => 'createAddress',
        'description' => 'Creates a new address.'
    ];

    /**
     * Mutation type.
     */
    public function type(): GraphQLType
    {
        return GraphQL::type('Address');
    }

    /**
     * Mutation arguments.
     */
    public function args(): array
    {
        return [
            'user_id' => [
                'name' => 'user_id',
                'type' => Type::nonNull(Type::int()),
            ],
            'first_line' => [
                'name' => 'first_line',
                'type' => Type::nonNull(Type::string()),
            ],
            'second_line' => [
                'name' => 'second_line',
                'type' => Type::string(),
            ],
            'city' => [
                'name' => 'city',
                'type' => Type::nonNull(Type::string()),
            ],
            'state' => [
                'name' => 'state',
                'type' => Type::nonNull(Type::string()),
            ],
            'country' => [
                'name' => 'country',
                'type' => Type::nonNull(Type::string()),
            ],
            'zipcode' => [
                'name' => 'zipcode',
                'type' => Type::nonNull(Type::int()),
            ],
            'latitude' => [
                'name' => 'latitude',
                'type' => Type::nonNull(Type::int()),
            ],
            'longitude' => [
                'name' => 'longitude',
                'type' => Type::nonNull(Type::int()),
            ],
        ];
    }

    /**
     * Mutation resolver.
     * @param * $root The object this resolve method belongs to.
     * @param array $args Mutation arguments.
     * @throws Exception
     */
    public function resolve($root, $args): Address
    {
        $user = User::find($args['user_id']);
        if (!$user) throw new Exception("[!] A User ID is required.");
        $address = new Address();
        $address->fill($args);
        $address->user_id = $args['user_id'];
        $address->save();
        return $address;
    }
}
