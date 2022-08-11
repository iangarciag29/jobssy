<?php

namespace App\GraphQL\Mutations\Bid;

use App\Models\Bid;
use App\Models\Post;
use App\Models\User;
use Exception;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class CreateBidMutation extends Mutation
{

    /**
     * Mutation details.
     */
    protected $attributes = [
        'name' => 'createBid',
        'description' => 'Creates a new bid.'
    ];

    /**
     * Mutation type.
     */
    public function type(): GraphQLType
    {
        return GraphQL::type('Bid');
    }

    /**
     * Mutation arguments.
     */
    public function args(): array
    {
        return [
            'offerer_id' => [
                'name' => 'offerer_id',
                'type' => Type::nonNull(Type::id()),
            ],
            'post_id' => [
                'name' => 'post_id',
                'type' => Type::nonNull(Type::id()),
            ],
            'amount' => [
                'name' => 'amount',
                'type' => Type::nonNull(Type::float()),
            ],
            'currency' => [
                'name' => 'currency',
                'type' => Type::string(),
            ]
        ];
    }

    /**
     * Mutation resolver.
     * @param * $root The object this resolve method belongs to.
     * @param array $args Mutation arguments.
     * @throws Exception
     */
    public function resolve($root, $args): Bid
    {
        $user = User::find($args['offerer_id']);
        $post = Post::find($args['post_id']);
        if (!$user || !$user->is_offerer) throw new Error("An Offerer is required.");
        if (!$post) throw new Error("A Post ID required.");
        $bid = new Bid();
        $bid->id = uniqid("", true);
        $bid->fill($args);
        $bid->offerer_id = $user->offerer->id;
        $bid->post_id = $args['post_id'];
        $bid->save();
        return $bid;
    }
}
