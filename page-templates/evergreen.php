<?php /* Template Name: Evergreen Page */
/**
 * The template for displaying evergreen pages.
 *
 * To generate specific templates for your pages you can use:
 * /mytheme/views/page-mypage.twig
 * (which will still route through this PHP file)
 * OR
 * /mytheme/page-mypage.php
 * (in which case you'll want to duplicate this file and save to the above path)
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

use Timber\Timber;
use Timber\Post as TimberPost;

/**
 * Add custom css class for body element hook.
 *
 * @param array $classes Array of css classes passed by the hook.
 *
 * @return array
 */
function add_body_classes_for_evergreen_page( $classes ) {
	$classes[] = 'white-bg';
	return $classes;
}

add_filter( 'body_class', 'add_body_classes_for_evergreen_page' );

$context        = Timber::get_context();
$post           = new TimberPost();
$page_meta_data = get_post_meta( $post->ID );

// Retrieve P4 settings in order to check that we add only categories that are children of the Issues category.
$options    = get_option( 'planet4_options' );
$categories = get_the_category( $post->ID );
$category   = count( $categories ) > 0 ? $categories[0] : null;

// Handle navigation links.
if ( $category && $category->parent === (int) $options['issues_parent_category'] ) {
	// Get Issue.
	$issue = get_page_by_title( $category->name );                  // Category and Issue need to have the same name.
	if ( $issue ) {
		$context['issue'] = [
			'name' => $issue->post_title,
			'link' => get_permalink( $issue ),
		];
	}

	// Get Campaigns.
	$page_tags = wp_get_post_tags( $post->ID );
	$tags      = [];

	if ( is_array( $page_tags ) && $page_tags ) {
		foreach ( $page_tags as $page_tag ) {
			$tags[] = [
				'name' => $page_tag->name,
				'link' => get_tag_link( $page_tag ),
			];
		}
		$context['campaigns'] = $tags;
	}
}

$context['page']                = $post;
$context['header_title']        = is_front_page() ? '' : ( $page_meta_data['p4_title'][0] ?? $post->title );
$context['header_subtitle']     = $page_meta_data['p4_subtitle'][0] ?? '';
$context['header_description']  = $page_meta_data['p4_description'][0] ?? '';
$context['header_button_title'] = $page_meta_data['p4_button_title'][0] ?? '';
$context['header_button_link']  = $page_meta_data['p4_button_link'][0] ?? '';
$context['background_image']    = wp_get_attachment_url( get_post_meta( get_the_ID(), 'background_image_id', 1 ) );

Timber::render( array( 'evergreen.twig' ), $context );
