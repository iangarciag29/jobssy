<?php

namespace App\GraphQL\Queries\Offerer;

use App\Models\Offerer;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class FilteredOfferersQuery extends Query
{

    protected $attributes = [
        'name' => 'filteredOfferers'
    ];

    public function type(): Type
    {
        return Type::listOf(GraphQL::type('Offerer'));
    }

    public function args(): array
    {
        return [
            'min_rate' => [
                'name' => 'min_rate',
                'type' => Type::int(),
            ],
            'max_rate' => [
                'name' => 'max_rate',
                'type' => Type::int(),
            ],
            'jobs_done' => [
                'name' => 'jobs_done',
                'type' => Type::boolean(),
            ],
        ];
    }

    public function resolve($root, $args)
    {
        if (isset($args['min_rate']) && isset($args['max_rate'])) {
            $min_rate = $args['min_rate'];
            $max_rate = $args['max_rate'];
            $conditions = [['rating', '>=', $min_rate], ['rating', '<=', $max_rate]];
            if (isset($args['jobs_done'])) {
                return Offerer::orderBy('jobs_completed')->where($conditions)->get();
            } else {
                return Offerer::where($conditions)->get();
            }
        }
        return Offerer::all();
    }

}
