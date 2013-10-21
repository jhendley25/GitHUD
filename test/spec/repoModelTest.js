describe("GitHUD.Models.Repo", function () {
  before(function () {
    var repo = {
      full_name: 'jhendley25/GitHUD'
    }
    testRepo = new GitHUD.Models.Repo(repo)
  })

  it("should return proper api endpoint url", function () {
        expect(testRepo.url()).to.equal('https://api.github.com/repos/jhendley25/GitHUD/stats/contributors' + GitHUD.utilities.keys());

  })
})