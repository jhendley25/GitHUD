describe("GitHUD.Models.User", function () {

  it("sets passed attributes", function () {
    var user = {
      username: 'jhendley25'
    }
    var userModel = new GitHUD.Models.User(user)

    expect(userModel.url()).to.equal('https://api.github.com/users/jhendley25/repos' + GitHUD.utilities.keys());
    
  });
});

describe("GitHUD.Models.Repo", function () {
  before(function () {
    var repo = {
      full_name: 'jhendley25/GitHUD'
    }
    testRepo = new GitHUD.Models.Repo(repo)
  })

  it("should return", function () {
        expect(testRepo.url()).to.equal('https://api.github.com/repos/jhendley25/GitHUD/stats/contributors' + GitHUD.utilities.keys());

  })
})
