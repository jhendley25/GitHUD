GitHUD.Views.ShowcaseView = Backbone.View.extend({
	showcaseTemplate:         JST["app/templates/showcase.html"],

	initialize: function(){
		$(".wrapper").append(this.el)
		this.render()
	},
	render: function(){
		this.$el.append(this.showcaseTemplate())
		console.log('showcaseView rendered')
		
	}
})