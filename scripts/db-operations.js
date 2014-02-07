/*** FIREBASE ***/
/* LOAD JQUERY FIRST */
// TODO: wrap in OBJECT

(function(){
	var fbRef = new Firebase("https://heyssist.firebaseio.com/");
	var usersRef = new Firebase("https://heyssist.firebaseio.com/Users");
	var needsRef = new Firebase("https://heyssist.firebaseio.com/Needs");
	
	
	/* Users */
	function insertUser(json) {
		// TODO: what if they exist, what if user is empty
		var user = usersRef.child(json.name);
		user.set(json);
	}
	
	function login(name) {
		// Untested (TODO)
		user = usersRef.child(name);
		user.on('value', function(snapshot) {
			if (snapshot.val() === null)
				$('body').trigger('login failed');
			else
				$('body').trigger('login succeeded');
		});
	}

})();