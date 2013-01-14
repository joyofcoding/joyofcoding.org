$(document).ready(function() {
	$('p.expandable').expander({
  	slicePoint: 200,
  	expandEffect: 'fadeIn',
  	collapseEffect: 'fadeOut'
	});

	function clear(id) {
		return id.replace('-continued', '');
	}

  $('#sessiondetails').modal({
    show: false
  });

	$('.workshop, .presentation')
		.css('cursor', 'pointer')
		.click(function() {
      $('#sessiondetails .modal-body').load('sessions/' + clear(this.id) + '.html', function() { 
        $('#sessiondetails').modal('show'); 
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