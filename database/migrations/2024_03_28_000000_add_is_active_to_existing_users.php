<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Set all existing users to active
         Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_active')->default(false)->after('remember_token');
        });

        DB::table('users')->update(['is_active' => true]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No need to reverse this as the column will be dropped by the previous migration
    }
}; 