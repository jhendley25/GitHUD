ProfileUserView = Backbone.View.extend({
	template: _.template( $("#user-profile-display").text() ),

	events: {
		
	},

	initialize: function(){
		$(".wrapper960").append(this.el)
		this.render()
		getGithubUserCommitCount(this.model.get('login'))
	},

	render:function (){
		this.$el.append(this.template({user: this.model}))
	}
})