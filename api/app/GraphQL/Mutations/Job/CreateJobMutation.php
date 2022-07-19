<?php

namespace App\GraphQL\Mutations\Job;

use App\Enum\JobState;
use App\Models\Job;
use App\Models\Rate;
use Exception;
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
            'rate_id' => [
                'name' => 'rate_id',
                'type' => Type::nonNull(Type::int()),
            ],
            'user_id' => [
                'name' => 'user_id',
                'type' => Type::nonNull(Type::int()),
            ],
            'offerer_id' => [
                'name' => 'offerer_id',
                'type' => Type::nonNull(Type::int()),
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
     * @throws Exception
     */
    public function resolve($root, $args): Job
    {
        $rate = Rate::find($args['rate_id']);
        $user = Rate::find($args['user_id']);
        $offerer = Rate::find($args['offerer_id']);
        if (!$rate) throw new Exception('[!] A Rate ID is needed.');
        if (!$user) throw new Exception('[!] A User ID is needed.');
        if (!$offerer) throw new Exception('[!] An Offerer ID is needed.');
        $job = new Job();
        $job->fill($args);
        $job->rate_id = $args['rate_id'];
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
