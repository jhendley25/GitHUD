$('#sort-by a').click(function(){
  // get href attribute, minus the '#'

  if (!App.settings.isotopeReady) { initIsotope() }

  var sortType = $(this).attr('href').slice(1);
  $('#d3Donutstage').isotope('reloadItems').isotope({ sortBy : sortType });
  console.log('sorting!')
  return false;
});


function initIsotope(){
	App.settings.isotopeReady = true;

	$('#d3Donutstage').isotope({
	  sortAscending : false,

	  getSortData : {
	    name : function ( $elem ) {
	     	return $elem.find('.name').text();
	    },
	    contributors : function ( $elem ) {
	     	return $elem.find('.contributor-count').text();
	    },
	    commits : function ( $elem ) {
	    	return parseInt( $elem.find('.commit-count').text() );
	  	},
	 	size : function ( $elem ) {
	   		return parseInt( $elem.find('.size').text() );
	  	}
	  }
	});
}