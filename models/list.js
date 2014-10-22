/**
 * @class ListModel
 */
var ListModel = Backbone.Model.extend({
	defaults : {
		name : '',
		amount : 0,
		finished : false
	},

	validate : function (item){
	    console.log(item);
		var errors = [];
		if (!item.amount) {
			errors.push('amount needed');
		}
		if (!item.name) {
			errors.push('name needed');
		}

		//..

		if (errors.length != 0) {
			return errors;
		}
	}
});

/**
 * @class ListCollection
 */
var ListCollection = Backbone.Collection.extend({
	model : ListModel,

	initialize : function (){
	  	this.on('add', this.saveLocal);
	  	this.on('change', this.saveLocal);
	  	this.on('remove', this.saveLocal);
		this.loadLocal();
	},

	saveLocal : function (){
		console.log('save local');
		var data = JSON.stringify(this.toJSON());
		localStorage.setItem('shoppingList', data);
	},

	loadLocal : function (){
		var data = localStorage.getItem('shoppingList');
		this.reset(JSON.parse(data));
	}

});