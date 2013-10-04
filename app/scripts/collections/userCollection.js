GithubUserCollection = Backbone.Collection.extend({
	model: GithubUser,
	initialize: function(){

	}
})
githubUsers = new GithubUserCollection()

githubUsers.on('add', function())
