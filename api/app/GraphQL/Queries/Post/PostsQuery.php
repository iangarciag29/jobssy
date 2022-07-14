<?php

namespace App\GraphQL\Queries\Post;

use App\Models\Post;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class PostsQuery extends Query
{

    protected $attributes = [
        'name' => 'posts'
    ];

    public function type(): Type
    {
        return Type::listOf(GraphQL::type('Post'));
    }

    public function resolve($root, $args)
    {
        return Post::all();
    }

}
