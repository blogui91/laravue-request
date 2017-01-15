<?php

use Illuminate\Database\Seeder;
use App\Post;
class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
    	\DB::table('posts')->truncate();

    	$posts = [
    		array(
    			'title' => 'Reprehenderit dolores, aliquam dolorem facere.',
    			'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id unde nisi inventore, eveniet ut velit qui autem ipsum recusandae. Magni hic, expedita vitae quaerat impedit alias ad atque soluta eius?',
    			'user_id' => 1
    		),
    		array(
    			'title' => 'Quia, quis, quas! Necessitatibus eveniet, optio deleniti ratione aut tempore!',
    			'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam quibusdam quam dolorum vel officia ad cupiditate voluptatem obcaecati facere, ratione natus vitae labore, eveniet eos excepturi dicta dolor repudiandae fugiat.',
    			'user_id' => 1
    		)

    	];

    	foreach ($posts as $key => $post) {
    		Post::create($post);
    	}


    }
}
