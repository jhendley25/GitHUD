GitHUD.Views.RepoView = Backbone.View.extend({

  className: 'repo',

  initialize: function (options) {
    // console.log('cool')

    // get the this.el into the page
    $(".donut-stage").append(this.el)

    // listen for this view's model to change, then render
    this.listenTo(this.model, 'change', function(model){
      this.$el.attr('id', 'repo-'+this.model.get('id'))
      this.render(model)
      // initiate isotope after rendering
      // $('.donut-stage').isotope({ sortBy : 'name' });
    })

    // then set it all in motion with a fetch!
    this.model.fetch()

    // this.model.set('userColor', '#'+Math.floor(Math.random()*16777215).toString(16), {silent: true});
    this.model.set('userColor', GitHUD.utilities.color(this.model.get('owner').login), {silent: true});
  },

  render: function() {
    console.log('WTF', this.model)

    // add the legend and title
    renderedTemplate = JST["app/templates/repo.html"]({
      repo: this.model
    })
    this.$el.append(renderedTemplate)

    //create a hidden div for sorting with isotope
    sortingInfo = JST['app/templates/sorting-info.html']
    this.$el.append(sortingInfo({
      sortData: this.model.get('gitHUDMeta').sortData
    }))

    var ctx = $("#donut-chart-" + this.model.get('id')).get(0).getContext("2d");
    new Chart(ctx).Doughnut(this.model.get('gitHUDMeta').donutData, {
      animateRotate : false
    });

    // console.log('githubmeta',this.model.get('gitHUDMeta').graphData)
    var ctx2 = $("#line-chart-" + this.model.get('id')).get(0).getContext("2d");

    // add colors to datasets
    _.extend(this.model.get('gitHUDMeta').graphData.truncatedWeeklyData.datasets[0], {
      fillColor : this.model.get('userColor'),
      strokeColor : this.model.get('userColor'),
      pointColor : GitHUD.utilities.colorLuminance(this.model.get('userColor'), -0.25),
      pointStrokeColor : "#fff"
    })

    var maxCommits = _.max(this.model.get('gitHUDMeta').graphData.truncatedWeeklyData.datasets[0].data, function(x){ return x })
    if ( maxCommits > 9) {
      // let the scale be automatically calculated if at least one of the data points is 10+
      new Chart(ctx2).Line(this.model.get('gitHUDMeta').graphData.truncatedWeeklyData, {
        scaleShowGridLines : false,
        animation: false,
        scaleSteps : 5,
        scaleStepWidth : Math.floor(maxCommits / 5),
        scaleStartValue : 0,
        scaleOverride : true,
        animation: false
      })
    } else {
      // manually specify the scale because none of the data points were over 9
      new Chart(ctx2).Line(this.model.get('gitHUDMeta').graphData.truncatedWeeklyData, {
        scaleShowGridLines : false,
        scaleSteps : 5,
        scaleStepWidth : 2,
        scaleStartValue : 0,
        scaleOverride : true,
        animation: false
      });
    }

    // console.log(this.model)
  }
})
