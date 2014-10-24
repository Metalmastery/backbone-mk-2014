/**
 * @class MainViewParse
 * @see MainView
 * will be used as a container for another views
 * also will be used as a 'controller' for app, so we can slap logic together
 */

var MainViewParse = BaseView.extend({
	templateUrl : 'views/mainParse/mainParse.html',
	events : {
		'click #logout' : 'logout'
	},
	models : {
		list : null,
		parseList : null
	},
	views : {
		addForm : null,
		list : null,
		auth : null
	},
	onInitialize : function (){
		var self = this;

		/**
		 * subscribe to events from
		 * @see AddForm.addItem
		 */
		this.vent.on('addItem', function (item){
			self.addItem(item);
		});

		/**
		 * subscribe to events from
		 * @see ListView.deleteItem
		 */
		this.vent.on('removeItem', function (index){
			self.removeItem(index);
		});

		/**
		 * subscribe to events from
		 * @see ListView.toggleFinished
		 */
		this.vent.on('toggleFinished', function (index){
			self.toggleFinished(index);
		});

		/**
		 * subscribe to events from
		 * @see AuthView.authSuccess
		 */
		this.vent.on('loginSuccess', function (){
			self.showMainScreen();
		});

	},
	/**
	 * @see BaseView.render
	 */
	onRender : function (){
		this.views.auth = new AuthView();
		this.views.addForm = new AddForm();

		this.showAuth();
	},
	showError : function (error){
		alert(JSON.stringify(error, null, 4));
	},
	/**
	 * @function
	 * @param item {Object} item to add to the shopping list
	 */
	addItem : function (item){
		console.log('main addItem', item);

		var self = this;

//		we can use anonymous data and don't send any personal data
//		just place raw 'item' there
// 		this.models.parseList.create(item, {
//			validate: true,
//				error : function (model, error){
//				self.showError(error)
//			}
//		});

//		or we can add information about current user to each item
		/**
		 * copy received data and add some additional data about creator
		 */

		var data = _.extend({
			user:    Parse.User.current(),
			ACL:     new Parse.ACL(Parse.User.current())
		}, item);

//		so here we use extended 'data'
		this.models.parseList.create(data, {
			validate: true,
			error : function (model, error){
				self.showError(error)
			}
		});
//		this.models.parseList.add(data, {validate : true});
	},
	/**
	 * @function
	 * @param index {Number} index of element to remove
	 */
	removeItem : function (index){
//		parse remove
		var modelToRemove = this.models.parseList.at(index);
		modelToRemove.destroy();
//		this.models.parseList.remove(modelToRemove);
	},
	toggleFinished : function (index){
//		parse model
	    var checkedModel = this.models.parseList.at(index);

		/**
		 * set new value
		 */
		checkedModel.set({finished : !checkedModel.get('finished')});

		/**
		 * immediately save to parse.com server
		 * or you can save model manually to avoid multiple requests (add button 'save' for example)
		 */
//		parse.com backend save
		checkedModel.save();
	},
	/**
	 * just clear all HTML data to simulate 'pfgination' between views
	 * you can implement custom animations to swap between views
	 */
	clearContainers : function (){
		for (var i in this.views) {
			if (this.views[i] && this.views[i].$el)
				this.views[i].$el.detach();
		}
	},
	/**
	 * show main data
	 * @see AddForm
	 * @see ListView
	 */
	showMainScreen : function (){
		var addFormContainer = this.$el.find('#addFormContainer'),
			listContainer = this.$el.find('#listContainer');

		this.clearContainers();

		/**
		 * we need to clear old data from previous user (if it's not the first login)
		 * or create new collection for just logged user
		 *
		 * so we can erase all data manualy and re-render the list
		 * or just create new instances
		 */

		/**
		 * @type {ParseShoppingList}
		 */
//		parse collection creation
		this.models.parseList = new ParseShoppingList();

//		attach parse collection to list
		this.views.list = new ListView( { model : this.models.parseList} );

		addFormContainer.html(this.views.addForm.el);
		listContainer.html(this.views.list.el);
	},
	/**
	 * show auth view
	 * @see AuthView
	 */
	showAuth : function (){
		var authContainer = this.$el.find('#authContainer');

		this.clearContainers();

		authContainer.html(this.views.auth.el);
	},
	/**
	 * logout and show auth view
	 */
	logout : function (){
		Parse.User.logOut();
		this.showAuth();
	},
	/**
	 * just an example, you can check if user logged in or not
	 * @returns {boolean}
	 */
	isUserLoggedIn : function (){
		var currentUser = Parse.User.current();
		if (currentUser) {
			// ok, user is logged in
			return true;
		} else {
			// looks like nobody here
			return false;
		}
	}
});

