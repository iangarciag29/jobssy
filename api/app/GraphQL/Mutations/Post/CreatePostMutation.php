<?php

namespace App\GraphQL\Mutations\Post;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Illuminate\Support\Str;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class CreatePostMutation extends Mutation
{

    /**
     * Mutation details.
     */
    protected $attributes = [
        'name' => 'createPost',
        'description' => 'Creates a new post.'
    ];

    /**
     * Mutation type.
     */
    public function type(): GraphQLType
    {
        return GraphQL::type('Post');
    }

    /**
     * Mutation arguments.
     */
    public function args(): array
    {
        return [
            'user_id' => [
                'name' => 'user_id',
                'type' => Type::nonNull(Type::id()),
            ],
            'category_id' => [
                'name' => 'category_id',
                'type' => Type::nonNull(Type::id()),
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
                'type' => Type::nonNull(Type::string()),
            ],
        ];
    }

    /**
     * Mutation resolver.
     * @param * $root The object this resolve method belongs to.
     * @param array $args Mutation arguments.
     * @throws Error
     */
    public function resolve($root, $args): Post
    {
        $user = User::find($args['user_id']);
        $category = Category::find($args['category_id']);
        if (!$user) throw new Error('A User ID is required.');
        if (!$category) throw new Error('A Category ID is required.');
        $post = new Post();
        $post->id = uniqid("", true);
        $post->fill($args);
        $post->user_id = $args['user_id'];
        $post->category_id = $args['category_id'];
        $post->slug = Str::slug($args['title'], '-');
        $post->save();
        return $post;
    }
}
