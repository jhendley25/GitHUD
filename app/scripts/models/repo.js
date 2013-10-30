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
        donutData = [],
        graphData = {
            // users: [],
            labels: [],
            datasets: [
            {
                fillColor : '#0086cb',
                strokeColor : "#00598a",
                pointColor : "#00598a",
                pointStrokeColor : "#fff",
                data: []
            }
            ]
        },
        tickerData = {
            allCommiters: {
                allTime: [],
                weekly: []
            },
            topCommiter: {
                weekly: {},
                allTime: {}
            },
            ttlAdditions: 0,
            ttlDeletions: 0,
            ttlCommits: 0,
            forks: 0

        },
        sortData, gitHUDMeta;


    _.each(response, function (user, i) {

        //two arrays, one containing username & one containing commit count
      commits.push(user.total)
      contributors.push(user.author)
      //get all committers weekly and alltime
      tickerData.allCommiters.allTime.push({user: user.author.login, commits: user.total})
      tickerData.allCommiters.weekly.push({user: user.author.login, startOfWeek: moment( _.first(user.weeks).w ).format("MMM-DD"), commits: _.first(user.weeks).c})
      // find top commiter of alltime, and top commiter of the week
      tickerData.topCommiter.allTime = _.max(tickerData.allCommiters.allTime, function(user){return user.commits})
      tickerData.topCommiter.weekly = _.max(tickerData.allCommiters.weekly, function(user){return user.commits})
      console.log('top commiter ',tickerData.topCommiter.allTime)
      //donutData namespacing
      donutData.push({value: user.total, color: GitHUD.utilities.color(user.author.login)})
      _.each(user.weeks, function(weeklyData){
        tickerData.ttlCommits += weeklyData.c
        tickerData.ttlAdditions += weeklyData.a
        tickerData.ttlDeletions += weeklyData.d
        //graphData namespacing
        // console.log(weeklyData.c)
        graphData.datasets[0].data.push(weeklyData.c)

        // graphData.labels.push(moment(weeklyData.w * 1000).format("MMM-DD"))

        //pushing empty string for formatting purposes
        graphData.labels.push("")
      })

    })

    // make a 8 week only copy of graphData.datasets[0].data
    graphData.truncatedWeeklyData = {}
    graphData.truncatedWeeklyData.datasets = graphData.datasets
    graphData.truncatedWeeklyData.labels = ['','','','','','','','','','','','']
    graphData.truncatedWeeklyData.datasets[0] = {
      data: _.last(graphData.datasets[0].data, 12)
    }

    // add info to sortData for easier isotopejs integration
    sortData = {
      commitCount: _.reduce(commits, function (memo, num) { return memo + num }, 0),
      contribCount: contributors.length,
      additions: tickerData.ttlAdditions,
      deletions: tickerData.ttlDeletions,
      repoSize: this.get('size'),
    }

    // some simplified meta data
    gitHUDMeta = {
      sortData: sortData,
      contributors: contributors,
      commits: commits,
      donutData: donutData,
      graphData: graphData,
      tickerData: tickerData,
      authors: response
    }
    console.log('gitHUDMeta',gitHUDMeta)
    // finally return all of this
    return {gitHUDMeta: gitHUDMeta}
  }
})
