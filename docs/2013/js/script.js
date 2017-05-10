$(document).ready(function() {
	$('p.expandable').expander({
  	slicePoint: 200,
  	expandEffect: 'fadeIn',
  	collapseEffect: 'fadeOut'
	});

	function clear(id) {
		return id.replace('-continued', '');
	}

	$('.workshop, .presentation')
		.css('cursor', 'pointer')
		.click(function() {
      $.fancybox({
        type: 'ajax',
        wrapCSS: 'sessiondetails',
        closeEffect: 'none',
        maxWidth: '700px',
        padding: 40,
        href: 'sessions/' + clear(this.id) + '.html'
      });
    })
 		.hover(
    	function() {
    		var newcolor = $('#' + this.id).css('background-color').replace(/,\s0.+/, ', 0.2)');
    		$('#' + clear(this.id)).css('background-color', newcolor);
    		$('#' + clear(this.id) + '-continued').css('background-color', newcolor);
    	},

    	function() {
      		$('#' + clear(this.id)).css('background-color', '');
      		$('#' + clear(this.id) + '-continued').css('background-color', '');
    	}
    );

  $('#sessiondetails').on('hidden', function() {
    $(this).data('modal').$element.removeData();
  });

});