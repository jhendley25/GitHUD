GitHUD.Views.FullScreenView = Backbone.View.extend({

  events: {
  'click #exit-fullscreen' : 'exitFullscreen',
  'click #startSlideshow'  : 'initFsSlideShow'
  },


  initialize: function (options) {
  // console.log('cool')
  //hide the content behind the fullscreen view
  $(".donut-stage").css('display', 'none')

  // get the this.el into the page
  $(".fullscreen-stage").append(this.el)
  this.render()
  //listen to the window for changes in size
  var boundDrawLinechart = _.bind(this.drawLinechart, this)
  var throttledRedraw = _.throttle(boundDrawLinechart, 200,{leading: false})
  $( window ).resize(throttledRedraw)

  //web ticker freezes and stuff
  this.initMarquee()


  },

  render: function() {

  // apply the fullscreen template
  renderedTemplate = JST["app/templates/fullscreen.html"]({
    repo: this.model
  })
  tickerTemplate = JST["app/templates/ticker.html"]({
    repo: this.model
  })

  //pop the templates in their proper place
  this.$el.append(renderedTemplate)
  $(".fullscreen-ticker").append(tickerTemplate)

  var ctx = $("#donut-chart-" + this.model.get('id')).get(0).getContext("2d");
  new Chart(ctx).Doughnut(this.model.get('gitHUDMeta').donutData,{animation: false});

  this.drawLinechart()
  //set fsSlideshow to autoplay
  this.initFsSlideShow({autoplay: true})


  },

  linechartLegend: function(legend){
  legend = legend || {}
  linechartLegendTemplate = JST["app/templates/linechartLegend.html"]({
    legend: legend,
    repo: this.model
  })
  $(".legend-destination").append(linechartLegendTemplate)
  },

  drawLinechart: function(){
  var legend = {
    catagory: 'COMMITS',
    icon: 'ss-loading',
    dataCount: this.model.get('gitHUDMeta').tickerData.ttlCommits
  }
  var fsLinechartTemplate = JST["app/templates/fullscreen-linechart.html"]({
    repo: this.model
  })

  this.linechartLegend(legend)
  $(".legend").addClass("legendIn")
  $(".legend-DELETIONS").addClass("legendOut")
  $(".linechart-destination").append(fsLinechartTemplate)
  console.log(this)
  console.log(this.model)
  var ctx2 = $("#line-chart-" + this.model.get('id')).get(0).getContext("2d");

  var maxCommits = _.max(this.model.get('gitHUDMeta').graphData.truncatedWeeklyData.datasets[0].data, function(x){ return x })
  if ( maxCommits > 9) {
    // let the scale be automatically calculated if at least one of the data points is 10+
    new Chart(ctx2).Line(this.model.get('gitHUDMeta').graphData.truncatedWeeklyData, {
    scaleShowGridLines : false,
    scaleSteps : 5,
    scaleStepWidth : Math.floor(maxCommits / 5),
    scaleStartValue : 0,
    scaleOverride : true,
    animation: true
    })
  } else {
    // manually specify the scale because none of the data points were over 9
    new Chart(ctx2).Line(this.model.get('gitHUDMeta').graphData.truncatedWeeklyData, {
    scaleShowGridLines : false,
    scaleSteps : 5,
    scaleStepWidth : 2,
    scaleStartValue : 0,
    scaleOverride : true,
    animation: true
    });
  }
  },

  exitFullscreen: function(){
  clearInterval(window.intId)
  this.$el.remove()
  $(".donut-stage").css('display', 'inline-block')
  this.resetHeader()
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
    direction: 'left',

    duplicated: true
  });

  },

  headerColor: function(){
  //change header color to match the current repo owner's userColor
  $(".left-menu").css('background', GitHUD.utilities.colorLuminance(this.model.get('userColor'), -0.2))
  $(".left-menu h1").css({'color': '#fff', 'text-shadow': 'none'})
  $(".left-menu button").css({'color': '#fff', 'text-shadow': 'none'})
  },

  resetHeader: function(){
  //reset header color when exiting fullscreen
  $(".left-menu").removeAttr('style')
  $(".left-menu h1").removeAttr('style')
  $(".left-menu button").removeAttr('style')
  },

  initFsSlideShow: function(slideControl){
  var slideCounter = slideControl.counter || 1
  var that = this
  this.headerColor()
  var fsLinechartTemplate = JST["app/templates/fullscreen-linechart.html"]({
    repo: this.model
  })
  if ($(event.target).data('slideshow') == 'play' || slideControl.autoplay == true) {

    $(".ss-play").css('display', 'none')
    $(".ss-pause").css('display', 'inline-block')


    window.intId = setInterval(function(){
      // $(".linechart-destination").html('')
      console.log('slideCounter is', slideCounter)
      if(slideCounter == 1){
        $(".fsLegend").addClass("legendOut")

        //define legend data
        var legend = {
          catagory: 'ADDITIONS',
          icon: 'ss-plus',
          dataCount: that.model.get('gitHUDMeta').tickerData.ttlAdditions
        }
        //append legend
        that.linechartLegend(legend)

        // $(".legend").addClass("legendIn")


        // append canvas element
        $(".linechart-destination").append(fsLinechartTemplate)
        //get context and call chartjs
        var ctx = $("#line-chart-" + that.model.get('id')).get(0).getContext("2d");
        var maxAdditions = _.max(that.model.get('gitHUDMeta').fsLinechart.additions.datasets[0].data, function(x){ return x })
        new Chart(ctx).Line(that.model.get('gitHUDMeta').fsLinechart.additions,{
          scaleShowGridLines : false,
          scaleSteps : 5,
          scaleStepWidth : Math.floor(maxAdditions / 5),
          scaleStartValue : 0,
          scaleOverride : true,
          animation: true
        });
        //increment counter
        slideCounter += 1

      }else if (slideCounter == 2 ){
        $(".fsLegend").addClass("legendOut")
        //add legend
        var legend = {
          catagory: 'DELETIONS',
          icon: 'ss-delete',
          dataCount: that.model.get('gitHUDMeta').tickerData.ttlDeletions
        }
        //append legend
        that.linechartLegend(legend)
        $(".legend-ADDITIONS").addClass("legendOut")
        //append canvas element
        $(".linechart-destination").append(fsLinechartTemplate)
        // call chartjs
        var ctx = $("#line-chart-" + that.model.get('id')).get(0).getContext("2d");
        var maxDeletions = _.max(that.model.get('gitHUDMeta').fsLinechart.deletions.datasets[0].data, function(x){ return x })
        new Chart(ctx).Line(that.model.get('gitHUDMeta').fsLinechart.deletions,{
          scaleShowGridLines : false,
          scaleSteps : 5,
          scaleStepWidth : Math.floor(maxDeletions / 5),
          scaleStartValue : 0,
          scaleOverride : true,
          animation: true
        });
        slideCounter += 1

      }else{
        $(".fsLegend").addClass("legendOut")

        that.drawLinechart()

        slideCounter = 1
      }

      //5 seconds delay for now
    },5000)

  } else if($(event.target).data('slideshow') == 'stop'){
    // console.log('intId ', window.intId)
    console.log('stop slideshow')
    clearInterval(window.intId)
    $(".ss-pause").css('display', 'none')
    $(".ss-play").css('display', 'inline-block')

  }

  }
})
