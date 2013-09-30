var GithubUserCollection = Backbone.Collection.extend({

	initialize: function(){
		console.log('new collection created')
		// this.on('add',function(user){
		// 	new GitUserView({model: user})
		// })
	},
	getUserInfo: function(arrayOfUsers){
		arrayOfUsers.forEach(function(user){
			// set model name to username for each user in arrayOfUsers
			this.model.set('name', user)
			this.model.set('children',[])
			//dont know what to do here
			var url = 'https://api.github.com/users/' + user +'/repos'
			$.getJSON(url,function(repo){
				repo.forEach(function(repo){
					this.model.get('children').set()
				})
			})
			
		})
	},
	model:GithubUser
})