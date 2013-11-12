AppRouter = Backbone.Router.extend({
  initialize: function(){
    this.menuView = new GitHUD.Views.MenuView()
  },

  routes: {
    '': 'mainRoute'
  },

  mainRoute: function(params) {
    that = this;
    if (params && params.code){
      $.getJSON('http://githud-auth.herokuapp.com/authenticate/'+params.code, function(data) {
        GitHUD.access_token = data.token;
        // clear query string params
        $('.login').hide()
        $('.logout').show()
        that.navigate('')
      });
    } else if (!params) {

      new GitHUD.Views.WelcomeView()
      console.log('show welcome!')
    }
    if (params && params.repos) {
      new GitHUD.Views.IndexView({users: params.repos.split(',')});
      console.log('showing repos!')
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

