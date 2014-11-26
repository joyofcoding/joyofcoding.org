(function() {
  var isIE = function() {
      var myNav;
      myNav = navigator.userAgent.toLowerCase();
      if (myNav.indexOf('msie') !== -1) {
        return parseInt(myNav.split('msie')[1]);
      } else {
        return false;
      }
    };

    /* do not show the front for IE < 11 */
    $(document).ready(function() {
      var ie = isIE();
      if(ie || (ie && ie < 11)){
        $("#body").addClass("hidefront");
      }
    });

    /* initialize front folding & unfolding */
    $(document).ready(function() {
      var resizeHandler, scrollHandler, speed;
      speed = 0.3;
      scrollHandler = function() {
        var i, s, x, z;
        s = $(window).scrollTop();
        i = Math.min(170, Math.max(6, s * speed));
        z = Math.min(6, 6 / (s * 0.02));
        x = 1 - Math.min(.95, Math.max(.2, s / 100));

        var leftFront = $("#left-front");
        var rightFront = $("#right-front");
        var insidePages = $("#inside-pages .faded");
        var bodyDiv = $("#body");

        return ['webkit-', 'moz-', 'ms-',''].map(function(prefix) {
          var type;
          leftFront.css("" + prefix + "transform", "rotate3d(0,-1,0," + i + "deg) translate3d(0,0,3px)");
          rightFront.css("" + prefix + "transform", "rotate3d(0,1,0," + i + "deg) translate3d(0,0,3px)");
          return insidePages.css("opacity", x);
        });
      };
      
      if ($(window).width() > 720 && !isIE()) {
        $(window).on('gesturechange', _.throttle(scrollHandler, 1000 / 60));
        $(window).scroll(_.throttle(scrollHandler, 1000 / 60));
      }
      resizeHandler = function() {
        return $("#body").toggleClass("hidefront", $(window).width() < 720);
      };
      $(window).resize(_.debounce(resizeHandler, 300));
      if ($(window).width() < 720) {
        return $("#body").addClass("hidefront");
      }
    });
}).call(this);
