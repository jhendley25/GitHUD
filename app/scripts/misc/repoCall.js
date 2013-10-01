///prefilling inputs for debugging

 
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
		 children = 
			[
			    
			    { name: 'forks: '+ repo.forks_count },
			    { name: 'watchers: '+ repo.watchers_count },
			    { name: 'language: '+ repo.language },
			    { name: 'total commits: ' + getCommitCount(url) }
			  ]
		
		console.log(children)
	})
}

function getCommitCount(url) {
	url = url + '/events'
	total = 0
	$.getJSON(url, function(events) {
		var pushEvents = _.filter(events, function(event){ return event.type == 'PushEvent'})
		total += pushEvents.length
		console.log('total push events: ' + total)
		return total
	})
}


// getRepoInfo(getRepoUrl)
