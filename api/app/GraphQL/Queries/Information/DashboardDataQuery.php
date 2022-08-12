<?php

namespace App\GraphQL\Queries\Information;

use App\Enum\JobState;
use App\Models\Bid;
use App\Models\Job;
use App\Models\Post;
use App\Models\Rate;
use App\Models\User;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class DashboardDataQuery extends Query
{
    protected $attributes = [
        'name' => 'dashboardData'
    ];

    public function type(): GraphQLType
    {
        return GraphQL::type('DashboardData');
    }

    public function args(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::nonNull(Type::id()),
                'rules' => ['required']
            ]
        ];
    }

    public function resolve($root, $args)
    {
        $active_conditions = [
            ['state', '!=', JobState::FINISHED],
            ['state', '!=', JobState::DENIED_BY_USER],
            ['state', '!=', JobState::DENIED_BY_OFFERER],
            ['user_id', $args['id']]
        ];
        $bid_count = 0;
        $rate_count = 0;
        $user = User::find($args['id']);
        if (!$user) throw new Error('Couldn\'t find the desired user.');
        if ($user->is_offerer) {
            $bid_count = $bid_count + Bid::where('offerer_id', $user->offerer->id)->count();
            $rate_count = $rate_count + Rate::where('offerer_id', $user->offerer->id)->count();
        }
        $job_count = Job::where('user_id', $args['id'])->count();
        $active_jobs_count = Job::where($active_conditions)->count();
        $active_jobs = Job::where($active_conditions)->get();
        $listings_count = Post::where('user_id', $args['id'])->count();
        $listings = Post::where('user_id', $args['id'])->get();
        return ['total_jobs' => $job_count,
            'total_bids' => $bid_count,
            'total_rates' => $rate_count,
            'total_active_jobs' => $active_jobs_count,
            'total_listings' => $listings_count,
            'active_jobs' => $active_jobs,
            'listings' => $listings,
        ];
    }
}
