$(function(){
	$("#add-more-user-inputs").click(function(){
		addMoreUserInputs();
	})
	$("#add-more-repo-inputs").click(function(){
		addMoreRepoInputs();
	})
})

function addMoreUserInputs(){

	var inputTemplate = _.template($("#input-template").text());

	$("#myModal1").find($(".modal-body")).append(inputTemplate)
}
function addMoreRepoInputs(){

	var inputTemplate = _.template($("#repo-input-template").text());

	$("#myModal2").find($(".modal-body")).append(inputTemplate)
}





