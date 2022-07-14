<?php

namespace App\GraphQL\Queries\Job;

use App\Models\Job;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class JobsQuery extends Query
{

    protected $attributes = [
        'name' => 'jobs'
    ];

    public function type(): Type
    {
        return Type::listOf(GraphQL::type('Job'));
    }

    public function resolve($root, $args)
    {
        return Job::all();
    }
}
