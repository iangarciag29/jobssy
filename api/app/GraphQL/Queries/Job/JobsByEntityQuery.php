<?php

namespace App\GraphQL\Queries\Job;

use App\Models\Job;
use App\Models\Offerer;
use App\Models\User;
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
        $user = User::find($args['id']);
        if ($args['offerer']) {
            if (!$user || ($user && !$user->is_offerer)) return Job::where('user_id', $args['id'])->get();
            $offerer = Offerer::where('user_id', $user->id)->get()[0];
            if (!$offerer) return Job::where('user_id', $args['id'])->get();
            return Job::where('offerer_id', $offerer->id)->orWhere('user_id', $args['id'])->get();
        } else {
            return Job::where('user_id', $args['id'])->get();
        }
    }
}
