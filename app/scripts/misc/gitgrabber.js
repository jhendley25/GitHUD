var commitCount = 0

function getGithubUserCommitCount (user){
	var url = 'https://api.github.com/users/' + user + '/repos'
	
	$.getJSON(url, function(userRepos){
		var repos = _.map(userRepos, function(repo){ return repo.name })
		repoPushEvents(repos, user)
	})	
}

function repoPushEvents (repos, user){
	var total = 0
	var len = repos.length
	repos.forEach(function(repo, index){
	
		var url = 'https://api.github.com/repos/'+ user + '/' + repo + '/events'

		$.getJSON(url, function(events){
			
			var pushEvents = _.filter(events, function(event){ return event.type == "PushEvent"})
			total += pushEvents.length

			if (index+1 == len) {
				commitCount = total
				// do some d3 stuff
			}
		})
	})
	console.log('total commits: ' + commitCount)
}

getGithubUserCommitCount('jhendley25');
