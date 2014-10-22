/**
 * @class AddForm
 */
var AddForm = BaseView.extend({
	templateUrl : 'views/addForm/addForm.html',
	id : 'addForm',
	events : {
		'click #addItem' : 'addItem'
	},
	/**
	 * collect form data and send it to
	 * @see MainView.addItem
 	 */
	addItem : function (){
	    console.log('addForm addItem');
		var name = this.$el.find('#name').val();
		var amount = +this.$el.find('#amount').val();
		this.vent.trigger('addItem', {
			name : name,
			amount : amount
		});
		this.$el.find('input').val('');
	}
});