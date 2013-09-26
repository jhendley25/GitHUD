ProfileUserView = Backbone.View.extend({
	template: _.template( $("#user-profile-display").text() ),

	events: {
		'click .close-box': 'remove'
	},

	initialize: function(){
		$(".wrapper960").append(this.el)
		this.render()
		//get user commit count !--> needs work
		getGithubUserCommitCount(this.model.get('login'))
	},

	render:function (){
		this.$el.append(this.template({user: this.model}))
	}
})