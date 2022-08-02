<?php

namespace App\GraphQL\Mutations\Category;

use App\Models\Category;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;

class DeleteCategoryMutation extends Mutation
{

    protected $attributes = [
        'name' => 'deleteCategory',
        'description' => 'Deletes a categoryø.'
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
        $category = Category::findOrFail($args['id']);
        return (bool)$category->delete();
    }
}
