<?php
/**
 * The template for displaying a Tag page.
 *
 * Learn more: https://codex.wordpress.org/Tag_Templates
 *
 * Category <-> Issue
 * Tag <-> Campaign
 * Post <-> Action
 */

use Timber\Timber;
use P4BKS\Controllers\Blocks\Covers_Controller as Covers;
use P4BKS\Controllers\Blocks\Articles_Controller as Articles;
use P4BKS\Controllers\Blocks\ContentFourColumn_Controller as ContentFourColumn;
use P4BKS\Controllers\Blocks\CampaignThumbnail_Controller as CampaignThumbnail;
use P4BKS\Controllers\Blocks\HappyPoint_Controller as HappyPoint;

/**
 * Add custom css class for body element hook.
 *
 * @param array $classes Array of css classes passed by the hook.
 *
 * @return array
 */
function add_body_classes_for_post( $classes ) {
	$classes[] = 'white-bg page-issue-page';

	return $classes;
}
add_filter( 'body_class', 'add_body_classes_for_post' );

$templates = array( 'tag.twig', 'archive.twig', 'index.twig' );

$context = Timber::get_context();

if ( is_tag() ) {
	$context['tag']   = get_queried_object();
	$explore_page_id  = planet4_get_option( 'explore_page' );

	$posts = get_posts( [
		'posts_per_page'   => 1,
		'offset'           => 0,
		'post_parent'      => $explore_page_id,
		'post_type'        => 'page',
		'post_status'      => 'publish',
		'suppress_filters' => true,
		'tag_slug__in'     => [ $context['tag']->slug ]
	] );

	$context['category_name']   = $posts[0]->post_title ?? __( 'This Campaign is not assigned to an Issue', 'planet4-master-theme' );
	$context['category_link']   = isset( $posts[0] ) ? get_permalink( $posts[0] ) : '';
	$context['tag_name']        = single_tag_title( '', false );
	$context['tag_description'] = $context['tag']->description;
	$context['tag_image']       = get_term_meta( $context['tag']->term_id, 'tag_attachment', true );

	$context['page_category']   = $posts[0]->post_title ?? __( 'Unknown Campaign page', 'planet4-master-theme' );


	$campaign = new P4_Taxonomy_Campaign( $templates, $context );

	$campaign->add_block( Covers::BLOCK_NAME, [
		'title'       => __( 'Things you can do', 'planet4-master-theme' ),
		'description' => __( 'We want you to take action because together we\'re strong.', 'planet4-master-theme' ),
		'select_tag'  => $context['tag']->term_id,
	] );

	$campaign->add_block( Articles::BLOCK_NAME, [
		'article_heading' => __( 'In the news', 'planet4-master-theme' ),
		'article_count'   => 3,
	] );

	$campaign->add_block( ContentFourColumn::BLOCK_NAME, [
		'p4_page_type_publication' => 'true',
		'select_tag'               => $context['tag']->term_id,
	] );

	$campaign->add_block( CampaignThumbnail::BLOCK_NAME, [
		'title'       => __( 'Related Campaigns', 'planet4-master-theme' ),
		'category_id' => $category->term_id ?? __( 'This Campaign is not assigned to an Issue', 'planet4-master-theme' ),
	] );

	$campaign->add_block( HappyPoint::BLOCK_NAME, [
		'background'       => get_term_meta( $context['tag']->term_id, 'happypoint_attachment_id', true ),
		'boxout_title'     => __( 'Get action alerts in your inbox', 'planet4-master-theme' ),
		'boxout_descr'     => __( 'Some text here about the transparency of the communications. Opt out or contact us at any time.', 'planet4-master-theme' ),
		'boxout_link_text' => __( 'Subscribe', 'planet4-master-theme' ),
		'boxout_link_url'  => '#',
	] );

	$campaign->view();
}
