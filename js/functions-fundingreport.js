$(document).ready(function() {
	// Check to see if we have access to nsfstarmetrics server 
	$.ajax({
		url: "http://128.150.10.70/py/api.py/access",
		dataType: 'JSONP',
		timeout: 2000,
		success: function(data) {
			console.log(data);
			proposalaccessallowed = true;
			apiurl = "http://128.150.10.70/py/api.py/";
console.log(apiurl);
		},
		error: function(data) {
			console.log(data);
		},
	});
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
