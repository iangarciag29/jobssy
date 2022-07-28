<?php

namespace App\GraphQL\Mutations\Job;

use App\Models\Address;
use App\Models\Job;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class UpdateJobMutation extends Mutation
{

    /**
     * @var string[] Mutation details.
     */
    protected $attributes = [
        'name' => 'updateJob',
        'description' => 'Updates a job.'
    ];

    /**
     * @return Type Mutation model type.
     */
    public function type(): Type
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
     * @param $root Mutation root object.
     * @param $args Mutation arguments.
     * @return Job
     */
    public function resolve($root, $args): Job
    {
        $job = Job::findOrFail($args['id']);
        $job->title = $args['title'];
        $job->description = $args['description'];
        $job->price = $args['price'];
        $job->currency = $args['currency'];
        $job->save();

        return $job;
    }
}
