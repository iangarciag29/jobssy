<?php

namespace App\GraphQL\Mutations\Job;

use App\Enum\JobState;
use App\Models\Address;
use App\Models\Job;
use App\Models\Offerer;
use App\Models\User;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class CreateJobMutation extends Mutation
{

    /**
     * Mutation details.
     */
    protected $attributes = [
        'name' => 'createJob',
        'description' => 'Creates a new job.'
    ];

    /**
     * Mutation type.
     */
    public function type(): GraphQLType
    {
        return GraphQL::type('Job');
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
            'offerer_id' => [
                'name' => 'offerer_id',
                'type' => Type::nonNull(Type::id()),
            ],
            'address_id' => [
                'name' => 'address_id',
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
            'started_by_offerer' => [
                'name' => 'started_by_offerer',
                'type' => Type::nonNull(Type::boolean()),
            ],
        ];
    }

    /**
     * Mutation resolver.
     * @param * $root The object this resolve method belongs to.
     * @param array $args Mutation arguments.
     * @throws Error
     */
    public function resolve($root, $args): Job
    {
        $user = User::findOrFail($args['user_id']);
        $offerer = Offerer::findOrFail($args['offerer_id']);
        $address = Address::findOrFail($args['address_id']);
        if (!$user) throw new Error('[!] A User ID is needed.');
        if (!$offerer) throw new Error('[!] An Offerer ID is needed.');
        if (!$address) throw new Error('[!] An Address ID is needed.');
        //if ($user->id == $offerer->user->id) throw new Error('You cannot request your own services.');
        $job = new Job();
        $job->id = uniqid("", true);
        $job->fill($args);
        $job->rate_id = null;
        $job->user_id = $args['user_id'];
        $job->offerer_id = $args['offerer_id'];
        if ($args['started_by_offerer']) {
            $job->state = JobState::OFFERER_CREATED;
        } else {
            $job->state = JobState::USER_CREATED;
        }
        $job->save();
        return $job;
    }
}
