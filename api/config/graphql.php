<?php

declare(strict_types=1);

use App\GraphQL\Mutations\Address\CreateAddressMutation;
use App\GraphQL\Mutations\Address\DeleteAddressMutation;
use App\GraphQL\Mutations\Bid\CreateBidMutation;
use App\GraphQL\Mutations\Category\CreateCategoryMutation;
use App\GraphQL\Mutations\Category\DeleteCategoryMutation;
use App\GraphQL\Mutations\Job\CreateJobMutation;
use App\GraphQL\Mutations\Job\UpdateJobMutation;
use App\GraphQL\Mutations\Job\UpdateStateMutation;
use App\GraphQL\Mutations\Log\CreateLogMutation;
use App\GraphQL\Mutations\Offerer\CreateOffererProfileMutation;
use App\GraphQL\Mutations\Post\CreatePostMutation;
use App\GraphQL\Mutations\Post\TogglePostVisibilityMutation;
use App\GraphQL\Mutations\Rate\CreateRateMutation;
use App\GraphQL\Mutations\Service\CreateServiceMutation;
use App\GraphQL\Mutations\Service\DeleteServiceMutation;
use App\GraphQL\Mutations\User\UpdateAddressMutation;
use App\GraphQL\Queries\Address\AddressesQuery;
use App\GraphQL\Queries\Address\AddressQuery;
use App\GraphQL\Queries\Bid\BidQuery;
use App\GraphQL\Queries\Bid\BidsQuery;
use App\GraphQL\Queries\Category\CategoriesQuery;
use App\GraphQL\Queries\Category\CategoryQuery;
use App\GraphQL\Queries\Job\JobQuery;
use App\GraphQL\Queries\Job\JobsByEntityQuery;
use App\GraphQL\Queries\Job\JobsQuery;
use App\GraphQL\Queries\Log\LogsQuery;
use App\GraphQL\Queries\Offerer\FilteredOfferersQuery;
use App\GraphQL\Queries\Offerer\OffererByUserQuery;
use App\GraphQL\Queries\Offerer\OffererQuery;
use App\GraphQL\Queries\Offerer\OfferersQuery;
use App\GraphQL\Queries\Post\PostQuery;
use App\GraphQL\Queries\Post\PostsQuery;
use App\GraphQL\Queries\Rate\RateQuery;
use App\GraphQL\Queries\Rate\RatesQuery;
use App\GraphQL\Queries\Service\ServiceQuery;
use App\GraphQL\Queries\Service\ServicesQuery;
use App\GraphQL\Queries\User\UserQuery;
use App\GraphQL\Queries\User\UsersQuery;
use App\GraphQL\Types\AddressType;
use App\GraphQL\Types\BidType;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\DashboardDataType;
use App\GraphQL\Types\enums\JobStateType;
use App\GraphQL\Types\JobType;
use App\GraphQL\Types\LogType;
use App\GraphQL\Types\OffererType;
use App\GraphQL\Types\PostType;
use App\GraphQL\Types\RateType;
use App\GraphQL\Types\ServiceType;
use App\GraphQL\Types\UserType;
use Rebing\GraphQL\GraphQL;
use Rebing\GraphQL\GraphQLController;
use Rebing\GraphQL\Support\ExecutionMiddleware\AddAuthUserContextValueMiddleware;
use Rebing\GraphQL\Support\ExecutionMiddleware\AutomaticPersistedQueriesMiddleware;
use Rebing\GraphQL\Support\ExecutionMiddleware\ValidateOperationParamsMiddleware;
use Rebing\GraphQL\Support\PaginationType;
use Rebing\GraphQL\Support\SimplePaginationType;

return [
    'route' => [
        // The prefix for routes; do NOT use a leading slash!
        'prefix' => 'graphql',

        // The controller/method to use in GraphQL request.
        // Also supported array syntax: `[\Rebing\GraphQL\GraphQLController::class, 'query']`
        'controller' => GraphQLController::class . '@query',

        // Any middleware for the graphql route group
        // This middleware will apply to all schemas
        'middleware' => [],
        'method' => ['GET', 'POST', 'OPTIONS'],

        // Additional route group attributes
        //
        // Example:
        //
        // 'group_attributes' => ['guard' => 'api']
        //
        'group_attributes' => [],
    ],

    // The name of the default schema
    // Used when the route group is directly accessed
    'default_schema' => 'default',

    'batching' => [
        // Whether to support GraphQL batching or not.
        // See e.g. https://www.apollographql.com/blog/batching-client-graphql-queries-a685f5bcd41b/
        // for pro and con
        'enable' => true,
    ],

    // The schemas for query and/or mutation. It expects an array of schemas to provide
    // both the 'query' fields and the 'mutation' fields.
    //
    // You can also provide a middleware that will only apply to the given schema
    //
    // Example:
    //
    //  'schemas' => [
    //      'default' => [
    //          'controller' => MyController::class . '@method',
    //          'query' => [
    //              App\GraphQL\Queries\OfferersQuery::class,
    //          ],
    //          'mutation' => [
    //
    //          ]
    //      ],
    //      'user' => [
    //          'query' => [
    //              App\GraphQL\Queries\ProfileQuery::class,
    //          ],
    //          'mutation' => [
    //
    //          ],
    //          'middleware' => ['auth'],
    //      ],
    //      'user/me' => [
    //          'query' => [
    //              App\GraphQL\Queries\MyProfileQuery::class,
    //          ],
    //          'mutation' => [
    //
    //          ],
    //          'middleware' => ['auth'],
    //      ],
    //  ]
    //
    'schemas' => [
        'default' => [
            'query' => [
                # ADDRESS MODEL
                'address' => AddressQuery::class,
                'addresses' => AddressesQuery::class,
                # USER MODEL
                'user' => UserQuery::class,
                'users' => UsersQuery::class,
                # OFFERER MODEL
                'offerer' => OffererQuery::class,
                'offererByUser' => OffererByUserQuery::class,
                'offerers' => OfferersQuery::class,
                'filteredOfferers' => FilteredOfferersQuery::class,
                # BID MODEL
                'bid' => BidQuery::class,
                'bids' => BidsQuery::class,
                # POST MODEL
                'post' => PostQuery::class,
                'posts' => PostsQuery::class,
                # JOB MODEL
                'job' => JobQuery::class,
                'jobs' => JobsQuery::class,
                'jobsByEntity' => JobsByEntityQuery::class,
                # RATE MODEL
                'rate' => RateQuery::class,
                'rates' => RatesQuery::class,
                # CATEGORY MODEL
                'category' => CategoryQuery::class,
                'categories' => CategoriesQuery::class,
                # SERVICE MODEL
                'service' => ServiceQuery::class,
                'services' => ServicesQuery::class,
                # LOG MODEL
                'logs' => LogsQuery::class,
                # INFORMATION
                'dashboardData' => \App\GraphQL\Queries\Information\DashboardDataQuery::class
            ],
            'mutation' => [
                # ADDRESS MODEL
                'createAddress' => CreateAddressMutation::class,
                'updateAddress' => UpdateAddressMutation::class,
                'deleteAddress' => DeleteAddressMutation::class,
                # BID MODEL
                'createBid' => CreateBidMutation::class,
                # CATEGORY MODEL
                'createCategory' => CreateCategoryMutation::class,
                'deleteCategory' => DeleteCategoryMutation::class,
                # POST MODEL
                'createPost' => CreatePostMutation::class,
                'togglePostVisibility' => TogglePostVisibilityMutation::class,
                # OFFERER MODEL
                'createOffererProfile' => CreateOffererProfileMutation::class,
                # RATE MODEL
                'createRate' => CreateRateMutation::class,
                # SERVICE MODEL
                'createService' => CreateServiceMutation::class,
                'deleteService' => DeleteServiceMutation::class,
                # JOB MODEL
                'createJob' => CreateJobMutation::class,
                'updateState' => UpdateStateMutation::class,
                'updateJob' => UpdateJobMutation::class,
                # LOG MODEL
                'createLog' => CreateLogMutation::class,
            ],
            // The types only available in this schema
            'types' => [
                # MODELS
                'Address' => AddressType::class,
                'User' => UserType::class,
                'Offerer' => OffererType::class,
                'Bid' => BidType::class,
                'Post' => PostType::class,
                'Job' => JobType::class,
                'Rate' => RateType::class,
                'Category' => CategoryType::class,
                'Log' => LogType::class,
                'Service' => ServiceType::class,
                'DashboardData' => DashboardDataType::class,
                # ENUM
                JobStateType::class
            ],

            // Laravel HTTP middleware
            'middleware' => [],

            // Which HTTP methods to support; must be given in UPPERCASE!
            'method' => ['GET', 'POST', 'OPTIONS'],

            // An array of middlewares, overrides the global ones
            'execution_middleware' => null,
        ],
    ],

    // The global types available to all schemas.
    // You can then access it from the facade like this: GraphQL::type('user')
    //
    // Example:
    //
    // 'types' => [
    //     App\GraphQL\Types\UserType::class
    // ]
    //
    'types' => [
        // ExampleType::class,
        // ExampleRelationType::class,
        // \Rebing\GraphQL\Support\UploadType::class,
    ],

    // The types will be loaded on demand. Default is to load all types on each request
    // Can increase performance on schemes with many types
    // Presupposes the config type key to match the type class name property
    'lazyload_types' => true,

    // This callable will be passed the Error object for each errors GraphQL catch.
    // The method should return an array representing the error.
    // Typically:
    // [
    //     'message' => '',
    //     'locations' => []
    // ]
    'error_formatter' => [GraphQL::class, 'formatError'],

    /*
     * Custom Error Handling
     *
     * Expected handler signature is: function (array $errors, callable $formatter): array
     *
     * The default handler will pass exceptions to laravel Error Handling mechanism
     */
    'errors_handler' => [GraphQL::class, 'handleErrors'],

    /*
     * Options to limit the query complexity and depth. See the doc
     * @ https://webonyx.github.io/graphql-php/security
     * for details. Disabled by default.
     */
    'security' => [
        'query_max_complexity' => null,
        'query_max_depth' => null,
        'disable_introspection' => false,
    ],

    /*
     * You can define your own pagination type.
     * Reference \Rebing\GraphQL\Support\PaginationType::class
     */
    'pagination_type' => PaginationType::class,

    /*
     * You can define your own simple pagination type.
     * Reference \Rebing\GraphQL\Support\SimplePaginationType::class
     */
    'simple_pagination_type' => SimplePaginationType::class,

    /*
     * Config for GraphiQL (see (https://github.com/graphql/graphiql).
     */
    'graphiql' => [
        'prefix' => 'graphiql', // Do NOT use a leading slash
        'controller' => GraphQLController::class . '@graphiql',
        'middleware' => [],
        'view' => 'graphql::graphiql',
        'display' => env('ENABLE_GRAPHIQL', true),
    ],

    /*
     * Overrides the default field resolver
     * See http://webonyx.github.io/graphql-php/data-fetching/#default-field-resolver
     *
     * Example:
     *
     * ```php
     * 'defaultFieldResolver' => function ($root, $args, $context, $info) {
     * },
     * ```
     * or
     * ```php
     * 'defaultFieldResolver' => [SomeKlass::class, 'someMethod'],
     * ```
     */
    'defaultFieldResolver' => null,

    /*
     * Any headers that will be added to the response returned by the default controller
     */
    'headers' => [
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Methods' => '*',
        'Access-Control-Allow-Headers' => '*'
    ],

    /*
     * Any JSON encoding options when returning a response from the default controller
     * See http://php.net/manual/function.json-encode.php for the full list of options
     */
    'json_encoding_options' => 0,

    /*
     * Automatic Persisted Queries (APQ)
     * See https://www.apollographql.com/docs/apollo-server/performance/apq/
     *
     * Note 1: this requires the `AutomaticPersistedQueriesMiddleware` being enabled
     *
     * Note 2: even if APQ is disabled per configuration and, according to the "APQ specs" (see above),
     *         to return a correct response in case it's not enabled, the middleware needs to be active.
     *         Of course if you know you do not have a need for APQ, feel free to remove the middleware completely.
     */
    'apq' => [
        // Enable/Disable APQ - See https://www.apollographql.com/docs/apollo-server/performance/apq/#disabling-apq
        'enable' => env('GRAPHQL_APQ_ENABLE', false),

        // The cache driver used for APQ
        'cache_driver' => env('GRAPHQL_APQ_CACHE_DRIVER', config('cache.default')),

        // The cache prefix
        'cache_prefix' => config('cache.prefix') . ':graphql.apq',

        // The cache ttl in seconds - See https://www.apollographql.com/docs/apollo-server/performance/apq/#adjusting-cache-time-to-live-ttl
        'cache_ttl' => 300,
    ],

    /*
     * Execution middlewares
     */
    'execution_middleware' => [
        ValidateOperationParamsMiddleware::class,
        // AutomaticPersistedQueriesMiddleware listed even if APQ is disabled, see the docs for the `'apq'` configuration
        AutomaticPersistedQueriesMiddleware::class,
        AddAuthUserContextValueMiddleware::class,
        // \Rebing\GraphQL\Support\ExecutionMiddleware\UnusedVariablesMiddleware::class,
    ],
];
