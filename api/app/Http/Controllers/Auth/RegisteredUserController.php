<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserSignupRequest;
use App\Models\Address;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(UserSignupRequest $request): JsonResponse
    {
        $validated = $request->validated();
        if (!$validated) return response()->json([
            "success" => false,
            "message" => "Validation failed.",
        ]);

        $address = new Address();
        $address->id = uniqid("", true);
        $address->name = $request->address_name;
        $address->latitude = $request->address_lat;
        $address->longitude = $request->address_lng;

        $user = User::create([
            'id' => uniqid("", true),
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'cellphone' => $request->cellphone,
            'gender' => $request->gender,
            'birthdate' => $request->birthdate,
        ]);

        $address->user_id = $user->id;

        $address->save();

        event(new Registered($user));
        Auth::login($user);
        return response()->json([
            "success" => true
        ]);
    }
}
