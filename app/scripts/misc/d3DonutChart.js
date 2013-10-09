$(function(){
    $("#submit-user-request").click(function(){
        findUserInputs()
    })
    
})


var dataset = {}
var color = d3.scale.category20();

function findUserInputs() {
    dataset.userList = []
    //grab all input values, and make an array
    $("#myModal1").find('input').each(function(input){
        dataset.userList.push($(this).val())
    })
    dataset.userList.forEach(function(user){
        //call for each user in array
        getUserRepoArray(user)
    })
}




function getUserRepoArray (user){
    var url = 'https://api.github.com/users/' + user + '/repos'
    // access the user's repos
    $.getJSON(url, function(repos){

        repos.forEach(function(repo){
            // loop through repos and grab the name and id
            var repo = repo.name
            var repoId = repo.id
            console.log(repo)
            // call for each repo
            getRepoStats(user, repo, repoId)
            
        })
    })
}

function getRepoStats(user, repo, repoId) {
    var url = 'https://api.github.com/repos/' + user + '/' + repo + '/stats/contributors'
    // grab repo stats for each repo passed in
    $.getJSON(url, function(stats){
        // namespacing for display purposes
        dataset.commits = []
        dataset.contributors = []
        stats.forEach(function(user){
            dataset.commits.push(user.total)
            dataset.contributors.push(user.author)
            dataset.repoName = repo
        })
        d3DountChartMaker()
        createLegend(repoId)
    })
}

function createLegend(repoId) {
    var repoId = repoId
    var stage = $("#" + repoId)
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

        $("#d3Donutstage").append('<div id="' + dataset.repoId + '"></div>')
        var stage = $("#" + dataset.repoId)
        stage.append('<h3>'+ dataset.repoName +'</h3>')
        var svg = d3.select("#" + dataset.repoId).append("svg")
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


