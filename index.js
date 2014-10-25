//if (device.platform == 'firefoxos') {
//	$.ajaxPrefilter(function (options) {
//		if (options.firefoxOS) {
//			options.xhr = function () {
//				return new window.XMLHttpRequest({
//					mozSystem: true
//				});
//			}
//		}
//	});
//
//	$.ajaxSetup({
//		firefoxOS: true
//	});
//}

Parse.initialize("xakDh9gjHT8Eqd7D0vZA0eMicaQONTfcemI1AIQ5",
	"0t3NTehbxRsVi7lhTrlc3PC28yEqq0OCkpZoAPLF");
//Parse.initialize("c0Ta36PEqwG7vFLy3fqFkvZPHxP370sZQvbIwtX9",
//	"IeytWvnaGnRbEg270Ctfjbc1BfFunZy7Hg4xyCNA");

//var main = new MainView();
var main = new MainViewParse();

console.log('test', document.getElementById('screen'));

document.getElementById('screen').appendChild(main.el);

//
//var user = new Parse.User();
//
//user.set('username', 'vasiliy');
//user.set('second', 'zaytsev');
//user.set('password', 'zaytsev');

//user.signUp(null, {
//	error : function (){
//	    console.log('can\'t create user');
//	},
//	success : function (){
//	    console.log('user created');
//	}
//});

//Parse.User.logIn('vasidliy', 'zaytsev', {
//	success: function(user) {
//		console.log('login success', arguments);
//	},
//	error: function(user, error) {
//		console.warn('login failed', arguments);
//	}
//});
//
//var currentUser = Parse.User.current();
//
//var temp = Parse.Object.extend("temp", {
//	defaults : {
//		test : 1,
//		user : null
//	}
//});

//var tempInstance = new temp();
//tempInstance.set({'user' : currentUser});
//
//console.log(tempInstance);
//
//tempInstance.save();


