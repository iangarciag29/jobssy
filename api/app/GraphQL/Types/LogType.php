<?php

namespace App\GraphQL\Types;

use App\Models\Logs;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

class LogType extends GraphQLType
{

    protected $attributes = [
        'name' => 'Log',
        'description' => 'State logger for job state transactions.',
        'model' => Logs::class
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::id()),
                'description' => 'ID of log.'
            ],
            'job' => [
                'type' => GraphQL::type('Job'),
                'description' => 'Job related to the LOG.'
            ],
            'state_from' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Previous state.'
            ],
            'state_to' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Next state.'
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
