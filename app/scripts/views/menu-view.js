GitHUD.Views.MenuView = Backbone.View.extend({
  menuTemplate:         JST["app/templates/menu.html"],
  modalTemplate:        JST["app/templates/modal.html"],
  userInputTemplate:    JST["app/templates/username-input.html"],
  className: "menu",
  isotopeReady: false,

  events: {
    "click #sort-by button"       : "isotopeSort",
    "click #filter-by"            : "isotopeFilter",
    "click #submit-user-request"  : "createUrl",
    "click #add-more-user-inputs" : "addInput"
  },

  initialize: function() {
    $(".wrapper").prepend(this.el)
    this.render();
  },

  render: function() {
    this.$el.append(this.menuTemplate())
    this.$el.append(this.modalTemplate())
  },

  createUrl: function() {
    var url = "/?repos=";
    this.$el.find("#addusers input").each(function(input){
        //only add user if input field is not empty
        var username = $(this).val()
        if (username) {
            // dataset.userList.push(username)
            url += $(this).val() + ','
        }
    });
    GitHUD.router.navigate(url.slice(0,-1), {trigger: true})

  },

  addInput: function() {
    this.$el.find(".modal-body").append( this.userInputTemplate() )
  },

  toggleActive: function(event){
    if($(event.target).parent().attr('id') != "add-user-btn" && $(event.target).attr('id') != 'add-user-btn'){
      $(".menu-button").removeClass('active')
      $(event.currentTarget).addClass('active')
    }
  },


  isotopeInit: function() {

    this.isotopeReady = true;

    $('#donut-stage').isotope({
      sortAscending : false,

      getSortData : {
        commits : function ( $elem ) {
          return parseInt( $elem.find('.commits').text() );
        },
        contributors : function ( $elem ) {
          return $elem.find('.contributors').text();
        },
        additions : function ( $elem ) {
          return $elem.find('.additions').text();
        },
        deletions : function ( $elem ) {
          return $elem.find('.deletions').text();
        },
        size : function ( $elem ) {
          return parseInt( $elem.find('.size').text() );
        }
      }
    });
  },

  isotopeSort: function(event){
    if (!this.isotopeReady) { this.isotopeInit() }
    this.toggleActive(event)
    if($(event.target).data("isotope") == "sort"){
      var sortType = $(event.currentTarget).attr('id').replace('sort-','');

      $('#donut-stage').isotope('reloadItems').isotope({ sortBy : sortType });
    }
  },
  isotopeFilter: function(event){

    var filterType = $(event.currentTarget).attr('data-filter')
    $('#donut-stage').isotope({ filter : filterType });
  }

})
