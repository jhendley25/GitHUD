gitCalls = {}

var data = gitCalls
 
function getRepoUrl() {
	var a = []
	$('#myModal2').find('input').each(function(){
		a.push($(this).val())
	})
	var url = 'https://api.github.com/repos/' + a[0] + '/' + a[1];
	console.log(url)
	return url
}


function getRepoInfo(url) {
	$.getJSON(url, function(repo){
	 // commits = getCommitCount(url)
		 gitCalls.children = 
			[
			    
			    { name: 'forks: '+ repo.forks_count },
			    { name: 'watchers: '+ repo.watchers_count },
			    { name: 'language: '+ repo.language },
			    { name: 'total commits: ' + gitCalls.commits },
			    { name: 'contributors: '},
			    { children: addContributors() }
			  ]
		
		console.log(gitCalls.children)
	})
}


function getCommitCount(url) {
	eventUrl = url + '/events'
	gitCalls.commits = 0
	$.getJSON(eventUrl, function(events) {
		var pushEvents = _.filter(events, function(event){ return event.type == 'PushEvent'})
		gitCalls.commits += pushEvents.length
		console.log('total push events: ' + gitCalls.commits)
	})
}

function getContributors(url) {
	
	contribUrl = url + '/contributors'
	$.getJSON(contribUrl, function(contribs){
		gitCalls.contributors = contribs
	})
}

function addContributors(){
	gitCalls.contribArray = _.map(gitCalls.contributors, function(contrib){ return {name: 'user: ' + contrib.login}})
	return gitCalls.contribArray
}

