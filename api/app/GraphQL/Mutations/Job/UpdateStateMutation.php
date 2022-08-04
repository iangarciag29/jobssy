<?php

namespace App\GraphQL\Mutations\Job;

use App\Enum\JobState;
use App\Models\Job;
use App\Models\Logs;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class UpdateStateMutation extends Mutation
{

    /**
     * @var array[] Valid transaction dictionary.
     */
    private $allowedTransactions = [
        "USER_CREATED" => [JobState::OFFERER_APPROVED, JobState::CANCELLED, JobState::OFFERER_CHANGES, JobState::USER_CHANGES, JobState::DENIED_BY_OFFERER],
        "OFFERER_CREATED" => [JobState::USER_APPROVED, JobState::CANCELLED, JobState::USER_CHANGES, JobState::OFFERER_CHANGES, JobState::DENIED_BY_USER],
        "STARTED" => [JobState::WORKING, JobState::CANCELLED],
        "DENIED_BY_USER" => [],
        "DENIED_BY_OFFERER" => [],
        "OFFERER_APPROVED" => [JobState::STARTED, JobState::USER_APPROVED, JobState::USER_CHANGES, JobState::DENIED_BY_USER, JobState::CANCELLED],
        "USER_APPROVED" => [JobState::PENDING_START, JobState::OFFERER_APPROVED, JobState::OFFERER_CHANGES, JobState::DENIED_BY_OFFERER, JobState::CANCELLED],
        "PENDING_START" => [JobState::STARTED, JobState::CANCELLED],
        "USER_CHANGES" => [JobState::OFFERER_APPROVED, JobState::OFFERER_CHANGES, JobState::DENIED_BY_OFFERER, JobState::CANCELLED],
        "OFFERER_CHANGES" => [JobState::USER_APPROVED, JobState::USER_CHANGES, JobState::DENIED_BY_USER, JobState::CANCELLED],
        "WORKING" => [JobState::FINISHED, JobState::CANCELLED],
        "FINISHED" => [],
        "CANCELLED" => []
    ];


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
                'type' => Type::nonNull(Type::id()),
            ],
            'new_state' => [
                'name' => 'new_state',
                'type' => GraphQL::type('JobState')
            ],
            'author_id' => [
                'name' => 'author_id',
                'type' => Type::nonNull(Type::id())
            ]
        ];
    }

    /**
     * @param $root Mutation root object.
     * @param $args Mutation arguments.
     * @return Job
     * @throws Error
     */
    public function resolve($root, $args): Job
    {
        $newState = $args['new_state'];
        $job = Job::findOrFail($args['id']);
        if ($job->user->id != $args['author_id'] && $job->offerer->user->id != $args['author_id']) throw new Error("This author ID does not match any job's participant.");
        if (!$this->validateStateChange($job->state, $newState)) throw new Error('The desired transaction cannot be made due logic restrictions.');
        $newLog = new Logs();
        $newLog->id = uniqid("", true);
        $newLog->job_id = $job->id;
        $newLog->state_from = $job->state;
        $newLog->state_to = $newState;
        $newLog->save();
        $job->state = $newState;
        $job->save();
        return $job;
    }

    /**
     * @param int $state_from
     * @param int $state_to
     * @return bool State change is valid or not.
     */
    private function validateStateChange(int $state_from, int $state_to): bool
    {
        $allowed = false;
        foreach ($this->allowedTransactions[JobState::from($state_from)->name] as $to) {
            if ($to == JobState::from($state_to)) $allowed = true;
        }
        return $allowed;
    }
}
