<?php

namespace App\Console\Commands;

use App\Services\TodoService;
use Illuminate\Console\Command;

class SendReminderMailsCommand extends Command
{
    /**
     * artisanコマンドの名前
     * @var string
     */
    protected $signature = 'todo:send-reminders';

    /**
     * artisanコマンドの説明
     * @var string
     */
    protected $description = 'リマインド日時を過ぎた未送信のTODOに対してリマインドメールを送信する';

    /**
     * artisanコマンドを実行する
     */
    public function handle(TodoService $todoService): int
    {
        $todoService->sendReminders();

        $this->info('リマインドメールの送信処理が完了しました。');

        return Command::SUCCESS;
    }
}
