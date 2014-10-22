var ParseShoppingItem = Parse.Object.extend("ShoppingItem", {
	defaults : {
		name : '',
		amount : 0,
		finished : false
	},
	validate : function (item){
		console.log('ParseShoppingItem validate', item);
		var errors = [];
		if (!item.amount) {
			errors.push('amount needed');
		}
		if (!item.name) {
			errors.push('name needed');
		}

		//..

		if (errors.length != 0) {
			this.trigger('error', errors);
			return errors;
		}
		return false;
	}
});

var ParseShoppingList = Parse.Collection.extend({
	model : ParseShoppingItem,
	query : new Parse.Query(ParseShoppingItem),
	initialize : function (){
		/**
		 * force this collection to grab data only for current user
		 */
		this.query.equalTo('user', Parse.User.current());
		this.fetch();
	}
});