/**
 * @class AuthView
  */

var AuthView = BaseView.extend({
	templateUrl : 'views/authView/authView.html',
	id : 'authView',
	events : {
		'click #auth' : 'login',
		'click #signUp' : 'signUp'
	},
	/**
	 * @function
	 * ok, login with existing user
	 */
	login : function (){
		var self = this,
			login = this.$el.find('#login').val(),
			pass = this.$el.find('#password').val();

		Parse.User.logIn(login, pass, {
			success: function(user) {
				self.authSuccess();
			},
			error: function(user, error) {
				self.showError(error.message);
			}
		});
	},
	/**
	 * @function
	 * here we can try to sign up a new user
	 */
	signUp : function (){
		var self = this,
			user = new Parse.User(),
			login = this.$el.find('#newLogin').val(),
			pass = this.$el.find('#newPassword').val(),
			email = this.$el.find('#newEmail').val();

		if (!login.length || !pass.length /*|| !email*/) {
			this.showError('verify your credentials, please');
			return false;
		}

		user.set("username", login);
		user.set("password", pass);
		user.set("email", email);

		user.signUp(null, {
			success: function(user) {
				self.authSuccess();
			},
			error: function(user, error) {
				self.showError(error.code + " " + error.message);
			}
		});
	},
	/**
	 * @function
	 * simple error messaging
	 */
	showError : function (error){
	    alert(error);
	},
	/**
	 * proceed to app functionality
	 */
	authSuccess : function (){
		console.log('auth success');
		this.$el.find('input').val('');
		this.vent.trigger('loginSuccess');
	}
});