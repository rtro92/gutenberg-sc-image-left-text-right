<?php
/**
 * Plugin Name:       Sc Image Left Text Right
 * Description:       A Gutenberg block that adds a 2 column image and text section
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Myles Taylor
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       sc-image-left-text-right
 *
 * @package           create-block
 */

// Enqueue editor assets
function sc_image_left_text_right_enqueue_editor_assets() {

	wp_enqueue_script(
		'sc-fw-image-left-text-right',
		plugins_url('build/index.js', __FILE__),
		array('wp-blocks', 'wp-element', 'wp-editor'),
		filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
	);

	wp_enqueue_style(
		'sc-fw-image-left-text-right-block-editor-style',
		plugins_url('build/index.css', __FILE__),
		array(),
		filemtime(plugin_dir_path(__FILE__) . 'build/index.css')
	);
}
add_action('enqueue_block_editor_assets', 'sc_image_left_text_right_enqueue_editor_assets');



// Enqueue Front End assets
function sc_image_left_text_right_enqueue_front_end_assets() {

	wp_enqueue_style(
		'sc-fw-image-left-text-right-block-front-end-style',
		plugins_url('build/style-index.css', __FILE__),
		array(),
		filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
	);
}
add_action('wp_enqueue_scripts', 'sc_image_left_text_right_enqueue_front_end_assets');
