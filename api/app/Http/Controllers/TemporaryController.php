<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use App\Models\User;

class TemporaryController extends Controller
{
    function createTestUser()
    {
        $result = User::create([
            'name' => 'テストユーザー',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);
        return response()->json($result, 200);
    }
}
