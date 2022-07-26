<?php

namespace App\GraphQL\Queries\Job;

use App\Models\Job;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class JobsByEntityQuery extends Query
{
    protected $attributes = [
        'name' => 'jobsByEntity'
    ];

    public function type(): GraphQLType
    {
        return Type::listOf(GraphQL::type('Job'));
    }


    public function args(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::nonNull(Type::id()),
                'rules' => ['required']
            ],
            'offerer' => [
                'name' => 'offerer',
                'type' => Type::nonNull(Type::boolean()),
                'rules' => ['required']
            ]
        ];
    }

    public function resolve($root, $args)
    {
        if ($args['offerer']) {
            return Job::where('offerer_id', $args['id'])->get();
        } else {
            return Job::where('user_id', $args['id'])->get();
        }
    }
}
