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
			    { name: 'contributors: ',
			      children: addContributors() }
			  ]
		
		console.log(gitCalls.children)
		displayD3Tree()

	})
}
function displayD3Tree(){

		  root = data;
		  root.x0 = h / 2;
		  root.y0 = 0;

		  function toggleAll(data) {
		    if (data.children) {
		      data.children.forEach(toggleAll);
		      toggle(data);
		    }
		  }

		  // Initialize the display to show a few nodes.
		  root.children.forEach(toggleAll);
		  // toggle(root.children[1]);
		  toggle(root.children[4]);
		  // toggle(root.children[1].children[0].children[4]);
		  // toggle(root.children[9]);
		  // toggle(root.children[9].children[0]);

		  update(root);
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
	gitCalls.contribArray = _.map(gitCalls.contributors, function(contrib){ return {name: '' + contrib.login}})
	return gitCalls.contribArray
}

