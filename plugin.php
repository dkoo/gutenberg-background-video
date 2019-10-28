<?php

/**
 * Plugin Name: Derrick’s Test Block
 */

define( 'DKOO_BLOCKS_VERSION', '0.0.1' );
define( 'DKOO_BLOCKS_URL', plugin_dir_url( __FILE__ ) );
define( 'DKOO_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );
define( 'DKOO_BLOCKS_INC', DKOO_BLOCKS_PATH . 'includes/' );

/**
 * Include the blocks
 */
require_once DKOO_BLOCKS_INC . 'core.php';
require_once DKOO_BLOCKS_PATH . 'blocks/index.php';

// Bootstrap.
DkooBlocks\Core\setup();
DkooBlocks\Blocks\setup();
