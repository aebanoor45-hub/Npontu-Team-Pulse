<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Project;

return new class extends Migration
{
    public function up(): void
    {
        // Step 1: Clean invalid statuses before applying constraint
        Project::whereNotIn('status', ['pending', 'done'])
            ->update(['status' => 'pending']);

        // Step 2: Apply constraint
        Schema::table('projects', function (Blueprint $table) {
            $table->enum('status', ['pending', 'done'])
                  ->default('pending')
                  ->change();
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('status')->change();
        });
    }
};
