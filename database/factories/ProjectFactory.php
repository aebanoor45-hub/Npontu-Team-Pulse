<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
   public function definition(): array
{
    return [
        // Project name with ~30 words
       'name' => fake()->words(300, true),


        // Project description with ~5 paragraphs (quite long)
        'description' => fake()->paragraphs(5, true),

        'due_date' => fake()->dateTimeBetween('now', '+1 year'),
        'status' => fake()->randomElement(['pending', 'done']),
        'created_by' => 1,
        'updated_by' => 1,
        'created_at' => now(),
        'updated_at' => now(),
    ];
    
}


    }

