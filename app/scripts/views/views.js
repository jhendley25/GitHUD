

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
		$('.wrapper960').append(this.el)

		this.render();
	},

	removeCurrentStageEls: function(){
		$(".user-stage").find(".user-info-box").remove()
	},

	render: function(){
		this.$el.append(this.displayStageBtnTemplate)
		this.$el.append(this.modalDisplayTemplate)
	},

	displayUserTable: function(){
		$(".user-stage").find(".user-info-box").remove()
		$(".user-stage").find(".user-info-table").remove()
		githubUsers.forEach(function(user){
			new FullUserView({model: user})
		})
	},
	displayUserThumbs: function(){
		$(".user-stage").find(".user-info-box").remove()
		$(".user-stage").find(".user-info-table").remove()
		githubUsers.forEach(function(user){
			new GitUserView({model: user})
		})
	},

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

	githubRequest: function(){
		githubUsers = new GithubUserCollection()
		this.toggleUserStage()
		console.log("githubRequest called")
		var githubuserArray = []
		$("#myModal1").find('input').each(function(){
			githubuserArray.push($(this).val())
		})
		var that = this
		githubuserArray.forEach(function(user){
		var githubUrl = 'https://api.github.com/users/' + user
			$.getJSON(githubUrl, function(user){
				console.log("success!" + user.public_repos)
				githubUsers.add(user)
				that.displayUserThumbs()
			})
		})
	}


	})
var githubStageView = new GithubStageView()


GitUserView = Backbone.View.extend({
	className: 'user-info-box',
	template: _.template( $("#user-thumb-display").text() ),

	events: {
		'click .close-box': 'remove'
	},

	initialize: function(){
		$(".user-stage").append(this.el)
		this.render()
	},

	render:function (){
		this.$el.append(this.template({user: this.model}))
	}
})




FullUserView = Backbone.View.extend({
	template: _.template( $("#user-table-display").text() ),

	events: {
		'click .close-box': 'remove',
		'click #full-view-button': 'displayUserProfile'
	},

	initialize: function(){
		$(".user-stage").append(this.el)
		this.render()
	},

	displayUserProfile: function(){
		var id = this.model.get('id')
		githubStageView.toggleUserStage()
		new ProfileUserView({model: this.model})
	},

	render:function (){
		this.$el.append(this.template({user: this.model}))
	}
})

ProfileUserView = Backbone.View.extend({
	template: _.template( $("#user-profile-display").text() ),

	events: {
		
	},

	initialize: function(){
		$(".wrapper960").append(this.el)
		this.render()
		getGithubUserCommitCount(this.model.get('login'))
	},

	render:function (){
		this.$el.append(this.template({user: this.model}))
	}
})