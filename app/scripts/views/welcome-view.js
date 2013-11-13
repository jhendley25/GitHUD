GitHUD.Views.WelcomeView = Backbone.View.extend({

  welcomeTemplate:         JST["app/templates/welcome.html"],
  gettingStartedTemplate:         JST["app/templates/gettingStarted.html"],

  className: 'welcome-view',

  events : {
    "click #getting-started-add-users" : "destroyView"
  },


  initialize: function(){
    options = this.options || {}
    $("#sort-by").hide()
    this.render()
    $("#donut-stage").append(this.el)
  },

  render: function(){
    if(!docCookies.getItem("access_token")){
      this.$el.append(this.welcomeTemplate())
      console.log('rendering welcome view')
    }else{
      console.log("getting started view displayed")
      this.$el.html('')
      $("#sort-by").show()
      this.$el.append(this.gettingStartedTemplate())
    }
  },
  destroyView: function(){
    this.el.remove()
  }


})
