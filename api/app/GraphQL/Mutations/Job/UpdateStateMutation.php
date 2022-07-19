<?php

namespace App\GraphQL\Mutations\Job;

use App\Enum\JobState;
use App\Models\Job;
use App\Models\Logs;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class UpdateStateMutation extends Mutation
{

    /**
     * @var string[] Mutation details.
     */
    protected $attributes = [
        'name' => 'updateState',
        'description' => 'Updates the state of a certain job.'
    ];

    /**
     * @return GraphQLType Mutation Type.
     */
    public function type(): GraphQLType
    {
        return GraphQL::type('Job');
    }

    /**
     * @return array[] Mutation arguments.
     */
    public function args(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::nonNull(Type::int()),
            ],
            'new_state' => [
                'name' => 'new_state',
                'type' => Type::nonNull(Type::int())
            ]
        ];
    }

    /**
     * @param $root Mutation root object.
     * @param $args Mutation arguments.
     * @return Job
     */
    public function resolve($root, $args): Job
    {
        $newState = $args['new_state'];
        $job = Job::findOrFail($args['id']);
        $newLog = new Logs();
        $newLog->job_id = $job->id;
        $newLog->state_from = $job->state;
        $newLog->state_to = $newState;
        $newLog->save();
        $job->state = $newState;
        $job->save();
        return $job;
    }

    /**
     * @param JobState $state_from
     * @param JobState $state_to
     * @return bool State change is valid or not.
     */
    private function validateStateChange(JobState $state_from, JobState $state_to): bool
    {
        return true;
    }
}
