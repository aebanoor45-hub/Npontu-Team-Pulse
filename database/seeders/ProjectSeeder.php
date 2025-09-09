<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::truncate(); // clear old data

        Project::create([
            'name' => 'Website Redesign',
            'description' => 'Redesign the company website with modern UI.',
            'status' => 'pending',
            'due_date' => now()->addDays(10),
            'created_by' => 1,
            'updated_by' => 1,
        ]);

        Project::create([
            'name' => 'Marketing Campaign',
            'description' => 'Launch social media ads for new product.',
            'status' => 'done',
            'due_date' => now()->subDays(5),
            'created_by' => 1,
            'updated_by' => 1,
        ]);
         Project::create([
            'name' => 'Marketing Campaign',
            'description' => 'Launch social media ads for new product.',
            'status' => 'done',
            'due_date' => now()->subDays(5),
            'created_by' => 1,
            'updated_by' => 1,
        ]); Project::create([
            'name' => 'Marketing Campaign',
            'description' => 'Launch social media ads for new product.',
            'status' => 'done',
            'due_date' => now()->subDays(5),
            'created_by' => 1,
            'updated_by' => 1,
        ]);
    }
}
