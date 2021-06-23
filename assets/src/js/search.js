/* global localizations */

// Search page.
export const setupSearch = function($) {
  const isSearch = !!document.querySelector('body.search').length;
  if (!isSearch) {
    return;
  }

  const $search_form      = document.querySelector( '#search_form' );
  const $load_more_button = document.querySelector( '.btn-load-more-click-scroll' );
  let load_more_count   = 0;
  let loaded_more       = false;

  document.querySelector( '#search-type button' ).click(function() {
    document.querySelector( '#search-type button' ).removeClass( 'active' );
    document.querySelector( this ).classList.add( 'active' );
  });

  document.querySelector( '.btn-filter:not( .disabled )' ).click(function() {
    document.querySelector( '#filtermodal' ).modal( 'show' );
  });

  // Submit form on Sort change event.
  document.querySelector( '#select_order' ).removeEventListener( 'change' ).addEventListener( 'change', function() {
    document.querySelector( '#orderby', $search_form ).val( document.querySelector( this ).value ).parent().submit();
    return false;
  });

  // Submit form on Filter click event or on Apply button click event.
  document.querySelector( 'input[name^="f["]:not(.modal-checkbox), .applybtn' ).removeEventListener( 'click' ).addEventListener( 'click', function() {
    $search_form.submit();
  });

  // Add all selected filters to the form submit.
  $search_form.addEventListener( 'submit', function() {
    let $checkbox;
    if ( 0 === document.querySelector('.filter-modal.show').length ) {
      document.querySelector( 'input[name^="f["]:not(.modal-checkbox):checked' ).each( function() {
        $checkbox = document.querySelector( this ).clone( true );
        $checkbox.css('display', 'none');
        $search_form.insertAdjacentHTML("beforeend", $checkbox );
      } );
    } else {
      document.querySelector( 'input[name^="f["].modal-checkbox:checked').each( function() {
        $checkbox = document.querySelector( this ).clone( true );
        $checkbox.css('display', 'none');
        $search_form.insertAdjacentHTML("beforeend", $checkbox );
      } );
    }
  });

  let $search_results = document.querySelector( '.multiple-search-result' );

  // Navigate to the page of the search result item when clicking on it's thumbnail image.
  // Delegate event handler to the dynamically created descendant elements.
  $search_results.removeEventListener( 'click', '.search-result-item-image').addEventListener( 'click', '.search-result-item-image', function() {
    window.location.href = document.querySelector( '.search-result-item-headline', document.querySelector( this ).parent() ).attr( 'href' );
  });

  // Clear single selected filter.
  document.querySelector( '.activefilter-tag' ).removeEventListener( 'click' ).addEventListener( 'click', function() {
    document.querySelector( '.p4-custom-control-input[value=' + document.querySelector( this ).data( 'id' ) + ']' ).prop('checked', false );
    $search_form.submit();
  });

  // Clear all selected filters.
  document.querySelector( '.clearall' ).removeEventListener( 'click' ).addEventListener( 'click', function() {
    document.querySelector( 'input[name^="f["]' ).prop( 'checked', false );
    $search_form.submit();
  });

  // Add click event for load more button in blocks.
  $load_more_button.removeEventListener( 'click' ).addEventListener( 'click', function() {
    if ( document.querySelector(this).classList.contains( 'btn-load-more-async' ) ) {
      const total_posts    = document.querySelector(this).data('total_posts');
      const posts_per_load = document.querySelector(this).data('posts_per_load');
      const next_page      = document.querySelector(this).data( 'current_page' ) + 1;
      document.querySelector(this).data( 'current_page', next_page );

      $.ajax({
        url: localizations.ajaxurl,
        type: 'GET',
        data: {
          action:          'get_paged_posts',
          'search-action': 'get_paged_posts',
          'search_query':  document.querySelector( '#search_input' ).value.trim(),
          'paged':         next_page,
          'orderby': document.querySelector( '#orderby', $search_form ).value,
          'query-string':  decodeURIComponent( location.search ).substr( 1 ) // Ignore the ? in the search url (first char).
        },
        dataType: 'html'
      }).done(function ( response ) {
        // Append the response at the bottom of the results and then show it.
        document.querySelector( '.multiple-search-result .list-unstyled' ).insertAdjacentHTML("beforeend", response );
        document.querySelector( '.row-hidden:last' ).removeClass( 'row-hidden' ).show( 'fast' );

        if (posts_per_load * next_page > total_posts) {
          $load_more_button.hide();
        }
      }).fail(function ( jqXHR, textStatus, errorThrown ) {
        console.log(errorThrown); //eslint-disable-line no-console
      });
    } else {
      const $row = document.querySelector( '.row-hidden', $load_more_button.closest( '.container' ) );

      if ( 1 === $row.length ) {
        $load_more_button.closest( '.load-more-button-div' ).hide( 'fast' );
      }
      $row.first().show( 'fast' ).removeClass( 'row-hidden' );
    }
  });

  // Reveal more results just by scrolling down the first 'show_scroll_times' times.
  document.querySelector( window ).scroll(function() {
    if ($load_more_button.length > 0) {
      let element_top       = $load_more_button.offset().top,
        element_height      = $load_more_button.outerHeight(),
        window_height       = document.querySelector(window).height(),
        window_scroll       = document.querySelector(this).scrollTop,
        load_earlier_offset = 250;

      if ( load_more_count < localizations.show_scroll_times ) {
        // If next page has not loaded then load next page as soon as scrolling
        // reaches 'load_earlier_offset' pixels before the Load more button.
        if ( ! loaded_more
            && window_scroll > ( element_top + element_height - window_height - load_earlier_offset )
            && ( ( load_more_count + 1 ) * $load_more_button.data('posts_per_load') ) < $load_more_button.data('total_posts' ) ) {

          load_more_count++;
          $load_more_button.click();
          loaded_more = true;

          // Add a throttle to avoid multiple scroll events from firing together.
          setTimeout(function () {
            loaded_more = false;
          }, 500);
        }
        if (window_scroll > (element_top + element_height - window_height)) {
          document.querySelector('.row-hidden').removeClass('row-hidden').show('fast');
        }
      }
      return false;
    }
  });
};
