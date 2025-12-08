<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PasswordRequest;
use App\Services\PasswordService;
use Illuminate\Support\Facades\Password;

class PasswordController extends Controller
{

    // 依存性注入 
    public function __construct(private PasswordService $passwordService) {}

    /** パスワード更新 
     * @param PasswordRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(PasswordRequest $request)
    {
        $validated = $request->validated();
        list($result, $status) = $this->passwordService->update($validated, $request->user());

        // パスワードが更新されたらユーザーに通知する
        if ($result === true) {
            $this->passwordService->sendPasswordUpdatedMail();
        }

        return response()->json($result, $status);
    }

    /** パスワードリセットメール送信 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendPasswordResetMail(Request $request)
    {
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => __($status)]);
        }

        // ↓ メールアドレスが見つからないと本来エラーになるが、セキュリティの観点から成功のレスポンスを返す
        // return response()->json(['email' => __($status)], 422);
    }

    /** パスワードリセット 
     * @param PasswordRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function reset(PasswordRequest $request)
    {
        $validated = $request->validated();
        $status = Password::reset(
            $validated,
            function ($user, $password) {
                $this->passwordService->resetPassword($user, $password);
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => __($status)]);
        }
    }
}
