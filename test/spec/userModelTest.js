describe("GitHUD.Models.User", function () {
  before(function(){
    
  })
  it("should return proper api endpoint url", function () {
    var user = {
      username: 'jhendley25'
    }
    var userModel = new GitHUD.Models.User(user)
    expect(userModel.url()).to.equal('https://api.github.com/users/jhendley25/repos' + GitHUD.utilities.keys());
    
  });
  it("should return an array of repos", function(){
    var user = {
          username: 'jhendley25'
        }
    var userModel = new GitHUD.Models.User(user)
    userModel.fetch()
console.log(userModel.get('repos'))
    expect(typeof(userModel.get('repos')) == 'object' ).to.equal(true)

  })
});


