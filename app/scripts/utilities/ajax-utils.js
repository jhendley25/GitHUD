function getSome(){
	var url = 'https://api.github.com/repos/jhendley25/GitHUD/commits/7e3ba88a614ae2799e16b8b9f676763eb651f7a2' + GitHUD.utilities.keys()
	$.getJSON(url, function(response, xhr, status){
        console.log('status',status.status)

	})
}
