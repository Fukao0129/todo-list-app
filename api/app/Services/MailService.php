<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Markdown;
use Resend\Laravel\Facades\Resend;

class MailService
{

    public function sendMail($template, $email_address, $replacements, $cc_address = [], $bcc_address = [])
    {
        $title = str_replace(
            array_keys($replacements),
            array_values($replacements),
            $template->title
        );

        // footerの追加
        $footer_replacements = [
            '{{chat_url}}' => config('const.mail.contact_url'),
            '{{phone}}' => config('const.mail.contact_phone')
        ];

        $body_replacement = array_merge($replacements, $footer_replacements);
        $body = str_replace(
            array_keys($body_replacement),
            array_values($body_replacement),
            $template->body . PHP_EOL . config('const.mail.footer_text')
        );

        // Markdown を HTML に変換
        $body = nl2br($body);
        $body = preg_replace_callback( // '**...**' を <strong>タグに置換。Markdownパーサの仕様上日本語では強調と認識されない場合があるため。
            '/\*\*(.+?)\*\*/u',
            function ($matches) {
                // グループ内が「http://」または「https://」で始まるなら置換せずに元のまま返す
                if (preg_match('~^https?://~', $matches[1])) {
                    return $matches[0];
                }
                return '<strong>' . $matches[1] . '</strong>';
            },
            $body
        );
        $body = Markdown::parse($body)->toHtml();

        // メールを送信する
        if (env('APP_ENV') === 'production') {
            Resend::emails()->send([
                'from' => config('mail.from.address'),
                'to' => is_array($email_address) ? $email_address : [$email_address],
                'cc' => $cc_address,
                'bcc' => $bcc_address,
                'subject' => $title,
                'html' => $body,
            ]);
            return;
        } else {
            Mail::html($body, function ($mail) use ($title, $email_address, $cc_address, $bcc_address) {
                $mail->to($email_address);
                if (!empty($cc_address)) {
                    $mail->cc($cc_address);
                }
                if (!empty($bcc_address)) {
                    $mail->bcc($bcc_address);
                }
                $mail->subject($title);
            });
        }
    }
}
