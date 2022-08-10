<?php

namespace App\GraphQL\Mutations\Service;

use App\Models\Category;
use App\Models\Service;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;

class DeleteServiceMutation extends Mutation
{

    protected $attributes = [
        'name' => 'deleteService',
        'description' => 'Deletes a service.'
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
        $service = Service::findOrFail($args['id']);
        return (bool)$service->delete();
    }
}
