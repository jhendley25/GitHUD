var GithubUserCollection = Backbone.Collection.extend({

	initialize: function(){
		console.log('new collection created')
		// this.on('add',function(user){
		// 	new GitUserView({model: user})
		// })
	},
	model:GithubUser
})