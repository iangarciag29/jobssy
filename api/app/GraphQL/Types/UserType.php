<?php

namespace App\GraphQL\Types;

use App\Models\User;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

class UserType extends GraphQLType
{

    protected $attributes = [
        'name' => 'User',
        'description' => 'Collection of users.',
        'model' => User::class
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'ID of the user.'
            ],
            'first_name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'First name.'
            ],
            'last_name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Last name.'
            ],
            'email' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Email address.'
            ],
            'email_verified_at' => [
                'type' => Type::string(),
                'description' => 'Email verification date.'
            ],
            'cellphone' => [
                'type' => Type::string(),
                'description' => 'Cellphone.'
            ],
            'gender' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Gender. [M -> Male, F -> Female, U -> Undefined]'
            ],
            'birthdate' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Birthdate.'
            ],
            'verified' => [
                'type' => Type::nonNull(Type::boolean()),
                'description' => 'Is user verified.'
            ],
            'picture' => [
                'type' => Type::string(),
                'description' => 'Profile picture URL.'
            ],
            'posts' => [
                'type' => Type::listOf(GraphQL::type('Post')),
                'description' => 'Posts that user has published.'
            ],
            'addresses' => [
                'type' => Type::listOf(GraphQL::type('Address')),
                'description' => 'Addresses that are related to user.'
            ],
            'jobs' => [
                'type' => Type::listOf(GraphQL::type('Job')),
                'description' => 'Jobs that the user is part of.'
            ]
        ];
    }
}
