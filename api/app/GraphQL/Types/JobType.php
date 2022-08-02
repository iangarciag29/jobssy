<?php

namespace App\GraphQL\Types;

use App\Models\Job;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;


class JobType extends GraphQLType
{

    protected $attributes = [
        'name' => 'Job',
        'description' => 'Job between a user and an offerer.',
        'model' => Job::class
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::id()),
                'description' => 'ID of the job.'
            ],
            'user' => [
                'type' => GraphQL::type('User'),
                'description' => 'Job\'s client.'
            ],
            'offerer' => [
                'type' => GraphQL::type('Offerer'),
                'description' => 'Job\'s worker.'
            ],
            'address' => [
                'type' => GraphQL::type('Address'),
                'description' => 'Job\'s address.'
            ],
            'rate' => [
                'type' => GraphQL::type('Rate'),
                'description' => 'Job\'s rate given by the user.'
            ],
            'title' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Job\'s title.'
            ],
            'description' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Job\'s description.'
            ],
            'price' => [
                'type' => Type::nonNull(Type::float()),
                'description' => 'Job\'s final price.'
            ],
            'currency' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Job\'s final price currency.'
            ],
            'logs' => [
                'type' => Type::listOf(GraphQL::type('Log')),
                'description' => 'Job\'s logs.'
            ],
            'state' => [
                'type' => GraphQL::type('JobState'),
                'description' => 'Job\'s state.'
            ],
            'created_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Created at date.'
            ],
            'updated_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Updated at date.'
            ],
        ];
    }

}
