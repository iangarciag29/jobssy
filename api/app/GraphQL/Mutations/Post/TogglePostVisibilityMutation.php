<?php

namespace App\GraphQL\Mutations\Post;

use App\Models\Post;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Mutation;

class TogglePostVisibilityMutation extends Mutation
{

    /**
     * Mutation details.
     */
    protected $attributes = [
        'name' => 'togglePostVisibility',
        'description' => 'Toggles post visibility.'
    ];

    /**
     * Mutation type.
     */
    public function type(): GraphQLType
    {
        return Type::boolean();
    }

    /**
     * Mutation arguments.
     */
    public function args(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::nonNull(Type::id()),
            ],
        ];
    }

    /**
     * Mutation resolver.
     * @param * $root The object this resolve method belongs to.
     * @param array $args Mutation arguments.
     * @throws Error
     */
    public function resolve($root, $args): bool
    {
        $post = Post::find($args['id']);
        $post->visible = !$post->visible;
        $post->save();
        return $post->visible;
    }
}
