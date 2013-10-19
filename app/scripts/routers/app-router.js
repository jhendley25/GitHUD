AppRouter = Backbone.Router.extend({
  initialize: function(){
    this.menuView = new GitHUD.Views.MenuView()
  },

  routes: {
    '': 'mainRoute'
  },

  mainRoute: function(params) {
    if (params.repos) {
      console.log('showing repos!')
    } else {
      console.log('show welcome!')
    }
    console.log(params)
  }
})

$(function(){
  GitHUD.router = new AppRouter()
  Backbone.history.start({
    pushState: true,
    root: '/'
  })
})
  