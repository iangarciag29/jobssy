<?php

namespace App\GraphQL\Queries\Log;

use GraphQL\Type\Definition\Type;
use Illuminate\Support\Facades\Log;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class LogsQuery extends Query
{

    protected $attributes = [
        'name' => 'logs'
    ];

    public function type(): Type
    {
        return Type::listOf(GraphQL::type('Log'));
    }

    public function resolve($root, $args)
    {
        return Log::all();
    }

}
