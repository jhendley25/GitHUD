GitHUD.Views.WelcomeView = Backbone.View.extend({

  welcomeTemplate:         JST["app/templates/welcome.html"],
  gettingStartedTemplate:         JST["app/templates/gettingStarted.html"],

  className: 'welcome-view',



  initialize: function(){
    options = this.options || {}
    this.render()
    $("#donut-stage").append(this.el)
    $("#sort-by").hide()
  },

  render: function(){
    if(!docCookies.getItem("access_token")){
      this.$el.append(this.welcomeTemplate())
      console.log('rendering welcome view')
    }else{
      console.log("getting started view displayed")
      this.$el.html('')
      this.$el.append(this.gettingStartedTemplate())
      $("#sort-by").show()
      $("#getting-started-add-users").click(function(){
        this.$el.remove()
      })
    }
  },


})
