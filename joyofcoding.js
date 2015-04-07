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
      
      // append the hash from the talk details to the talk elements so we can easily locate those
      $('#speakers li:not(.lunch)').each(function(_, el){
        $el = $(el);
        if(!$el.attr('id')){
          var hash = $el.find('h3').text().replace(/\W+/g, "-").toLowerCase();
          $el.attr('id', hash);          
        }
      });

      // upon clicking on the li elements append the hash from the current talk to the hash
      $('#speakers li:not(.lunch)').on('click', function(evt){
        document.location.hash = $(this).attr('id');
      });

      if ($(window).width() < 720) {
        $(window).hashchange( function(){
          // mobile version, use expanders for details
          if(!document.location.hash)
            return;

          $talk = $('li'+document.location.hash);
          if(!$talk)
            return;

          // find the top coordinate of the li so this is the height on which we start our modal
          var rect = $talk[0].getBoundingClientRect();

          var talkDetailsEl = $talk.find('.talk-details');
          var contents = talkDetailsEl.wrapInner('<div>').children(); // wrap a div around the contents
          var height = 300 + contents.outerHeight(true); // 300 = bugfix; image height is not correctly added somehow
          //find the modal with details of this talk and open it
          talkDetailsEl.css('max-height', height + 'px').addClass('active');
        });

        // add event handler to check for activated talk details to let them be closed
        $('#speakers li:not(.lunch)').on('click', function(evt){
          var talkContainer = $(this);
          var talkDetailsEl = talkContainer.find('.talk-details');
          if(talkDetailsEl.hasClass('active')) {
            talkDetailsEl.removeClass('active').css('max-height','0');
            talkContainer[0].scrollIntoView(true);// after hiding details scroll to top of talk summary 
            return;
          }
        });
      }
      else{
        $(window).hashchange( function(){
          //desktop version, use modal dialog
          if(!document.location.hash)
            return;

          $talk = $('li'+document.location.hash);
          if(!$talk)
            return;

          $talk[0].scrollIntoView(true); //make the talk in the agenda scroll into view

          var modalContainer = $('#modal-container');
          modalContainer.html('');//reset content

          var title = $talk.find('h3').text();
          var talkDetailsEl = $talk.find('.talk-details');

          modalContainer.html('<h1>' + title + '</h1>' + talkDetailsEl.html());
          modalContainer.modal();
        });
      }
    });

    $(window).load(function() {
      $(window).hashchange();// maybe we are loaded with a hash, trigger to resolve
    });
}).call(this);
