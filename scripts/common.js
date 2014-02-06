$(document).ready(function() {

	$('[data-role="page"]').prepend(
		$('<h2 id="site-title">')
			.text('Heyssist')
			.buttonMarkup({theme: 'b'})
	);

})