<?php

namespace App\GraphQL\Mutations\Log;

use App\Models\Job;
use App\Models\Logs;
use Exception;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class CreateLogMutation extends Mutation
{

    /**
     * Mutation details.
     */
    protected $attributes = [
        'name' => 'createLog',
        'description' => 'Creates a new log.'
    ];

    /**
     * Mutation type.
     */
    public function type(): GraphQLType
    {
        return GraphQL::type('Log');
    }

    /**
     * Mutation arguments.
     */
    public function args(): array
    {
        return [
            'job_id' => [
                'name' => 'job_id',
                'type' => Type::nonNull(Type::int()),
            ],
            'state_from' => [
                'name' => 'state_from',
                'type' => Type::nonNull(Type::int()),
            ],
            'state_to' => [
                'name' => 'state_to',
                'type' => Type::nonNull(Type::int()),
            ],
        ];
    }

    /**
     * Mutation resolver.
     * @param * $root The object this resolve method belongs to.
     * @param array $args Mutation arguments.
     * @throws Exception
     */
    public function resolve($root, $args): Logs
    {
        $job = Job::find($args['job_id']);
        if (!$job) throw new Exception('[!] A Job ID is required.');
        $log = new Logs();
        $log->fill($args);
        $log->job_id = $args['job_id'];
        $log->save();
        return $log;
    }
}
