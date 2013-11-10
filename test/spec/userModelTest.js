//the test user 'gitHUDtester' has three repos:
//one empty, one single contrib, and one multi contrib

describe("GitHUD.Models.User", function () {

  it("should return proper api endpoint url", function () {
    var user = {
      username: 'gitHUDtester'
    }
    var userModel = new GitHUD.Models.User(user)
    expect(userModel.url()).to.equal('https://api.github.com/users/gitHUDtester/repos' + GitHUD.utilities.keys());

  });
  it("should return an array of repos", function(done){
    var user = {
          username: 'gitHUDtester'
        }
    var userModel = new GitHUD.Models.User(user)
    userModel.fetch({success: function(){
          var username = userModel.get('username')
          var repos = userModel.get('repos')

          //checking that the first repo in the array has a size attr
          expect(repos.length == 3).to.equal(true)
          done()
        }
})



  })
});


