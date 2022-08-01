<?php

namespace App\Enum;

use ArchTech\Enums\Options;

/**
 * Defines all possible job states. [UTILITY CLASS]
 */
enum JobState: int
{

    use Options;

    case USER_CREATED = 1;
    case OFFERER_CREATED = 2;
    case STARTED = 3;
    case DENIED_BY_USER = 4;
    case DENIED_BY_OFFERER = 5;
    case OFFERER_APPROVED = 6;
    case USER_APPROVED = 7;
    case PENDING_START = 8;
    case USER_CHANGES = 9;
    case OFFERER_CHANGES = 10;
    case WORKING = 11;
    case FINISHED = 12;
    case CANCELLED = 13;

}
