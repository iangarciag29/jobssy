<?php

namespace App\GraphQL\Mutations\Offerer;

use App\Models\Offerer;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class CreateOffererProfileMutation extends Mutation
{

    /**
     * Mutation details.
     */
    protected $attributes = [
        'name' => 'createOffererProfile',
        'description' => 'Creates a new offerer profile.'
    ];

    /**
     * Mutation type.
     */
    public function type(): GraphQLType
    {
        return GraphQL::type('Offerer');
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
            'description' => [
                'name' => 'description',
                'type' => Type::nonNull(Type::string()),
            ],
        ];
    }

    /**
     * Mutation resolver.
     * @param * $root The object this resolve method belongs to.
     * @param array $args Mutation arguments.
     * @throws Exception
     */
    public function resolve($root, $args): Offerer
    {
        $user = User::find($args['user_id']);
        if (!$user) throw new Error('[!] A User ID is required.');
        if ($user->is_offerer) throw new Error("You are already an offerer.");
        $offerer = new Offerer();
        $offerer->id = uniqid("", true);
        $offerer->rating = 0;
        $offerer->jobs_completed = 0;
        $offerer->user_id = $args['user_id'];
        $offerer->start_time = Carbon::now()->toDateString();
        $offerer->description = $args['description'];
        $offerer->save();
        $user->is_offerer = 1;
        $user->save();
        return $offerer;
    }
}
