var GithubUser = Backbone.Model.extend({
	initialize: function(){

	}
})

var GithubUserCollection = Backbone.Collection.extend({
	model:GithubUser
})

var GithubUserView = Backbone.View.extend({
	className: 'userview',

	events: {

	},

	initialize: function(){
		$('.container').append(this.el)
	},

	render: function(){

	}

})

var GithubStageView = Backbone.View.extend({
	className: 'user-stage',

	events: {
		'click #display-stage': 'toggleUserStage'

	},

	initialize: function(){
		$('.wrapper960').append(this.el)
		this.render();
	},

	render: function(){
		var addUserBtn = _.template($("#add-user-button").text())
		var displayStageBtn = _.template($("#display-stage-button").text())
		this.$el.append(addUserBtn)
		this.$el.append(displayStageBtn)
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

	showModal: function(){

	}


	})


var githubStageView = new GithubStageView()
