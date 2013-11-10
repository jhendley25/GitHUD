describe("GitHUD.Views.RepoView", function(){
	it("should render when model changes", function(done){
		var repo = {
	      full_name: 'gitHUDtester/single-contrib-repo'
	    }
	    new GitHUD.Views.RepoView({
        	model: new GitHUD.Models.Repo(repo)
      })
	    // setTimeout(function(){
	    // 	var donut = $("#donut-stage div").find('svg')
	    // 	var height = parseInt(donut.attr('height'))
	    // 	expect(height).to.equal(300)
	    // 	done()
	    // },1500)
	})
})
