<?php
/**
 * Custom block to render a YouTube video embed as a background element.
 */

namespace DkooBlocks\Blocks\BackgroundVideo;

/**
 * Setup
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	add_action( 'init', $n( 'register_block' ) );
}

/**
 * Dynamic block registration
 */
function register_block() {
	register_block_type(
		'dkoo-blocks/background-video',
		[
			'render_callback' => __NAMESPACE__ . '\block_render'
		]
	);
}

function block_render( $attributes, $content ) {
	$url_fragments = preg_split("/\//", $attributes['videoUrl']);
	$video_id = end( $url_fragments );
	$video_embed_url = sprintf( 'https://www.youtube.com/embed/%1$s?controls=0&disablekb=1&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playsinline=1&webkit-playsinline=1&playlist=%1$s', $video_id );
	$next_button = '';

	if ( $attributes['showNext'] ) {
		$next_button = '<button class="next"><span class="screen-reader-text">Next</span></button></header>';
	}

	return sprintf(
		'<header class="video-background"><div class="video-foreground"><div class="video-container" id="%1$s"></div></div><div class="inner-content parallax container">%2$s</div>%3$s',
		esc_attr( $video_id ),
		wp_kses_post( $content ),
		wp_kses_post( $next_button )
	);
}
