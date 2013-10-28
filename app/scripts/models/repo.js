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
            }
        },
        sortData, gitHUDMeta;


    var color = function(i){
        var pallete = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"]

        return pallete[i]
    }


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
      donutData.push({value: user.total, color: color(i)})
      _.each(user.weeks, function(weeklyData){
            //graphData namespacing
            // console.log(weeklyData.c)
            graphData.datasets[0].data.push(parseInt(weeklyData.c))

            // graphData.labels.push(moment(weeklyData.w * 1000).format("MMM-DD"))

            //pushing empty string for formatting purposes
            graphData.labels.push("")
        })
    })


    // console.log(tickerData)






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
      tickerData: tickerData,
      authors: response
    }

    // finally return all of this
    return {gitHUDMeta: gitHUDMeta}
  }
})
