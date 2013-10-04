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
	},

	render: function(){
		this.$el.append(this.displayStageBtnTemplate)
		this.$el.append(this.modalDisplayTemplate)
	}	


	})

// instantiate stage
var githubStageView = new GithubStageView()
