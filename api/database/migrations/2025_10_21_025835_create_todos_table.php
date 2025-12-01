<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('タイトル');
            $table->string('description')->nullable()->comment('説明');
            $table->unsignedBigInteger('user_id')->comment('ユーザID');
            $table->unsignedBigInteger('status_id')->comment('ステータスID');
            $table->dateTime('due_date')->nullable()->comment('期日');
            $table->integer('priority')->default(0)->comment('優先度');
            $table->integer('is_trashed')->default(0)->comment('ゴミ箱フラグ');
            $table->dateTime('completed_at')->nullable()->comment('完了日時');
            $table->dateTime('reminder_at')->nullable()->comment('リマインド日時');
            $table->timestamps();
            $table->softDeletes();

            // 外部キー制約
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('status_id')->references('id')->on('statuses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};
