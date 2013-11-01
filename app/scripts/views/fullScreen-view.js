GitHUD.Views.FullScreenView = Backbone.View.extend({

  events: {
    'click #exit-fullscreen' : 'exitFullscreen'
  },


  initialize: function (options) {
    // console.log('cool')

    // get the this.el into the page
    $(".fullscreen-stage").append(this.el)
    this.render()
    //web ticker freezes and stuff
    // this.initWebTicker()
    // listen for this view's model to change, then render

  },

  render: function() {

    // apply the fullscreen template
    renderedTemplate = JST["app/templates/fullscreen.html"]({
      repo: this.model
    })
    this.$el.append(renderedTemplate)

    var ctx = $("#donut-chart-" + this.model.get('id')).get(0).getContext("2d");
    new Chart(ctx).Doughnut(this.model.get('gitHUDMeta').donutData);

    // console.log('githubmeta',this.model.get('gitHUDMeta').graphData)
    var ctx2 = $("#line-chart-" + this.model.get('id')).get(0).getContext("2d");

    new Chart(ctx2).Line(this.model.get('gitHUDMeta').graphData);
    // console.log(this.model)
  },

  exitFullscreen: function(){
    this.$el.remove()
  },

  initWebTicker: function(){

    $(".webticker").webTicker({
        speed: 50, //pixels per second
        direction: "left", //if to move left or right
        moving: true, //weather to start the ticker in a moving or static position
        startEmpty: true, //weather to start with an empty or pre-filled ticker
        duplicate: false, //if there is less items then visible on the ticker you can duplicate the items to make it continuous
        rssurl: false, //only set if you want to get data from rss
        rssfrequency: 0, //the frequency of updates in minutes. 0 means do not refresh
        updatetype: "reset" //how the update would occur options are "reset" or "swap"
    });


  }
})
