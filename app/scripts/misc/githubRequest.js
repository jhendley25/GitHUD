var repoData = {}
repoData.arrayOfRepos = []
function getUserRepoArray (user){
	var url = 'https://api.github.com/users/' + user + '/repos'
	$.getJSON(url, function(repos){
		repos.forEach(function(repo){
			getRepoStats(user)
			repoData.arrayOfRepos.push(repo.name)
		})
	})
}

function getRepoStats(user) {
    $.getJSON(url, function(stats){
        dataset.commits = []
        dataset.contributors = []
        stats.forEach(function(user){
            dataset.commits.push(user.total)
            dataset.contributors.push(user.author)
        })
        d3DountChartMaker()
        createLegend()
    })
}