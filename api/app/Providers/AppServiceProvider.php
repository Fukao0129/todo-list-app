<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // パスワードリセット画面のURLを生成
        $createUrl = function ($notifiable, $token) {
            return config("app.frontend_url") . "/forgot-password/reset?token={$token}&email={$notifiable->getEmailForPasswordReset()}";
        };

        // メール本文
        ResetPassword::toMailUsing(function ($notifiable, $token) use ($createUrl) {
            return (new MailMessage)
                ->greeting($notifiable->name . ' 様')
                ->line('いつも' . config('app.name') . 'をご利用いただき、誠にありがとうございます')
                ->subject('パスワードリセットのお手続き')
                ->line('アカウントのパスワードリセットのリクエストを受け付けました。')
                ->line('以下のボタンをクリックしてパスワードを再設定してください。')
                ->action('パスワードリセット', $createUrl($notifiable, $token))
                ->line('もしお心当たりがない場合は、このメールを無視してください。');
        });
    }
}
