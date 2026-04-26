<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Services\UserService;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{

    // 依存性注入
    public function __construct(private UserService $userService) {}

    /**
     * ユーザー情報取得
     * @apiResource App\Http\Resources\UserResource
     * @apiResourceModel App\Models\User
     */
    function me(Request $request)
    {
        return response()->json(new UserResource($request->user()), 200);
    }

    /** ユーザー情報更新 
     * @apiResource App\Http\Resources\UserResource
     * @apiResourceModel App\Models\User
     * @param UserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    function update(UserRequest $request)
    {
        $validated = $request->validated();
        list($result, $status) = $this->userService->update(Auth::id(), $validated);
        return response()->json(new UserResource($result), $status);
    }
}
