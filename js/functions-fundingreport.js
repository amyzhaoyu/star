$(document).ready(function() {
	$.data($("body").get(0), "orgSelect", $("#orgs").html());
	$("#orgs").val("CHE");
	 //NK - comment below out if you do not want to initialize the page showing the topics for some preselected items
	//$("#orgs").change(_.throttle(function() { chgSelects("topic"); }, 400));
	//$("#topics").change(_.throttle(function() { chgSelects("org"); }, 400));
	//$("#primary_topic").change(_.throttle(function() { chgSelects("org"); }, 400));
	//$("#leftOption3 select").change(_.throttle(function() { chgSelects("all"); }, 400)); // Make sure you don't overload Javascript!
	//chgSelects("topic");

	//submitMenu();

	// Tabs

});		
