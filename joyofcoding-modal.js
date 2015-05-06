'use strict';

var joyofcodingModal = (function($, window){

    var self = {},
        modal = null,
        content = null,
        construct = function() {

            modal = $(".joyofcoding-modal");
            content = modal.find(".modal-content");

            modal.off("click").on("click", self.hide);
            modal.find(".modal-close").off("click").on("click", self.hide);
        };

    self.initialize = function() {

        modal.addClass("enabled");
    };

    self.hide = function(event) {

        // Prevent children click events
        if( event.target !== this ) return;

        event.preventDefault();

        parent.location.hash = '!';
        modal.removeClass("show");

        return false;
    };

    self.show = function(html) {

        content.html(html);
        modal.addClass("show");
        content.parent().css("top", $(window).scrollTop());

    };

    // That's all folks
    construct();

    return self;

})(jQuery, window);