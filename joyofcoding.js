(function(Modernizr, win){
    Modernizr.addTest('csstransformspreserve3d', function () {

        var prop = Modernizr.prefixed('transformStyle');
        var val = 'preserve-3d';
        var computedStyle;
        if(!prop) return false;

        prop = prop.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

        Modernizr.testStyles('#modernizr{' + prop + ':' + val + ';}', function (el, rule) {
            computedStyle = win.getComputedStyle ? getComputedStyle(el, null).getPropertyValue(prop) : '';
        });

        return (computedStyle === val);
    });
}(Modernizr, window));

(function() {
    /* do not show the 3d transforms for browsers which do not support it */
    $(document).ready(function() {
      if(!Modernizr.csstransformspreserve3d){
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
      
      // fixups if we have a small screen
      if ($(window).width() > 720 && Modernizr.csstransformspreserve3d) {
        $(window).on('gesturechange', _.throttle(scrollHandler, 1000 / 60));
        $(window).scroll(_.throttle(scrollHandler, 1000 / 60));
      }
      
      resizeHandler = function() {
        if($(window).scrollTop() > 100)
          return;

        return $("#body").toggleClass("hidefront", $(window).width() < 720);
      };
      
      $(window).resize(_.debounce(resizeHandler, 300));
      
      if ($(window).width() < 720) {
        return $("#body").addClass("hidefront");
      }
    });

    $(document).ready(function(){
      // hook up event handlers to open talk details // close them
      $('#speakers li').on('click', function(evt){
        // find the top coordinate of the li so this is the height on which we start our modal
        var rect = evt.target.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);

        //find the modal with details of this talk and open it
        $(this).find('.talk-details').toggle();
      });
/*
      $('#speakers li .talk-details').on('click', function(evt){
        //make the clicked talk-details auto-hide itself
        $(this).hide();
      });
*/
    });
}).call(this);
