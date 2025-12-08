<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Mail as MailModel;
use App\Services\MailService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PasswordService
{
    /** パスワード更新 
     * @param array $request
     * @param \App\Models\User $user
     * @return array
     */
    public function update($request, $user)
    {
        DB::beginTransaction();
        try {
            $user->update([
                'password' => Hash::make($request['new_password']),
            ]);
            $res = true;
            $status = Response::HTTP_OK;
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $res = ['error' => $e->getMessage()];
            $status = Response::HTTP_INTERNAL_SERVER_ERROR;
        }
        return [$res, $status];
    }

    /** パスワード更新通知メール送信 
     * @return array
     */
    public function sendPasswordUpdatedMail()
    {
        DB::beginTransaction();
        try {

            $template = MailModel::where('id', config('const.mail.mail_id.password_changed_mail'))->first();

            $replacements = [
                '{{service_name}}' => config('app.name'),
                '{{user_name}}' => Auth::user()->name,
                '{{password_reset_url}}' => config("app.url") . "/forgot-password"
            ];

            $userEmail = Auth::user()->email;

            $service = app(MailService::class);
            $service->sendMail($template, $userEmail, $replacements, [], []);

            $res = true;
            $status = Response::HTTP_OK;
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $res = ['error' => $e->getMessage()];
            $status = Response::HTTP_INTERNAL_SERVER_ERROR;
        }
        return [$res, $status];
    }

    /** パスワードリセット 
     * @param \App\Models\User $user
     * @param string $password
     * @return array
     */
    public function resetPassword($user, $password)
    {
        DB::beginTransaction();
        try {
            $user->forceFill([
                'password' => Hash::make($password),
                'remember_token' => Str::random(60), // セッションハイジャック防止のためトークン更新
            ])->save();

            $res = true;
            $status = Response::HTTP_OK;
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $res = ['error' => $e->getMessage()];
            $status = Response::HTTP_INTERNAL_SERVER_ERROR;
        }
        return [$res, $status];
    }
}
