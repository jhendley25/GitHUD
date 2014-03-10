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
    fsLinechart = {
      additions: {
        labels : [],
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
      deletions: {
        labels : [],
        datasets: [
        {
        fillColor : '#0086cb',
        strokeColor : "#00598a",
        pointColor : "#00598a",
        pointStrokeColor : "#fff",
        data: []
        }
        ]
      }
    },

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
    var userColor = GitHUD.utilities.color(user.author.login)
    commits.push(user.total)
    //push an object containing username and related color
    contributors.push({username: user.author.login, color: userColor})
    //get all committers weekly and alltime
    tickerData.allCommiters.allTime.push({user: user.author.login, commits: user.total})
    tickerData.allCommiters.weekly.push({user: user.author.login, startOfWeek: moment( _.last(user.weeks).w * 1000).format("MMM-DD"), commits: _.last(user.weeks).c})
    // find top commiter of alltime, and top commiter of the week

    tickerData.topCommiter.allTime = _.max(tickerData.allCommiters.allTime, function(user){return user.commits})
    tickerData.topCommiter.weekly = _.max(tickerData.allCommiters.weekly, function(user){return user.commits})
    // console.log('top commiter ',tickerData.topCommiter.weekly)
    //donutData namespacing
    donutData.push({value: user.total, color: userColor})

    _.each(user.weeks, function(weeklyData){
    tickerData.ttlCommits += weeklyData.c
    tickerData.ttlAdditions += weeklyData.a
    tickerData.ttlDeletions += weeklyData.d

    // console.log(weeklyData.c)
    graphData.datasets[0].data.push(weeklyData.c)

    //populate datasets for fslinecharts
    fsLinechart.additions.labels.push("")
    fsLinechart.deletions.labels.push("")
    fsLinechart.additions.datasets[0].data.push(weeklyData.a)

    fsLinechart.deletions.datasets[0].data.push(weeklyData.d)

    // graphData.labels.push(moment(weeklyData.w * 1000).format("MMM-DD"))

    //pushing empty string for formatting purposes
    graphData.labels.push("")
    })

  })




  // make a 12 week only copy of graphData.datasets[0].data
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
    repoSize: this.get('size')
  }

  // some simplified meta data
  gitHUDMeta = {
    sortData: sortData,
    contributors: contributors,
    commits: commits,
    donutData: donutData,
    graphData: graphData,
    tickerData: tickerData,
    fsLinechart: fsLinechart,
    authors: response
  }
  // console.log('gitHUDMeta',gitHUDMeta)
  // finally return all of this
  this.secondaryAjax(gitHUDMeta)
  return {gitHUDMeta: gitHUDMeta}
  },

  secondaryAjax: function(gitHUDMeta){
  var url = 'https://api.github.com/repos/' + this.get('full_name') + '/commits' + GitHUD.utilities.keys();
  var that = this
  $.getJSON(url, function(response){
    var commitData = { commitInfo: response}
    $.extend(gitHUDMeta, commitData)
  }).done(function(){
    that.getLatestCommitStats(gitHUDMeta)
  })
  },

  getLatestCommitStats: function(gitHUDMeta){
  var url = gitHUDMeta.commitInfo[0].url + GitHUD.utilities.keys()
  $.getJSON(url, function(response){
    //assign a username of 'unknown' for now if author is null.  server side screw up i think
    if (response.author == null){response.author = {login: "Unknown"}}
    response.commitMessage = gitHUDMeta.commitInfo[0].commit.message
    var newEntry = { latestCommit: response}
    // console.log(newEntry)
    $.extend(gitHUDMeta, newEntry)
  })
  }
})
