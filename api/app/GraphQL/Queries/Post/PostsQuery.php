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

    public function args(): array
    {
        return [
            'fetch_invisible' => [
                'name' => 'fetch_invisible',
                'type' => Type::nonNull(Type::boolean()),
                'rules' => ['required']
            ]
        ];
    }

    public function resolve($root, $args): \Illuminate\Database\Eloquent\Collection
    {
        if ($args['fetch_invisible']) {
            return Post::orderBy('created_at', 'desc')->get();
        } else {
            return Post::orderBy('created_at', 'desc')->where("visible", true)->get();
        }
    }

}
