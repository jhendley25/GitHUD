App = {}
App.settings = {}

$(function(){

    $("#submit-user-request").click(function(){
    $(".sort-btns").css('display','inline-block')
        findUserInputs()
        // sortButtonStates()
        //clear stage when users are added
        $("#d3Donutstage").html('')

    })
    sortButtonStates()
})

var elemCount = 1
var dataset = {}
dataset.stats = []
dataset.userRepos = []
dataset.userList = []
var color


function findUserInputs() {
    //grab all input values, and make an array
    $("#myModal1").find('input').each(function(input){
        //only add user if input field is not empty
        if ($(this).val() != '') {
            dataset.userList.push($(this).val())
        }
    })
    //added underscore uniq to remove duplicate usernames
    var userArray = _.uniq(dataset.userList)
    userArray.forEach(function(user){
        //call for each user in array
        getUserRepoArray(user)
    })
}
//utility function for getting the json from api.github.com
function gitUtil(options, urlSelector){
    var url;
    var options = options || {};
    var devKeyStuff = '?client_id=' + devObj.clientId + '&client_secret=' + devObj.clientSecret + '&per_page=100'
    options.userUrl = 'https://api.github.com/users/' + options.user + devKeyStuff
    options.repoUrl = 'https://api.github.com/users/' + options.user + '/repos' + devKeyStuff
    options.statsUrl = 'https://api.github.com/repos/' + options.user + '/' + options.repo + '/stats/contributors' + devKeyStuff
    if (urlSelector == 'user') {
        url = options.userUrl
    } else if (urlSelector == 'repo'){
        url = options.repoUrl
    } else if (urlSelector == 'stats') {
        url = options.statsUrl
    }

    $.getJSON(url, function(info){
        console.log('user: ' + options.user)
        console.log('json return: ' + info)
    })
}


function getUserRepoArray (user){
    var url = 'https://api.github.com/users/' + user + '/repos?client_id=' + devObj.clientId + '&client_secret=' + devObj.clientSecret + '&per_page=100'
    // access the user's repos
    
    $.getJSON(url, function(repos){

        repos.forEach(function(repo){
            //do not display forked repos
            if(!repo.fork){
                // loop through repos and grab the name and id
                var repoSize = repo.size
                var repoId = repo.id
                var repo = repo.name
               
                // call for each repo
                getRepoStats(user, repo, repoId, repoSize)
            }
            
        })
        
    })
}

function getRepoStats(user, repo, repoId, repoSize) {
    var url = 'https://api.github.com/repos/' + user + '/' + repo + '/stats/contributors?client_id=' + devObj.clientId + '&client_secret=' + devObj.clientSecret + '&per_page=100'
    // grab repo stats for each repo passed in
    
    var sortingObj = {}
    $.getJSON(url, function(stats){
        // check that $.getJSON returned info
        if(stats.length){
        
            var commits = [],
                contributors = [],
                repoName = repo,
                count = 0;
            

                stats.forEach(function(user){
                    commits.push(user.total)
                    contributors.push(user.author)
                    //increment count in respect to number of contributors
                    count += 1

                    
                })
                //add info to sortingObj for easier isotopejs integration
                sortingObj.repoName = repoName
                sortingObj.contribCount = contributors.length
                sortingObj.commitCount = _.reduce(commits, function(memo, num){return memo + num}, 0)
                sortingObj.repoSize = repoSize


                d3DountChartMaker(repoId, repoName, commits, contributors, count, sortingObj)
            
        }
    })
}



function d3DountChartMaker(repoId, repoName, commits, contributors, count, sortingObj){

    //somewhat randomly switch colorschemes
    if (elemCount % 3 == 0) {
        color = d3.scale.category20();
    }else if (elemCount % 3 == 1) {
        color = d3.scale.category20b();    
    } else {
        color = d3.scale.category20c();    
    }
       // console.log(sorter)
       elemCount += 1
        var width = 460,
            height = 300,
            radius = Math.min(width, height) / 2;

        

        var pie = d3.layout.pie()
            .sort(null);

        var arc = d3.svg.arc()
            .innerRadius(radius - 100)
            .outerRadius(radius - 50);

        if (count == 1 ){
            $("#d3Donutstage").append('<div id="repo-' + repoId + '"></div>')
        } else {
            $("#d3Donutstage").prepend('<div id="repo-' + repoId + '"></div>')

        }
            var stage = $("#repo-" + repoId)
            stage.append('<h3>'+ repoName +'</h3>')
            //create legend div
            var legend = $('<div class="legend"></div>')
            //pop contributors into legend div
            contributors.forEach(function(author, i){
                var p = $('<p>' + author.login + ' ' + commits[i] + '</p></div>').css('color',  color(i))
                legend.append(p)
            })
            //pop legend div into stage
            stage.append(legend)
            var sortingInfo = _.template($("#hidden-sorting-info").text())
            stage.append(sortingInfo({sortingObj:sortingObj}))
            //create a hidden div for sorting with isotope
            



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

function sortButtonStates() {
        $(".sort-btns").removeClass('hidden')
}


