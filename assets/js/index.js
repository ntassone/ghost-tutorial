/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        function casperFullImg() {
            $("img").each( function() {
                var contentWidth = $(".post-content").outerWidth(); // Width of the content
                var imageWidth = $(this)[0].naturalWidth; // Original image resolution

                if (imageWidth >= contentWidth) {
                    $(this).addClass('full-img');
                } else {
                    $(this).removeClass('full-img');
                }
            });
        };

        casperFullImg();
        $(window).smartresize(casperFullImg);

    });

    //Search
    var siteSearch =
      $("#site-search").ghostHunter({
        results: "#site-search-results",
        onKeyUp: true,
        info_template: "<a href='#'' id='clear-results'><span class='icon-x'></span></a><p>{{amount}} tutorials found.</p>",
        result_template : "<a class='post' href='{{link}}'><h2 class='post-title'>{{title}}</h2><span class='post-meta'>{{pubDate}}</span></a>",
        before: function(){
          $("#site-search-results").addClass('active');
        }
      });

    $(document).on("click", "#clear-results", function(){
      event.preventDefault();
      siteSearch.clear();
      $("#site-search-results").removeClass('active');
    });

    //Smooth Scroll
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 200);
          return false;
        }
      }
    });

    //Hide Header
    var myElement = document.querySelector("#site-nav");
    var headroom  = new Headroom(myElement);
    headroom.init();

    //Details of post
    var postDetails = $("#post-details")
    var postSubtitle = postDetails.data("subtitle");
    var postNext = postDetails.data("post-next");
    var postPrev = postDetails.data("post-prev");

    $('.post-subtitle').html(postSubtitle);
    $('#previous-lesson').attr('href', postPrev);
    $('#next-lesson').attr('href', postNext);

}(jQuery));

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');