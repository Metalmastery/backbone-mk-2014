/**
 * @class ListView
 */
var ListView = BaseView.extend({
	id : 'listView',
	templateUrl : 'views/listView/list.html',
	events : {
		'click .delete' : 'deleteItem',
		'click input[type=checkbox]' : 'toggleFinished'
	},
	/**
	 * @param e {Event} - DOM event contains information about clicked element
	 * check the index of removed item and send it to
	 * @see MainView.removeItem
	 */
	deleteItem : function (e){
		var idx = $(e.currentTarget).parent('li').index();
		this.vent.trigger('removeItem', idx);
	},
	toggleFinished : function (e){
		console.log(e);
		var idx = $(e.currentTarget).parents('li').index();
		this.vent.trigger('toggleFinished', idx);
	}
});