GitHUD.Views.IndexView = Backbone.View.extend({

  initialize: function(options) {

  // underscore uniq to remove duplicate usernames
  userList = _.map(_.uniq(options.users), function(user){ return {username: user} })

  // create the collection of users and add
  this.users = new GitHUD.Collections.UserCollection(userList);

  // when changes occur (after a fetch) on a user,
  // loop through their repos, and pass each repo as
  // a model to a new repo view instance
  this.users.on('change', function(user) {
    _.each(user.get('repos'), function (repo) {
    //do not display forked repos
    if (repo.fork === false) {
      new GitHUD.Views.RepoView({
      model: new GitHUD.Models.Repo(repo)
      })
    }
    })
  })

  // then fetch 'em all!
  this.users.each(function(user){ user.fetch() });

  // throw the el in the page and render
  $('.wrapper').append(this.el)
  this.render();
  },

  render: function () {
  // not sure if we actually need thsi.
  }

})
