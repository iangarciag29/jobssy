<?php

namespace App\GraphQL\Types;

use App\Models\Service;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

class ServiceType extends GraphQLType
{

    protected $attributes = [
        'name' => 'Service',
        'description' => 'Offered service.',
        'model' => Service::class
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'ID of the service.'
            ],
            'offerer' => [
                'type' => GraphQL::type('Offerer'),
                'description' => 'Offerer of the service.'
            ],
            'address' => [
                'type' => GraphQL::type('Address'),
                'description' => 'Address of the service.'
            ],
            'category' => [
                'type' => GraphQL::type('Category'),
                'description' => 'Category of the service.'
            ],
            'title' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Title of the service.'
            ],
            'description' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Description of the service.'
            ],
            'price' => [
                'type' => Type::nonNull(Type::float()),
                'description' => 'Price of the service.'
            ],
            'currency' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Currency of the service.'
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
