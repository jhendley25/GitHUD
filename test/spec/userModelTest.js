describe("GitHUD.Models.User", function () {

  it("should return proper api endpoint url", function () {
    var user = {
      username: 'jhendley25'
    }
    var userModel = new GitHUD.Models.User(user)
    expect(userModel.url()).to.equal('https://api.github.com/users/jhendley25/repos' + GitHUD.utilities.keys());

  });
  it("should return an array of repos", function(done){
    var user = {
          username: 'jhendley25'
        }
    var userModel = new GitHUD.Models.User(user)
    userModel.fetch({success: function(){
          var username = userModel.get('username')
          var repos = userModel.get('repos')

          //checking that the first repo in the array has a size attr
          expect(repos[0].size > 0).to.equal(true)
          done()
        }
})



  })
});


