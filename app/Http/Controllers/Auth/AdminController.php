<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;


class AdminController extends Controller {
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

        if (!$token = auth('admins')->attempt($login)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }

    protected function createNewToken($token) {
        $user = auth('admins')->user();

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => $user,
        ]);
    }

    public function register(Request $request) {
        $user = Admin::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['status' => 200, 'user' => $user]);
    }
}
