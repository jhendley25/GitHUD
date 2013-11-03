function getSome(){
	var url = 'https://api.github.com/repos/jhendley25/githud/commits' + GitHUD.utilities.keys()
	$.getJSON(url, function(stuff){
		console.log(stuff)
	})
}
