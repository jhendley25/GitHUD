FullUserView = Backbone.View.extend({
	template: _.template( $("#user-table-display").text() ),

	events: {
		'click .close-box': 'remove',
		'click #full-view-button': 'displayUserProfile'
	},

	initialize: function(){
		$(".user-stage").append(this.el)
		this.render()
	},

	displayUserProfile: function(){
		var id = this.model.get('id')
		githubStageView.toggleUserStage()
		new ProfileUserView({model: this.model})
	},

	render:function (){
		this.$el.append(this.template({user: this.model}))
	}
})