describe("GitHUD.Models.Repo", function () {
  before(function () {
    var repo = {
      full_name: 'gitHUDtester/single-contrib-repo'
    }




    testRepo = new GitHUD.Models.Repo(repo)
  })

  it("should return proper api endpoint url", function () {
        expect(testRepo.url()).to.equal('https://api.github.com/repos/gitHUDtester/single-contrib-repo/stats/contributors' + GitHUD.utilities.keys());

  })
  it("should contain metadata namespaced under gitHUDMeta", function(done){
  	testRepo.fetch({success: function(){
  		var meta = testRepo.get('gitHUDMeta')
  		expect(meta != undefined).to.equal(true)
  		done()
  	}})
  })
})
