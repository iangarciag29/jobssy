<?php

namespace App\GraphQL\Types;

use App\Models\Category;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

class CategoryType extends GraphQLType
{

    protected $attributes = [
        'name' => 'Category',
        'description' => 'Offerer service category.',
        'model' => Category::class
    ];


    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::id()),
                'description' => 'ID of the category.'
            ],
            'name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Name of the category.'
            ],
            'services' => [
                'type' => Type::listOf(GraphQL::type('Service')),
                'description' => 'List of all category services.'
            ],
            'created_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Bid creation date.'
            ],
            'updated_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Last time bid was updated.'
            ]
        ];
    }
}
