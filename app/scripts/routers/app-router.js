AppRouter = Backbone.Router.extend({
  initialize: function(){
    this.menuView = new GitHUD.Views.MenuView()
  },

  routes: {
    '': 'mainRoute'
  },

  mainRoute: function(params) {
    console.log(params)
    if (params.repos) {
      new GitHUD.Views.IndexView({users: params.repos.split(',')});
      console.log('showing repos!')
    } else {
      console.log('show welcome!')
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
  