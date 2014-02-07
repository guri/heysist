$(document).ready(function() {
	
	/* Title */
	$('[data-role="page"]').prepend(
		$('<h2 id="site-title">')
			.text('Heyssist')
			.buttonMarkup({theme: 'b'})
	);
	
	
	
	/* Status page flip sections */
	function sectionSwitch(sectionObj) {
		// TODO: make more specific!
		$('section').hide();
		sectionObj.show();
		
	}
	sectionSwitch($('section').eq(0));
	$('body#status').find('nav a').click(function(){
		sectionSwitch($('#'+$(this).data('triggers')));
	});


	
	/* ACTIONS */
	
	$('#registration_form').submit(function(){
		var form = $(this);
		var user = {};
		if (user=='')
			alert('Enter User Name'); // TODO!!

		// text fields
		$.each(['name', 'location', 'phone', 'abilities-other', 'needs-other'], function(n, key){
			var val = form.find('#'+key).val();
			if (val !== undefined)
				user[key] = val;
		});

		// checkboxes
		$(':checked').each(function(n, obj){
			var key = $(obj).attr('name');
			user[key] = true;
		})
		insertUser(user);
		return false;
	});
	
	

})