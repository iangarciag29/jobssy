<?php

namespace App\GraphQL\Types;

use App\Models\Post;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

class PostType extends GraphQLType
{

    protected $attributes = [
        'name' => 'Post',
        'description' => 'User\'s post looking for a job to be done.',
        'model' => Post::class
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::id()),
                'description' => 'ID of the post.'
            ],
            'user' => [
                'type' => GraphQL::type('User'),
                'description' => 'Author of the post.'
            ],
            'title' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Post title.'
            ],
            'slug' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Post slug.'
            ],
            'description' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Post description.'
            ],
            'price' => [
                'type' => Type::nonNull(Type::float()),
                'description' => 'Post requested price.'
            ],
            'visible' => [
                'type' => Type::nonNull(Type::boolean()),
                'description' => 'Post visibility.'
            ],
            'currency' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Post requested price currency.'
            ],
            'bids' => [
                'type' => Type::listOf(GraphQL::type('Bid')),
                'description' => 'Bids made to this post.'
            ],
            'created_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Created at date.'
            ],
            'updated_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Updated at date.'
            ],
        ];
    }
}
