var GithubStageView = Backbone.View.extend({
	className: 'user-stage',

	events: {
		'click #submit-user-request': 'findUserInputs'

	},

	

	displayStageBtnTemplate: _.template($("#display-stage-buttons").text()),

	modalDisplayTemplate: _.template($("#modals-template").text()),

	initialize: function(){

		//pops this.el into the main content area
		$('.wrapper960').append(this.el)

		this.render();
	},

	render: function(){
		this.$el.append(this.displayStageBtnTemplate)
		this.$el.append(this.modalDisplayTemplate)
	},
	findUserInputs: function() {
	    
	    $("#myModal1").find('input').each(function(input){
	        var user = $(this).val()
	        user = new GithubUser
	    })
	    
	}

	})

// instantiate stage
var githubStageView = new GithubStageView()
