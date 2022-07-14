<?php

namespace App\GraphQL\Types;

use App\Models\Rate;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

class RateType extends GraphQLType
{

    protected $attributes = [
        'name' => 'Rate',
        'description' => 'Rate given by the user to an specific job.',
        'model' => Rate::class
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'ID of the rate.'
            ],
            'offerer' => [
                'type' => GraphQL::type('Offerer'),
                'description' => 'Job worker.'
            ],
            'job' => [
                'type' => GraphQL::type('Job'),
                'description' => 'Job.'
            ],
            'value' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Rate value.'
            ],
            'comment' => [
                'type' => Type::string(),
                'description' => 'User comment about job.'
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
