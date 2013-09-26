//thumbnail view, loaded by default, displays gravatar and username only
GitUserThumbView = Backbone.View.extend({
	className: 'user-info-box',
	template: _.template( $("#user-thumb-display").text() ),

	events: {
		'click .close-box': 'remove'
	},

	initialize: function(){
		$(".user-stage").append(this.el)
		this.render()
	},

	render:function (){
		this.$el.append(this.template({user: this.model}))
	}
})