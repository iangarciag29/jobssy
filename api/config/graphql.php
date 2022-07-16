<?php

declare(strict_types=1);

return [
    'route' => [
        // The prefix for routes; do NOT use a leading slash!
        'prefix' => 'graphql',

        // The controller/method to use in GraphQL request.
        // Also supported array syntax: `[\Rebing\GraphQL\GraphQLController::class, 'query']`
        'controller' => \Rebing\GraphQL\GraphQLController::class . '@query',

        // Any middleware for the graphql route group
        // This middleware will apply to all schemas
        'middleware' => ['cors'],
        'method' => ['GET', 'POST'],

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
                'address' => \App\GraphQL\Queries\Address\AddressQuery::class,
                'addresses' => \App\GraphQL\Queries\Address\AddressesQuery::class,
                # USER MODEL
                'user' => \App\GraphQL\Queries\User\UserQuery::class,
                'users' => \App\GraphQL\Queries\User\UsersQuery::class,
                # OFFERER MODEL
                'offerer' => \App\GraphQL\Queries\Offerer\OffererQuery::class,
                'offerers' => \App\GraphQL\Queries\Offerer\OfferersQuery::class,
                # BID MODEL
                'bid' => \App\GraphQL\Queries\Bid\BidQuery::class,
                'bids' => \App\GraphQL\Queries\Bid\BidsQuery::class,
                # POST MODEL
                'post' => \App\GraphQL\Queries\Post\PostQuery::class,
                'posts' => \App\GraphQL\Queries\Post\PostsQuery::class,
                # JOB MODEL
                'job' => \App\GraphQL\Queries\Job\JobQuery::class,
                'jobs' => \App\GraphQL\Queries\Job\JobsQuery::class,
                # RATE MODEL
                'rate' => \App\GraphQL\Queries\Rate\RateQuery::class,
                'rates' => \App\GraphQL\Queries\Rate\RatesQuery::class,
                # CATEGORY MODEL
                'category' => \App\GraphQL\Queries\Category\CategoryQuery::class,
                'categories' => \App\GraphQL\Queries\Category\CategoriesQuery::class,
                # SERVICE MODEL
                'service' => \App\GraphQL\Queries\Service\ServiceQuery::class,
                'services' => \App\GraphQL\Queries\Service\ServicesQuery::class,
                # LOG MODEL
                'logs' => \App\GraphQL\Queries\Log\LogsQuery::class,
            ],
            'mutation' => [
                # ADDRESS MODEL
                'createAddress' => \App\GraphQL\Mutations\Address\CreateAddressMutation::class,
                'updateAddress' => \App\GraphQL\Mutations\Address\UpdateAddressMutation::class,
                'deleteAddress' => \App\GraphQL\Mutations\Address\DeleteAddressMutation::class,
                # BID MODEL
                'createBid' => \App\GraphQL\Mutations\Bid\CreateBidMutation::class,
                # CATEGORY MODEL
                'createCategory' => \App\GraphQL\Mutations\Category\CreateCategoryMutation::class,
                # POST MODEL
                'creatPost' => \App\GraphQL\Mutations\Post\CreatePostMutation::class,
                # OFFERER MODEL
                'createOffererProfile' => \App\GraphQL\Mutations\Offerer\CreateOffererProfileMutation::class,
                # RATE MODEL
                'createRate' => \App\GraphQL\Mutations\Rate\CreateRateMutation::class,
                # SERVICE MODEL
                'createService' => \App\GraphQL\Mutations\Service\CreateServiceMutation::class,
                # JOB MODEL
                'createJob' => \App\GraphQL\Mutations\Job\CreateJobMutation::class,
                'updateState' => \App\GraphQL\Mutations\Job\UpdateStateMutation::class,
                # LOG MODEL
                'createLog' => \App\GraphQL\Mutations\Log\CreateLogMutation::class,
            ],
            // The types only available in this schema
            'types' => [
                # MODELS
                'Address' => \App\GraphQL\Types\AddressType::class,
                'User' => \App\GraphQL\Types\UserType::class,
                'Offerer' => \App\GraphQL\Types\OffererType::class,
                'Bid' => \App\GraphQL\Types\BidType::class,
                'Post' => \App\GraphQL\Types\PostType::class,
                'Job' => \App\GraphQL\Types\JobType::class,
                'Rate' => \App\GraphQL\Types\RateType::class,
                'Category' => \App\GraphQL\Types\CategoryType::class,
                'Log' => \App\GraphQL\Types\LogType::class,
                'Service' => \App\GraphQL\Types\ServiceType::class,
                # ENUM
                \App\GraphQL\Types\enums\JobStateType::class
            ],

            // Laravel HTTP middleware
            'middleware' => ['cors'],

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
    'error_formatter' => [\Rebing\GraphQL\GraphQL::class, 'formatError'],

    /*
     * Custom Error Handling
     *
     * Expected handler signature is: function (array $errors, callable $formatter): array
     *
     * The default handler will pass exceptions to laravel Error Handling mechanism
     */
    'errors_handler' => [\Rebing\GraphQL\GraphQL::class, 'handleErrors'],

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
    'pagination_type' => \Rebing\GraphQL\Support\PaginationType::class,

    /*
     * You can define your own simple pagination type.
     * Reference \Rebing\GraphQL\Support\SimplePaginationType::class
     */
    'simple_pagination_type' => \Rebing\GraphQL\Support\SimplePaginationType::class,

    /*
     * Config for GraphiQL (see (https://github.com/graphql/graphiql).
     */
    'graphiql' => [
        'prefix' => 'graphiql', // Do NOT use a leading slash
        'controller' => \Rebing\GraphQL\GraphQLController::class . '@graphiql',
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
        'Access-Control-Allow-Origin' => '*'
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
        \Rebing\GraphQL\Support\ExecutionMiddleware\ValidateOperationParamsMiddleware::class,
        // AutomaticPersistedQueriesMiddleware listed even if APQ is disabled, see the docs for the `'apq'` configuration
        \Rebing\GraphQL\Support\ExecutionMiddleware\AutomaticPersistedQueriesMiddleware::class,
        \Rebing\GraphQL\Support\ExecutionMiddleware\AddAuthUserContextValueMiddleware::class,
        // \Rebing\GraphQL\Support\ExecutionMiddleware\UnusedVariablesMiddleware::class,
    ],
];
