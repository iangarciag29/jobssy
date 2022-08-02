<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('rate_id')->nullable();
            $table->string('user_id');
            $table->string('address_id');
            $table->string('offerer_id');
            $table->foreign('rate_id')->nullable()->references('id')->on('rates')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('offerer_id')->references('id')->on('offerers')->cascadeOnDelete();
            $table->foreign('address_id')->references('id')->on('addresses')->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->float('price');
            $table->string('currency');
            $table->integer('state');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
