GitHUD.Models.User = Backbone.Model.extend({

  // the repos endpoint for users
  url: function(user) { 
    return 'https://api.github.com/users/' + this.get('username') + '/repos' + GitHUD.utilities.keys() 
  },

  // the endpoint returns an array of repos belonging to
  // the user, so let's store that in an attr called repos
  parse: function(response) {
    return {repos: response}
  }

})

GitHUD.Collections.UserCollection = Backbone.Collection.extend({
  
  model: GitHUD.Models.User,

  initialize: function(){
    console.log('new UserCollection created')
  }
})