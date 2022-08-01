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
        Schema::create('rates', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('offerer_id');
            $table->foreign('offerer_id')->references('id')->on('offerers');
            $table->integer('value');
            $table->boolean('anonymous')->default(false);
            $table->text('comment')->nullable();
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
        Schema::dropIfExists('rates');
    }
};
