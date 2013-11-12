GitHUD.Views.WelcomeView = Backbone.View.extend({
  welcomeTemplate:         JST["app/templates/welcome.html"],

  className: 'welcome-view',

  events: {
    'click .login': 'navMain' 
  },

  initialize: function(){
    this.render()
    $("#donut-stage").append(this.el)
    GitHUD.welcomeShown = true
  },

  render: function(){
    this.$el.append(this.welcomeTemplate())
    console.log('rendering welcome view')
  },

  navMain: function(){
    this.$el.remove()
  }
})