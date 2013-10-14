$(function(){
    $("#submit-user-request").click(function(){
        findUserInputs()
        //clear stage when users are added
        $("#d3Donutstage").html('')

    })
    
})

var dataset = {}
dataset.stats = []
dataset.userRepos = []
dataset.userList = []
var color = d3.scale.category20();

function findUserInputs() {
    //grab all input values, and make an array
    $("#myModal1").find('input').each(function(input){
        dataset.userList.push($(this).val())
    })
    //added underscore uniq to remove duplicate usernames
    var userArray = _.uniq(dataset.userList)
    userArray.forEach(function(user){
        //call for each user in array
        getUserRepoArray(user)
    })
}

// function validate(){
//     //check if the user already exists
//     dataset.userList.forEach(function(user){
//         if (user)
//     })
// }


function getUserRepoArray (user){
    var url = 'https://api.github.com/users/' + user + '/repos?client_id=' + devObj.clientId + '&client_secret=' + devObj.clientSecret + '&per_page=100'
    // access the user's repos
    $.getJSON(url, function(repos){

        repos.forEach(function(repo){
            // loop through repos and grab the name and id
            var repoId = repo.id
            var repo = repo.name
           
            // call for each repo
            getRepoStats(user, repo, repoId)
            
        })
        
    })
}

function getRepoStats(user, repo, repoId) {
    var url = 'https://api.github.com/repos/' + user + '/' + repo + '/stats/contributors?client_id=' + devObj.clientId + '&client_secret=' + devObj.clientSecret + '&per_page=100'
    // grab repo stats for each repo passed in

    $.getJSON(url, function(stats){
        // namespacing for display purposes
        if(stats.length){
        
            var commits = [],
                contributors = [],
                repoName = repo;

                stats.forEach(function(user){
                    commits.push(user.total)
                    contributors.push(user.author)
                    
                })
            d3DountChartMaker(repoId, repoName, commits, contributors)

            
        }
    })
}



function d3DountChartMaker(repoId, repoName, commits, contributors){

       

        var width = 460,
            height = 300,
            radius = Math.min(width, height) / 2;

        

        var pie = d3.layout.pie()
            .sort(null);

        var arc = d3.svg.arc()
            .innerRadius(radius - 100)
            .outerRadius(radius - 50);

        $("#d3Donutstage").append('<div id="repo-' + repoId + '"></div>')
        var stage = $("#repo-" + repoId)
        stage.append('<h3>'+ repoName +'</h3>')
        var legend = $('<div class="legend"></div>')
        contributors.forEach(function(author, i){
            var p = $('<p>' + author.login + ' ' + commits[i] + '</p></div>').css('color',  color(i))
            legend.append(p)
        })
        stage.append(legend)



        var svg = d3.select("#repo-" + repoId).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        var path = svg.selectAll("path")
            .data(pie(commits))
          .enter().append("path")
            .attr("fill", function(d, i) { 
                return color(i); 
            })
            .attr("d", arc);
}


