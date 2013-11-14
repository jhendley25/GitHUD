AppRouter = Backbone.Router.extend({
  initialize: function(){
    this.menuView = new GitHUD.Views.MenuView()
  },

  routes: {
    '': 'mainRoute'
  },

  mainRoute: function(params) {
    that = this;
    //if the cookie exists, set the access token
    if ( docCookies.getItem("access_token") ){
      GitHUD.access_token = docCookies.getItem("access_token")


      //and if a url query is present, do that too
      if (params && params.repos) {
        new GitHUD.Views.IndexView({users: params.repos.split(',')});
        console.log('showing repos!')
      } else {
        new GitHUD.Views.WelcomeView({auth: true})
      }

    } else {
      //after the user clicks login and returns from github auth steps
      if (params && params.code){
        $.getJSON('http://githud-auth.herokuapp.com/authenticate/'+params.code, function(data) {
          docCookies.setItem("access_token", data.token, new Date(2020, 5, 12))
          GitHUD.access_token = docCookies.getItem("access_token");
          $('.login').hide()
          $('.logout').show()
          // clear query string params
          that.navigate('')
        });
        //if the user is not logged in and has not yet tried to do so
      } else if (!params) {
        new GitHUD.Views.WelcomeView({auth: false})
        console.log('show welcome!')
      }
    }
  }
})

$(function(){
  GitHUD.router = new AppRouter()
  Backbone.history.start({
    pushState: true,
    root: '/'
  })
})

