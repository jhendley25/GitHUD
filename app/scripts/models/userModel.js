var GithubUser = Backbone.Model.extend({
	initialize: function(){

	},
	getUserRepoArray: function(){
		var url = 'https://api.github.com/users/' + user + '/repos'
	    $.getJSON(url, function(repos){
	        repos.forEach(function(repo){
	            var repo = repo.name
	            this.repoArray = []
	            this.repoArray.push(repo)
	            // getRepoStats(user, repo)
	            
	        })
	    })
	}
})