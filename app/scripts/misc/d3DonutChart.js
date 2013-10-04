$(function(){
    $("#submit-user-request").click(function(){
        findUserInputs()
    })
    
})


var dataset = {}
var color = d3.scale.category20();

function findUserInputs() {
    dataset.userList = []
    $("#myModal1").find('input').each(function(input){
        dataset.userList.push($(this).val())
    })
    dataset.userList.forEach(function(user){
        getUserRepoArray(user)
    })
}




function getUserRepoArray (user){
    var url = 'https://api.github.com/users/' + user + '/repos'
    $.getJSON(url, function(repos){
        repos.forEach(function(repo){
            var repo = repo.name
            console.log(repo)
            getRepoStats(user, repo)
            
        })
    })
}

function getRepoStats(user, repo) {
    var url = 'https://api.github.com/repos/' + user + '/' + repo + '/stats/contributors'
    $.getJSON(url, function(stats){
        dataset.commits = []
        dataset.contributors = []
        stats.forEach(function(user){
            dataset.commits.push(user.total)
            dataset.contributors.push(user.author)
            dataset.repoName = repo
        })
        d3DountChartMaker()
        createLegend()
    })
}

function createLegend() {

    var stage = $("#" + dataset.repoName)
    dataset.contributors.forEach(function(author, i){
        var p = $('<p>' + author.login + ' ' + dataset.commits[i] + '</p>').css('color',  color(i))

        stage.append(p)
    })
}

function d3DountChartMaker(){

       

        var width = 460,
            height = 300,
            radius = Math.min(width, height) / 2;

        

        var pie = d3.layout.pie()
            .sort(null);

        var arc = d3.svg.arc()
            .innerRadius(radius - 100)
            .outerRadius(radius - 50);

        $("#d3Donutstage").append('<div id="' + dataset.repoName + '"></div>')
        var stage = $("#" + dataset.repoName)
        stage.append('<h3>'+ dataset.repoName +'</h3>')
        var svg = d3.select("#" + dataset.repoName).append("svg")
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


