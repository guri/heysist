$(document).ready(function() {

	$('[data-role="page"]').prepend(
		$('<h2 id="site-title">')
			.text('Heyssist')
			.buttonMarkup({theme: 'b'})
	);
	
	
	function sectionSwitch(sectionObj) {
		// TODO: make more specific!
		$('section').hide();
		sectionObj.show();
		
	}
	sectionSwitch($('section').eq(0));
	$('body#status').find('nav a').click(function(){
		sectionSwitch($('#'+$(this).data('triggers')));
	});
	

})