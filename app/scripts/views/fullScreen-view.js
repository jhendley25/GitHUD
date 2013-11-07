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
    // this.listenTo({windowWidth: window.innerWidth}, 'change', this.redrawLinechart())
    var boundDrawLinechart = _.bind(this.drawLinechart, this)
    var throttledRedraw = _.throttle(boundDrawLinechart, 200,{leading: false})
    $( window ).resize(throttledRedraw)


    //web ticker freezes and stuff
    this.initMarquee()
    // listen for this view's model to change, then render
    //start the slide show (theres a setTimeout somewhere around here)
    // this.initFsSlideShow()

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
    new Chart(ctx).Doughnut(this.model.get('gitHUDMeta').donutData);

    this.drawLinechart()


  },

  drawLinechart: function(){
    // console.log('HEYYYYYY')

    var fsLinechartTemplate = JST["app/templates/fullscreen-linechart.html"]({
      repo: this.model
    })

    $(".linechart-destination").html('')
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

//eric is awesome


  },

  exitFullscreen: function(){
    this.$el.remove()
    $(".donut-stage").css('display', 'inline-block')
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

  },

  initFsSlideShow: function(ev){
    var slideCounter = 1
    var that = this

    var fsLinechartTemplate = JST["app/templates/fullscreen-linechart.html"]({
      repo: this.model
    })
    if ($(event.target).data('slideshow') == 'play') {

            $(".ss-play").css('display', 'none')
            $(".ss-stop").css('display', 'inline-block')
            //trasition to the first slide immediately
            console.log('additions chart called')
                console.log('additions data ', that.model.get('gitHUDMeta').fsLinechart.additions)
                $(".linechart-destination").append(fsLinechartTemplate)
                var ctx = $("#line-chart-" + that.model.get('id')).get(0).getContext("2d");
                new Chart(ctx).Line(that.model.get('gitHUDMeta').fsLinechart.additions,{
                    scaleShowGridLines : false,
                    animation: true
                });

        window.intId = setInterval(function(){
            $(".linechart-destination").html('')
            if(slideCounter == 1){
                //deletions line chart
                $(".linechart-destination").append(fsLinechartTemplate)
                var ctx = $("#line-chart-" + that.model.get('id')).get(0).getContext("2d");
                new Chart(ctx).Line(that.model.get('gitHUDMeta').fsLinechart.deletions,{
                    scaleShowGridLines : false,
                    animation: true
                });
                slideCounter += 1
                console.log('deletions chart called')

            }else if (slideCounter == 2 ){
                that.drawLinechart()
                slideCounter += 1
            }else{
                //additions line chart
                console.log('additions chart called')
                console.log('additions data ', that.model.get('gitHUDMeta').fsLinechart.additions)
                $(".linechart-destination").append(fsLinechartTemplate)
                var ctx = $("#line-chart-" + that.model.get('id')).get(0).getContext("2d");
                new Chart(ctx).Line(that.model.get('gitHUDMeta').fsLinechart.additions,{
                    scaleShowGridLines : false,
                    animation: true
                });

                slideCounter = 1
            }


        },5000)
    } else if($(event.target).data('slideshow') == 'stop'){
        // console.log('intId ', window.intId)
        console.log('stop slideshow')
        clearInterval(window.intId)
        $(".ss-stop").css('display', 'none')
        $(".ss-play").css('display', 'inline-block')

    }

  }
})
