<?php
/**
 * Entrypoint for custom Gutenberg blocks.
 */
namespace DkooBlocks\Blocks;

use DkooBlocks\Blocks\BackgroundVideo;

function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	add_action( 'init', $n( 'register_blocks' ) );
	add_filter( 'block_categories', $n( 'update_block_categories' ) );
}

/**
 * Helper function to register custom blocks
 */
function register_blocks() {
	require_once DKOO_BLOCKS_PATH . 'blocks/background-video/index.php';
	BackgroundVideo\register_block();
}

/**
 * Add custom block category.
 *
 * @param array $categories Default Gutenberg categories.
 * @return array
 */
function update_block_categories( $categories ) {
	return array_merge(
		[
			[
				'slug'  => 'dkoo',
				'title' => esc_html__( 'Dkoo', 'dkoo-blocks' ),
			],
		],
		$categories
	);
}
