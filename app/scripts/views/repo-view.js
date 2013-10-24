GitHUD.Views.RepoView = Backbone.View.extend({

  initialize: function (options) {
    console.log('cool')

    // get the this.el into the page
    $("#donut-stage").append(this.el)

    // listen for this view's model to change, then render
    this.listenTo(this.model, 'change', function(model){
      this.render(model)
      // initiate isotope after rendering
      $('#donut-stage').isotope({ sortBy : 'name' });
    })

    // then set it all in motion with a fetch!
    this.model.fetch()
  },

  render: function() {
    // var city
    var data = [],
        chartTarget,
        authors;

    //ripping off d3's color brewer
    var color = function(i){
        var pallete = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"]

        return pallete[i]
    }
    // var canvas = "<canvas id='chart-" + this.model.get('id') + "' width='200' height='200'>"
    // this.$el.append(canvas)


    authors = this.model.get('gitHUDMeta').authors

    _.each(authors, function(author, i){
        data.push({value: author.total, color: color(i)})
    })

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

    ctx = $("#chart-" + this.model.get('id')).get(0).getContext("2d");

    new Chart(ctx).Doughnut(data);


  }
})
