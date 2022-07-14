<?php

namespace App\GraphQL\Queries\Job;

use App\Models\Job;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class JobQuery extends Query
{
    protected $attributes = [
        'name' => 'job'
    ];

    public function type(): GraphQLType
    {
        return GraphQL::type('Job');
    }

    public function args(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::nonNull(Type::int()),
                'rules' => ['required']
            ]
        ];
    }

    public function resolve($root, $args)
    {
        return Job::findOrFail($args['id']);
    }
}
