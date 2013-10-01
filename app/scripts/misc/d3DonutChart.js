$(function(){
    $("#submit-repo-request").click(function(){
        getRepoStats(getRepoStatsUrl())

        displayD3TreeQcall()
    })
    
})


var dataset = {}
var color = d3.scale.category20();

function getRepoStatsUrl() {
    var a = []
    $('#myModal2').find('input').each(function(){
        a.push($(this).val())
    })
    var url = 'https://api.github.com/repos/' + a[0] + '/' + a[1] + '/stats/contributors';
    console.log(url)
    return url
}


function getRepoStats(url) {
    $.getJSON(url, function(stats){
        dataset.commits = []
        dataset.contributors = []
        stats.forEach(function(user){
            dataset.commits.push(user.total)
            dataset.contributors.push(user.author)
        })
        d3DountChartMaker()
        createLegend()
    })
}

function createLegend() {
    var stage = $("#d3Donutstage")
    dataset.contributors.forEach(function(author, i){
        var p = $('<p>' + author.login + ' ' + dataset.commits[i] + '</p>').css('color',  color(i))
        stage.append(p)
    })
}

function d3DountChartMaker(){

        // var dataset = {
        //   apples: [40,6,14,6,7,8,9,12,44],
        // };

        var width = 460,
            height = 300,
            radius = Math.min(width, height) / 2;

        

        var pie = d3.layout.pie()
            .sort(null);

        var arc = d3.svg.arc()
            .innerRadius(radius - 100)
            .outerRadius(radius - 50);


        var svg = d3.select("#d3Donutstage").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        var path = svg.selectAll("path")
            .data(pie(dataset.commits))
          .enter().append("path")
            .attr("fill", function(d, i) { 

                return color(i); 
            })
            .attr("d", arc);
}

// d3DountChartMaker()