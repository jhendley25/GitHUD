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
    this.initMarquee()
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

  initMarquee: function(){
    $('.marquee').marquee({
    //speed in milliseconds of the marquee
        speed: 15000,
        //gap in pixels between the tickers
        gap: 50,
        //gap in pixels between the tickers
        delayBeforeStart: 0,
        //'left' or 'right'
        direction: 'left'
    });

  }
})
