//$(document).ready(function() {
	
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
	
	function hs_redirect(where) {
		switch (where) {
			case ('dashboard'):
				$.mobile.changePage('dashboard.html');
				break;
			default:
				$.mobile.changePage('dashboard.html');
				break;

		}
	}
	
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
	
	$('#dashboard #change_availability').click(function(){
		var user = curr_user.get();
		new_status = (user.status !== true) ? true : false;
		curr_user.set('status', new_status);
		curr_user.updateData();
	});
	
	$('form#get_help').submit(function(){
		var need = {};
		var form = $(this);
		$.each(['location'], function(n, key) {
			need[key] = form.find('#'+key).val();
		});
		form.find(':checked').each(function(n, obj){
			var key = $(obj).attr('name');
			need[key] = true;
		})
		submitNeed(need);
	});
	

//});