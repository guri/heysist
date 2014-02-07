/*** FIREBASE ***/
/* LOAD JQUERY FIRST */
// TODO: wrap. And divide to JS files. I HATE GLOBAL VARIABLES JUST FOR THE RECORD quick dirty quick d i r t y. Also, tired.
// TODO: this is a last minute mess of functions.


	function user() {
		var obj = this;
		this.initiated = false;
		this.name = localStorage.getItem('hs_name');
		this.ref = usersRef.child(this.name);
		this.ref.on('value',function(snapshot) {
			localStorage.setItem('user', JSON.stringify(snapshot.val()));
			obj.initiated = true;
			obj.updateData();
		});

		this.get = function() { // TODO: query by parm
			return JSON.parse(localStorage.getItem('user'));
		};
		this.set = function(key, val) {
			user = this.get();
			user[key] = val;
			localStorage.setItem('user', JSON.stringify(user));
			if (this.initiated)
				this.updateData();
		};
		
		this.changeHelperStatus = function(status){
			this.set('status', status);
		}
		
		
		this.updateData = function() {
			// Updates user data on screen
			var user = this.get();
			$('.help_count').text(user.help_count);
			var helper_status = (user.status===false) ? 'Not available ATM' : 'Waiting for help calls…';
			$('.helper_status').text(helper_status);
		}
	
	}


	var fbRef = new Firebase("https://heyssist.firebaseio.com/");
	var usersRef = new Firebase("https://heyssist.firebaseio.com/Users");
	var needsRef = new Firebase("https://heyssist.firebaseio.com/Needs");

	needsRef.on('child_added', function(snapshot) {
		// Add: location filtering
		var user = curr_user.get();
		//if (user.status === false)
		//	return;
		// TODO: for some reason it turns itself into false?
		
		var needs = snapshot.val();
		var abilities = curr_user.get(); // TODO: see comment ahead :)
/*
		var abilities = curr_user.get().filter(
			function(key){
				return (key.substr(0,'abilities-'.length) == 'abilities-');
			});
*/
		$.each(needs, function(need, val) {
			if (need=='location' || need==user) return;
			if (typeof(need)=='string' && abilities['abilities-'+need] == true) { 
				var msg = 'Help! ' + needs.user.name + ' from ' + needs.location + ' needs help with ' + need + '.';
				$('.helper_status').text(msg);
				$('.helper_status').append(
					$('<a>')
						.text('help?')
				);
			}
		})
		
	});

	
	/* Users */
	if (localStorage.getItem('hs_name')!=null) {
		curr_user = new user();
	}
	
	function insertUser(json) {
		// TODO: what if they exist, what if user is empty
		var user = usersRef.child(json.name);
		json.help_count = 0;
		// helping
		json.status = false;
		$.each(json, function(n, key) {
			if (typeof(key) == 'string' && key.substr(0,'abilities'.length) == 'abilities')
				json.status = true;
		});
		 
		user.set(json);
		localStorage.setItem('hs_name', json.name); // TOOD: wrap in functions file
		hs_redirect('dashboard');
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
		redirect('dashboard');
	}
	
	function submitNeed(json) {
		json.user = curr_user.get();
		needsRef.push(json);
	}
	
	function getNeeds() {
		
	}

	function help_inc() {
		var score = curr_user.get().help_count;
		curr_user(set('help_count', score++));
	}
	
	
	