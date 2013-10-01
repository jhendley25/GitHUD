var GithubStageView = Backbone.View.extend({
	className: 'user-stage',

	events: {
		'click #display-stage': 'toggleUserStage',
		'click #submit-user-request': 'githubRequest',
		'click #display-table': 'displayUserTable',
		'click #display-thumbs': 'displayUserThumbs'

	},

	

	displayStageBtnTemplate: _.template($("#display-stage-buttons").text()),

	modalDisplayTemplate: _.template($("#modals-template").text()),

	initialize: function(){

		//pops this.el into the main content area
		$('.wrapper960').append(this.el)

		this.render();

		//prefilling form fields:
		$("#repo-owner").val('jhendley25')
		$("#repo-name").val('hackathonapp')
	},

	render: function(){
		this.$el.append(this.displayStageBtnTemplate)
		this.$el.append(this.modalDisplayTemplate)
	},
	//removes any existing instances of FullUserView and GitUserThumbView
	clearStage: function(){
		$(".user-stage").find(".user-info-box").remove()
		$(".user-stage").find(".user-info-table").remove()
	},
	//loops through array of users and instantiates a FullUserView for each
	displayUserTable: function(){
		githubStageView.clearStage()
		githubUsers.forEach(function(user){
			new FullUserView({model: user})
		})
	},
	//loops through array of users and instantiates a GitUserUserView for each
	displayUserThumbs: function(){
		githubStageView.clearStage()
		githubUsers.forEach(function(user){
			new GitUserThumbView({model: user})
		})
	},
	// animate stage, hidden on load.  !!-->needs additional logic to 
	// compensate for different scenarios
	toggleUserStage: function(){
	
		if ($(".user-stage").css('top') == '-40px' ) {
			$(".user-stage").animate({
			    top: "-540px",
			  }, 300, function() {
			    $("#display-stage span").removeClass('glyphicon-chevron-up')
			    $("#display-stage span").addClass('glyphicon-chevron-down')
			  });
		}else{
			$(".user-stage").animate({
			    top: "-40px",
			  }, 300, function() {
			  	$("#display-stage span").removeClass('glyphicon-chevron-down')
			    $("#display-stage span").addClass('glyphicon-chevron-up')
			    
			  });
		}
	},
	//API ajax call
	//creates array of users, and retrieves user attr's
	githubRequest: function(){
		//create new collection
		githubUsers = new GithubUserCollection()
		//display user stage
		this.toggleUserStage()
		console.log("githubRequest called")
		// initialize array
		var githubuserArray = []
		//loop through inputs, push value to array
		$("#myModal1").find('input').each(function(){
			githubuserArray.push($(this).val())
		})

		var that = this
		//loop through array of users and make an API call for each
		githubuserArray.forEach(function(user){
		var githubUrl = 'https://api.github.com/users/' + user
			$.getJSON(githubUrl, function(user){
				console.log("success!" + user.public_repos)
				//add users to collection
				githubUsers.add(user)
				//display UserThumbs by default
				that.displayUserThumbs()
			})
		})
	}


	})

// instantiate stage
var githubStageView = new GithubStageView()
