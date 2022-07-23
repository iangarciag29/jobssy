<?php

namespace App\GraphQL\Mutations\Job;

use App\Enum\JobState;
use App\Models\Job;
use App\Models\Logs;
use App\Models\Offerer;
use App\Models\User;
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
            'user_id' => [
                'name' => 'user_id',
                'type' => Type::nonNull(Type::id()),
            ],
            'offerer_id' => [
                'name' => 'offerer_id',
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
     * @throws Exception
     */
    public function resolve($root, $args): Job
    {
        $user = User::findOrFail($args['user_id']);
        $offerer = Offerer::findOrFail($args['offerer_id']);
        if (!$user) throw new Exception('[!] A User ID is needed.');
        if (!$offerer) throw new Exception('[!] An Offerer ID is needed.');
        $job = new Job();
        $log = new Logs();
        $job->id = uniqid("", true);
        $log->id = uniqid("", true);
        $job->fill($args);
        $job->rate_id = null;
        $job->user_id = $args['user_id'];
        $job->offerer_id = $args['offerer_id'];
        if ($args['started_by_offerer']) {
            $job->state = JobState::OFFERER_CREATED;
            $log->state_from = JobState::OFFERER_CREATED;
            $log->state_to = JobState::OFFERER_CREATED;
        } else {
            $job->state = JobState::USER_CREATED;
            $log->state_from = JobState::USER_CREATED;
            $log->state_to = JobState::USER_CREATED;
        }
        $job->save();
        $log->job_id = $job->id;
        $log->save();
        return $job;
    }
}
