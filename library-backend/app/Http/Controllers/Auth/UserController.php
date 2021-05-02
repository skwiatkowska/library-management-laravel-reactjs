<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller {
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    public function login() {
        $login = request(['email', 'password']);

        if (!$token = auth('users')->attempt($login)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }


    protected function createNewToken($token) {
        $user = auth('users')->user();

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => $user,
        ]);
    }

    public function register(Request $request) {
        $ext = User::where('email', $request->email)->get();
        if ($ext->count() > 0) {
            return response()->json(['message' => 'A user with the given email address already exists'.$ext], 409);
        }

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'pesel' => $request->pesel
        ]);

        return response()->json(['message' => 'Successfully registered', 
        'user' => $user]);
    }

    public function logout() {
        auth('users')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
