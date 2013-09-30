users = ['masondesu', 'flackap']

data = _.map(users, function(user){
	var userObject = {
		name: user,
		children: [
			{
				name: 'repos'
			}
		]
	}


	var repos = {
		name: 'repos'
	}

	$.getJSON('http://api.github.com/users/'+user+'/repos', function(repos){
		userObject.children[0].children = _.map(repos, function(repo){
		  return [
		    { name: 'name: '+ repo.name }
		    { name: 'forks: '+ repo.forks_count }
		    { name: 'watchers: '+ repo.watchers_count }
		    { name: 'language: '+ repo.language }
		  ]
		})
	})

	return userObject
})