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
        Schema::create('mails', function (Blueprint $table) {
            $table->id();
            $table->string('to')->nullable()->comment('宛先');
            $table->string('cc')->nullable()->comment('cc');
            $table->string('bcc')->nullable()->comment('bcc');
            $table->string('title')->comment('タイトル');
            $table->string('body')->comment('本文');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mails');
    }
};
