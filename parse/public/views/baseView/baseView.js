/**
 * pub-sub messaging system, all views will be able to communicate through it
 */
var vent = _.extend({}, Backbone.Events);
/**
 * @class BaseView
 * simple functionality for a common view, just to avoid copy-paste and make code cleaner
 */
var BaseView = Backbone.View.extend({
	/**
	 * HTML template file URL
	 */
	templateUrl : '',
	template : null,
	model : null,
	/**
	 * initializes basic stuff
	 * - load the HTML file for template
	 * - starting listen to model events (if exists)
	 * - render view for the first time
	 */
	initialize : function (){
		var self = this;
		console.log('init');
		if (this.model) {
			this.listenTo(this.model, "add", this.render);
			this.listenTo(this.model, "remove", this.render);
			this.listenTo(this.model, "reset", this.render);
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.render);
		}
		if (this.templateUrl.length) {
			console.log('get template', this.templateUrl);
			var request = $.get(this.templateUrl, function (data){
				self.template = _.template(data);
				self.render();
			}, 'html')
			.fail(function() {
				alert( "error" );
				console.log(arguments);
			});

			console.log(request);
		}

		this.vent = vent;

		/**
		 * @see BaseView.render explanation
		 */

		if (typeof this['onInitialize'] == 'function'){
			this['onInitialize'].call(this);
		}
	},
	/**
	 * Generates the HTML of current view using underscore template and model data (if exists)
	 */
	render : function (){

		if (!this.template) {
			return false;
		}

		var data = null;

		if (this.model) {
			data = this.model.toJSON();
		}

		var html = this.template({model : data, test : 'test'});

		this.$el.html(html);

		/**
		 * we will be unable to override the 'render' method and keep this functionality working
		 * so we need to add new method 'onRender' and just call it after original render
		 */

		if (typeof this['onRender'] == 'function'){
			this['onRender'].call(this);
		}

		return this;
	}
});