$(document).ready(function() {

	$('#session').on('hidden.bs.modal', function () {
    $(this).removeData('bs.modal').empty();
    $(document.body).removeClass('modal-dialog');
  });

});