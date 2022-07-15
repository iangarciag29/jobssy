<?php

namespace App\GraphQL\Mutations\Service;

use App\Models\Address;
use App\Models\Category;
use App\Models\Offerer;
use App\Models\Service;
use Exception;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class CreateServiceMutation extends Mutation
{

    /**
     * Mutation details.
     */
    protected $attributes = [
        'name' => 'createService',
        'description' => 'Creates a new service.'
    ];

    /**
     * Mutation type.
     */
    public function type(): GraphQLType
    {
        return GraphQL::type('Service');
    }

    /**
     * Mutation arguments.
     */
    public function args(): array
    {
        return [
            'offerer_id' => [
                'name' => 'offerer_id',
                'type' => Type::nonNull(Type::int()),
            ],
            'address_id' => [
                'name' => 'address_id',
                'type' => Type::nonNull(Type::int()),
            ],
            'category_id' => [
                'name' => 'category_id',
                'type' => Type::nonNull(Type::int()),
            ],
            'title' => [
                'name' => 'title',
                'type' => Type::nonNull(Type::string()),
            ],
            'description' => [
                'name' => 'description',
                'type' => Type::nonNull(Type::string()),
            ],
            'price' => [
                'name' => 'price',
                'type' => Type::nonNull(Type::float()),
            ],
            'currency' => [
                'name' => 'currency',
                'type' => Type::string(),
            ],
        ];
    }

    /**
     * Mutation resolver.
     * @param * $root The object this resolve method belongs to.
     * @param array $args Mutation arguments.
     * @throws Exception
     */
    public function resolve($root, array $args): Service
    {
        $offerer = Offerer::find($args['offerer_id']);
        if (!$offerer) throw new Exception('[!] An Offerer ID is required');
        $address = Address::find($args['address_id']);
        if (!$address) throw new Exception('[!] An Address ID is required.');
        $category = Category::find($args['category_id']);
        if (!$category) throw new Exception('[!] A Category ID is required.');
        $service = new Service();
        $service->fill($args);
        $service->offerer_id = $args['offerer_id'];
        $service->address_id = $args['address_id'];
        $service->category_id = $args['category_id'];
        $service->save();
        return $service;
    }
}
