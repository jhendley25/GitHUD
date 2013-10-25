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
        donutData = [],
        graphData = {
            // users: [],
            labels: [],
            datasets: {
                fillColor : '#000',
                strokeColor : "#000",
                pointColor : "#000",
                pointStrokeColor : "#fff",
                data: []
            },
        },
        sortData, gitHUDMeta;


    var color = function(i){
        var pallete = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"]

        return pallete[i]
    }
    _.each(response, function(author, i){
        donutData.push({value: author.total, color: color(i)})
    })

    _.each(response, function (user) {
      commits.push(user.total)
      contributors.push(user.author)
    })

    _.each(response, function (user) {
        // graphData.users.push(user.author.login)
        _.each(user.weeks, function(weeklyData){
            graphData.datasets.data.push(weeklyData.c)
            graphData.labels.push(weeklyData.w)
        })

        // console.log('graphData ',graphData)
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
      donutData: donutData,
      graphData: graphData,
      authors: response
    }
    console.log(gitHUDMeta)
    // finally return all of this
    return {gitHUDMeta: gitHUDMeta}
  }
})
