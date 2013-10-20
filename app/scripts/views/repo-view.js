GitHUD.Views.RepoView = Backbone.View.extend({
  events: {
      "click": "createShowcase"
  },

  initialize: function (options) {

    
    // get the this.el into the page
    $("#donut-stage").append(this.el)

    // listen for this view's model to change, then render
    this.listenTo(this.model, 'change', function(model){
      this.render(model)
    })

    // then set it all in motion with a fetch!
    this.model.fetch()
  },
  //create a new showcase view with the current model
  //may not be the proper way to do this, but hey
  createShowcase: function(){
          console.log(this.model)
    new GitHUD.Views.ShowcaseView({
            model: this.model
    })
  },

  render: function() {
    // var city
    var width = 460,
        height = 300,
        radius = Math.min(width, height) / 2,
        pie, arc, state, legend, svg, path, sortingInfo, color, renderedTemplate;
        //add attr's for modal
    $(this.el).attr({
      "data-toggle": 'modal',
      "href": '#repoId-'+this.model.get('id')

        })
    //somewhat randomly switch color schemes
    switch (Math.floor(Math.random()*3)) {
      case 2:
        color = d3.scale.category20();
        break;
      case 1:
        color = d3.scale.category20b();
        break;
      default:
        color = d3.scale.category20c();
    }

    // add the legend and title
    renderedTemplate = JST["app/templates/repo.html"]({
      repo: this.model,
      color: color
    })
    this.$el.append(renderedTemplate)

    //create a hidden div for sorting with isotope
    sortingInfo = JST['app/templates/sorting-info.html']
    this.$el.append(sortingInfo({
      sortData: this.model.get('gitHUDMeta').sortData
    }))

    // the rest is just d3 black magic to render the donuts
    pie = d3.layout.pie().sort(null);
    arc = d3.svg.arc()
      .innerRadius(radius - 100)
      .outerRadius(radius - 25);

    svg = d3.select(this.el).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2.85 + "," + height / 2 + ")");
    
    path = svg.selectAll("path")
      .data(pie(this.model.get('gitHUDMeta').commits))
      .enter().append("path")
      .attr("fill", function (d, i) {
        return color(i);
      })
      .attr("d", arc);

  }
})