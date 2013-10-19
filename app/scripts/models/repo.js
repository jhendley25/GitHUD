GitHUD.Models.Repo = Backbone.Model.extend({

  // the repo stats endpoint.
  url: function(){ 
    return 'https://api.github.com/repos/' + this.get('full_name') + '/stats/contributors' + GitHUD.utilities.keys();
  },

  // the stats endpoint actually only returns an array
  // of objects, each referring to a particular commiter
  // on the project.
  // 
  // We'll ultimately store this data, and some simplified
  // versions of it, as an object under the `gitHUDMeta` attr
  parse: function(response) {
    var commits = [],
        contributors = [],
        count = 0,
        sortData, gitHUDMeta;

    _.each(response, function (user) {
      commits.push(user.total)
      contributors.push(user.author)
    })

    // add info to sortData for easier isotopejs integration
    sortData = {
      repoName: this.get('name'),
      repoSize: this.get('size'),
      contribCount: contributors.length,
      commitCount: _.reduce(commits, function (memo, num) {
        return memo + num
      }, 0)
    }

    // some simplified meta data
    gitHUDMeta = {
      sortData: sortData,
      contributors: contributors,
      commits: commits,
      authors: response
    }

    // finally return all of this
    return {gitHUDMeta: gitHUDMeta}
  }
})
