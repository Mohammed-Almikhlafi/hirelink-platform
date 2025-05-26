<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies');
            $table->foreignId('job_category_id')->constrained('job_categories');
            $table->string('title');
            $table->text('description');
            $table->string('location');
            $table->string('salary_range')->nullable();
            $table->enum('job_type', ['full-time', 'part-time', 'contract', 'internship']);
            $table->enum('status', ['open', 'closed'])->default('open');
            $table->date('application_deadline')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobs');
    }
};
