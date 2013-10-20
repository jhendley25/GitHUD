GitHUD.Views.ShowcaseView = Backbone.View.extend({
	showcaseTemplate:         JST["app/templates/showcase.html"],

	initialize: function(){
		$(".wrapper").append(this.el)
		this.render()
	},
	render: function(){
		this.$el.append(this.showcaseTemplate({repoData: this.model}))
		console.log('showcaseView rendered')
		
	}
})