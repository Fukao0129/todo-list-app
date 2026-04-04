<?php

namespace App\Jobs;

use App\Models\Todo;
use App\Models\Mail as MailModel;
use App\Services\MailService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendReminderMailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @param \App\Models\Todo $todo
     */
    public function __construct(
        private Todo $todo
    ) {}

    /**
     * ジョブの実行
     */
    public function handle(MailService $mailService): void
    {
        $todo = $this->todo;

        $template = MailModel::find(config('const.mail.mail_id.reminder_mail'));

        $priorityLabels = [1 => '低', 2 => '中', 3 => '高'];

        $replacements = [
            '{{service_name}}' => config('app.name'),
            '{{user_name}}'    => $todo->user->name,
            '{{title}}'        => $todo->title,
            '{{description}}'  => $todo->description ?? '（なし）',
            '{{priority}}'     => $priorityLabels[$todo->priority] ?? '（不明）',
            '{{status}}'       => $todo->status->name ?? '（不明）',
            '{{due_date}}'     => $todo->due_date ?? '（未設定）',
            '{{todo_url}}'     => config('app.frontend_url'),
        ];

        $mailService->sendMail($template, $todo->user->email, $replacements);

        $todo->update(['reminder_sent_at' => now()]);
    }
}
