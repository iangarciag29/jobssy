<?php

namespace App\GraphQL\Mutations\Rate;

use App\Models\Job;
use App\Models\Offerer;
use App\Models\Rate;
use Exception;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class CreateRateMutation extends Mutation
{

    /**
     * Mutation details.
     */
    protected $attributes = [
        'name' => 'createRate',
        'description' => 'Creates a new rate.'
    ];

    /**
     * Mutation type.
     */
    public function type(): GraphQLType
    {
        return GraphQL::type('Rate');
    }

    /**
     * Mutation arguments.
     */
    public function args(): array
    {
        return [
            'offerer_id' => [
                'name' => 'offerer_id',
                'type' => Type::nonNull(Type::id()),
            ],
            'job_id' => [
                'name' => 'job_id',
                'type' => Type::nonNull(Type::id()),
            ],
            'value' => [
                'name' => 'value',
                'type' => Type::nonNull(Type::int()),
            ],
            'comment' => [
                'name' => 'comment',
                'type' => Type::nonNull(Type::string()),
            ],
            'anonymous' => [
                'name' => 'anonymous',
                'type' => Type::nonNull(Type::boolean()),
            ]
        ];
    }

    /**
     * Mutation resolver.
     * @param * $root The object this resolve method belongs to.
     * @param array $args Mutation arguments.
     * @throws Exception
     */
    public function resolve($root, array $args): Rate
    {
        if (!$this->validateValue($args['value'])) throw new Error('The rate value must be between 1-5.');
        $offerer = Offerer::find($args['offerer_id']);
        if (!$offerer) throw new Error('An Offerer ID is required.');
        $job = Job::find($args['job_id']);
        if (!$job) throw new Error('A Job ID is required.');
        $rate = new Rate();
        $rate->id = uniqid("", true);
        $rate->offerer_id = $offerer->id;
        $rate->value = $args['value'];
        $rate->comment = $args['comment'];
        $rate->anonymous = $args['anonymous'];
        $rate->save();
        $job->rate_id = $rate->id;
        $job->save();
        $offerer->rating = Rate::where("offerer_id", $args['offerer_id'])->avg('value');
        $offerer->save();
        return $rate;
    }

    /**
     * Checks if the passed rate value is valid.
     * @param int $value Rate input value.
     */
    private function validateValue(int $value): bool
    {
        return $value > 0 && $value <= 5;
    }
}
