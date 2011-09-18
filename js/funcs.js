//global variable that holds proposal data for selected topics
//when user first selects a topic read the data and store it in this array (indexed by topic id)
//then use it to add/remove from the summary instead of retrieving it each time
var topicsummarydata = {};

function setSelects() {
	var numSelected = $("#orgs :selected").length;
	var selValues = "";
	$.each($("#orgs").val(),function(key,value) {
		if (selValues!="") selValues += ", ";
		selValues += value;
	});
	$("#orgs_selected").html((selValues==null)?"":(selValues)); 
	selValues = $("#year_from").val()+' - '+$("#year_to").val();
	$("#year_selected").html((selValues==null)?"":(selValues)); 
	selValues = "";
	$('[id^="prop_status"]:checked').each(function() {
		if (selValues!="") selValues += ", ";
		selValues += $(this).next().text();
	});
	$("#propstatus_selected").html(selValues); 
	$("#primarytopic_selected").html($("#primary_topic").attr("checked")?"Primary Topic Only":"All Topics");
}		
function chgSelects(selector) {
	//first clear out the msg - this is important because we use to below in the submitMenu function to determine if an error occurred
	//it's not the cleanest way to do error checking but it's the quickest for now
	$("#message").html(null);
	
	if (selector == "topic" || selector == "all") {
		var selTopics = $("#topics").val(); //PREVIOUSLY SELECTED
		if ($("#orgs").val() != null) {
			var status = [];
			$('input[name=prop_status]:checked').each(function() {
				status.push($(this).val());
			});
			//but we need a string
			status = status.join(',');
			var params = "org=" + $("#orgs").val() + "&" + "year=" + $("select[name=year_from]").val() + "-" + $("select[name=year_to]").val() + "&" + "status=" + status;
			$.getJSON(apiurl + 'topic?' + params + '&summ&jsoncallback=?', function(data) {
				//populate table
				loadTopics(data);
			}); 
		}
	}
	if (selector == "org" || selector == "all") {
		var topicStr = "";
		if ($("#topics").val() != null) {
			topicStr = "t" + ($("#primary_topic").attr("checked")?"1":"") + "=" + $("#topics").val() + "&";
		}
		var params = topicStr + "year=" + $("select[name=year_from]").val() + "-" + $("select[name=year_to]").val()
		prevSelOrgs = $("#orgs").val(); //PREVIOUSLY SELECTED 
		$.getJSON(apiurl+'topic?' + params + '&summ&jsoncallback=?', function(data) {
			//populate table
			loadTopics(data);
			
			selOrgs = _.uniq(_.map(data["data"], function(v) { return v["org"]; }));
			$("#orgs").html($.data($("body").get(0), "orgSelect")); //RESET ORG VIEW
			$("#orgs optgroup").each(function(i, v) { //SELECT ITEMS THAT WERE PREVIOUSLY SELECTED
				if (_.intersect(selOrgs, $(v).attr("value").split(",")).length == 0) {
					$(v).remove();
				} else {
					$(v).children("option").each(function(i2, v2) {
						if ($.inArray($(v2).val(), selOrgs) == -1) {
							$(v2).remove();
						} else if ($.inArray($(v2).val(), prevSelOrgs) > -1) {
							$(v2).attr("selected", "selected");
						} 
					});
				}
			});
			
		}); 
	}
	setSelects();
}

function loadTopics(data) {
	var aaData = _.map(data["data"], function(v) { 
		//the random columns generate a number to use to generate an image of a graph from a list of graph images img1-img10
		//the last column is a dummy number between 
//		var fundMax = 20;
//		var fundMin = 1;
		var imgMax = 10;
		var imgMin = 1;
		return [
			v["t1"],
			v["words"],
			padding_left((Math.floor(Math.random() * (imgMax - imgMin + 1)) + imgMin).toString(), '0', 2),			
			v["count"],
			padding_left((Math.floor(Math.random() * (imgMax - imgMin + 1)) + imgMin).toString(), '0', 2),			
			v["awarded_dollar"],
			keyExists("requested_dollar",v,null),
		]; 
	});

	$("#topics_total").html(aaData.length);

//console.log(aaData);
	//before we do anything figure out the max number of proposals
	//we need this for the "bar graphs"
	var maxProposalCount = 0;
	var maxAwardCount = 0;
	for (var i=0;i<aaData.length;i++) {
		if (aaData[i][3]>maxProposalCount) maxProposalCount = aaData[i][3];
		if (aaData[i][6]) {
			//if no requested dollar amount available use awarded dollar for total funding numbers (public vs. private access)
			if (aaData[i][5]>maxAwardCount) maxAwardCount = aaData[i][5];
		} else {
			if (aaData[i][6]>maxAwardCount) maxAwardCount = aaData[i][6];
		}
	}
//alert(maxProposalCount);	

	//set the number of orgs selected
	$("#orgs_selected_right").html($("#orgs :selected").length);

	var oTable = $('#topics_table').dataTable({
		//TableTools - copy, csv, print, pdf
		"bJQueryUI": true,
		"sPaginationType": "full_numbers",
		"bDestroy": true,
		"bProcessing": true,
		"bAutoWidth": false,
		"iDisplayLength": 10,
		"aaData": aaData,
		"aoColumnDefs": [
			{
				"fnRender": function ( oObj ) {
					return '<input type="checkbox" name="topic[]" value="'+oObj.aData[0]+'">';
				},
				"bSearchable": false,
				"bSortable": false,
				"bUseRendered": false,
				"sTitle": "Select",
				"aTargets": [ 0 ]
			},
			{
				"fnRender": function ( oObj ) {
					return '<strong>Topic '+oObj.aData[0]+'</strong> : '+oObj.aData[1];
				},
				"bUseRendered": false,
				"bSortable": false,
				"sTitle": "Topic",
				//"sClass": "topic_words", 
				"aTargets": [ 1 ]
			},
			{
				"fnRender": function ( oObj ) {
					return '<span class="graph-image-wrap"><img src="images/graph-qty-'+oObj.aData[2]+'.gif" /><span class="number">'+oObj.aData[3]+'</span></span>';
				},
				"bSearchable": false,
				"bSortable": false,
				"bUseRendered": false,
				"sTitle": "Proposals Distribution (qty)",
				"bVisible": false,
				"aTargets": [ 2 ]
			},
			{
				"fnRender": function ( oObj ) {
					//calculate the width of the "bar" for this row
					//it is relative to the maxCount and the size of this column - 150px
					var numPixels = 0;
					if (maxProposalCount > 0) numPixels = Math.ceil((150/maxProposalCount)*oObj.aData[3]);
					var numProposals = oObj.aData[3];
					if (oObj.aData[6]) {
						var tmp = ((oObj.aData[5]/oObj.aData[6])*100).toFixed(2);
						numProposals += ' / '+tmp+'%';
					}
					return '<strong class="num-bar-wrap num-bar-proposals"><span class="num-bar" style="width: '+numPixels+'px;"><span class="number numproposals">'+numProposals+'</span></span></strong>';
				},
				"bSearchable": false,
				"bUseRendered": false,
				"sWidth": "150px",
				"sTitle": "Proposals", 
				"aTargets": [ 3 ]
			},
			{
				"fnRender": function ( oObj ) {
					return '<span class="graph-image-wrap"><img src="images/graph-funded-'+oObj.aData[4]+'.gif" /><span class="number">'+oObj.aData[5]+'</span></span>';
				},
				"bSearchable": false,
				"bSortable": false,
				"bUseRendered": false,
				"sTitle": "Funding Distribution ($ millions)",
				"bVisible": false,
				"aTargets": [ 4 ]
			},
			{
				"fnRender": function ( oObj ) {
					//calculate the width of the "bar" for this row
					//it is relative to the maxCount and the size of this column - 150px
					var numPixels = 0;
					var formattedAwarded_Dollar = (oObj.aData[5]/1000000).toFixed(2);
					if (maxProposalCount > 0) numPixels = Math.ceil((150/maxProposalCount)*formattedAwarded_Dollar);
					return '<strong class="num-bar-wrap num-bar-amount"><span class="num-bar" style="width: '+numPixels+'px;"><span class="number">$ '+formattedAwarded_Dollar+'M</span></span></strong>';
				},
				"bSearchable": false,
				"bUseRendered": false,
				"sWidth": "150px",
				"sTitle": "Funding", 
				"aTargets": [ 5 ]
			},
			{
				"fnRender": function ( oObj ) {
					//calculate the width of the "bar" for this row
					//it is relative to the maxCount and the size of this column - 150px
					if (oObj.aData[6]) {
						var numPixels = 0;
						var formattedAwarded_Dollar = (oObj.aData[6]/1000000).toFixed(2);
						if (maxProposalCount > 0) numPixels = Math.ceil((150/maxProposalCount)*formattedAwarded_Dollar);
						return '<strong class="num-bar-wrap num-bar-amount"><span class="num-bar" style="width: '+numPixels+'px;"><span class="number">$ '+formattedAwarded_Dollar+'M</span></span></strong>';						
					}
				},
				"bSearchable": false,
				"bUseRendered": false,
				"sWidth": "150px",
				"sTitle": "Request Funding", 
				"bVisible": false,
				"aTargets": [ 6 ]
			}
		],
		"aaSorting": [[3, 'desc']]
	});
	
	//append the view toggle states after the filter
//console.log($('#topics_table_wrapper #topics_table_filter').html());
	//$('#topics_table_wrapper #topics_table_filter').before( '<div id="topics_table_views" class="dataTables_filter"><a href="#" id="topics_tables_views_text"><img src="images/btn-query-topic-text_on.gif" /></a><a href="#" id="topics_tables_views_graph"><img src="images/btn-query-topic-graph_off.gif" /></a></div>' );
	
	//trap views links
	//text
	$('#topics_table_wrapper #topics_tables_views_text').click(function(event) {
		oTable.fnSetColumnVis( 2, false );
		oTable.fnSetColumnVis( 3, true );
		oTable.fnSetColumnVis( 4, false );
		oTable.fnSetColumnVis( 5, true );
		//$(this).parent().addClass('on');
		//$('#topics_table_wrapper #topics_tables_views_graph').parent().removeClass('on');
		$(this).html('<img src="images/btn-query-topic-text_on.gif" />');
		$('#topics_table_wrapper #topics_tables_views_graph').html('<img src="images/btn-query-topic-graph_off.gif" />');
		
		event.preventDefault();
	});
	//graph
	$('#topics_table_wrapper #topics_tables_views_graph').click(function(event) {
		oTable.fnSetColumnVis( 2, true );
		oTable.fnSetColumnVis( 3, false );
		oTable.fnSetColumnVis( 4, true );
		oTable.fnSetColumnVis( 5, false );
		//$(this).parent().addClass('on');
		//$('#topics_table_wrapper #topics_tables_views_text').parent().removeClass('on');
		$(this).html('<img src="images/btn-query-topic-graph_on.gif" />');
		$('#topics_table_wrapper #topics_tables_views_text').html('<img src="images/btn-query-topic-text_off.gif" />');

		event.preventDefault();
	});
	
	/*$('#topics_table span[title]').qtip({
	      content: {
	         text: false // Use each elements title attribute
	      },
	});*/
	
	$('#topics_table input[name="topic[]"]').live('click',function(event) {
		//trap topic selection
		var numTopicsSelected = $("#topics_selected").html();
		var numProposalsSelected = parseInt($("#proposals_selected").html());
		if ($(this).attr('checked')) {
			//set the row on
			$(this).parent().parent().addClass('selected');
			numTopicsSelected++; 
			numProposalsSelected += parseInt($(this).parent().parent().find('span.numproposals').html());
		} else {
			//set the row off
			$(this).parent().parent().removeClass('selected');
			numTopicsSelected--;
			numProposalsSelected -= parseInt($(this).parent().parent().find('span.numproposals').html());
		}
		$("#topics_selected").html(numTopicsSelected);
		$("#proposals_selected").html(numProposalsSelected);

//console.log(topicsummarydata);	
		var topicid = $(this).attr('value');
		var checked = $(this).attr('checked');
		
		//we need status to filter by - get it here
		var propstatus = [];
		$('input[name=prop_status]:checked').each(function() {
			propstatus.push($(this).val());
		});
		//but we need a string
		propstatus = propstatus.join(',');			
		
//console.log(topicid);			
//console.log(topicsummarydata[topicid]);	
		//now pull proposal information for selected topic
		if (topicsummarydata[topicid]!== undefined) {
//console.log('retrieving from cache');			
			updateTopicSummary($(this).attr('checked'),topicsummarydata[topicid]);
		} else {
			//first get the data
			var params = "org=" + $("#orgs").val() + "&" + "year=" + $("select[name=year_from]").val() + "-" + $("select[name=year_to]").val() + "&" + "t1=" + topicid+"&status="+propstatus+"&summ=full";
			$.getJSON(apiurl + 'topic?' + params + '&jsoncallback=?', function(data) {
				//what we get back is a list of topics per year, per org, per status
				//create the compiled data once for quick access
				var count = 0;
				var totalfunding = 0;
				var max_year = null;
				var min_year = null;
				var status = {};
				var org = {};
				var year = {};
				for (var i=0;i<data["data"].length;i++) {
					//count
					count += parseInt(data["data"][i]["count"]);
					//total funding
					totalfunding += parseInt(data["data"][i]["awarded_dollar"]);
					var tmp = data["data"][i]["year"];
					//max year
					if (!max_year) max_year = tmp;
					else if (tmp > max_year) {
						max_year = tmp;
					}
					//min year
					if (!min_year) min_year = tmp;
					else if (tmp < min_year) {
						min_year = tmp;
					}
					//gather counts by status
					if (status[data["data"][i]["status"]]) status[data["data"][i]["status"]] += parseInt(data["data"][i]["count"]);
					else status[data["data"][i]["status"]] = parseInt(data["data"][i]["count"]);
					//gather counts by year
					if (year[data["data"][i]["year"]]) year[data["data"][i]["year"]] += parseInt(data["data"][i]["count"]);
					else year[data["data"][i]["year"]] = parseInt(data["data"][i]["count"]);					
					//gather counts by org
					if (org[data["data"][i]["org"]]) org[data["data"][i]["org"]] += parseInt(data["data"][i]["count"]);
					else org[data["data"][i]["org"]] = parseInt(data["data"][i]["count"]);					
				}				
				var compileddata = {};
				//save it
				compileddata['summary_count'] = count;
				compileddata['summary_totalfunding'] = totalfunding;
				compileddata['summary_maxyear'] = max_year;
				compileddata['summary_minyear'] = min_year;
				compileddata['summary_status'] = status;
				compileddata['summary_year'] = year;
				compileddata['summary_org'] = org;
				//save it
				topicsummarydata[topicid] = compileddata;
				//populate table
				updateTopicSummary(checked,compileddata);				
			}); 
		}
		
		//do it on the right side too
		$("#topics_selected_right").html(numTopicsSelected);	
		$("#proposals_selected_right").html(numProposalsSelected);	

		//get count of institutions - we're not caching these for now
		var params = "org=" + $("#orgs").val() + "&" + "year=" + $("select[name=year_from]").val() + "-" + $("select[name=year_to]").val() + "&" + "t1=" + topicid+"&status="+propstatus+"&page=org";
		$.getJSON(apiurl + 'topic?' + params + '&jsoncallback=?', function(data) {
			var curr_inst_count = parseInt($("#inst_selected_right").html());
			if (checked) curr_inst_count += parseInt(data["count"]);
			else curr_inst_count -= parseInt(data["count"]);
			$("#inst_selected_right").html(curr_inst_count);
			$("#inst_selected").html(curr_inst_count);
		});
		
		//get count of researchers - we're not caching these for now
		var params = "org=" + $("#orgs").val() + "&" + "year=" + $("select[name=year_from]").val() + "-" + $("select[name=year_to]").val() + "&" + "t1=" + topicid+"&status="+propstatus+"&page=pi";
		$.getJSON(apiurl + 'topic?' + params + '&jsoncallback=?', function(data) {
			var curr_pi_count = parseInt($("#pi_selected_right").html());
			if (checked) curr_pi_count += parseInt(data["count"]);
			else curr_pi_count -= parseInt(data["count"]);
			$("#pi_selected_right").html(curr_pi_count);
			$("#pi_selected").html(curr_pi_count);
		});		
		
		//and lastly, if none checked, hide view results button - you can only do this after selecting a topic
		if (numTopicsSelected==0) $(".button_view_results").hide();
		else $(".button_view_results").show();
	});	
	
	$("#navDivisions").slideUp();
	$("#navDivisions-sm").slideDown();
	$("#navTopics").slideDown();
}

function updateTopicSummary(checked,data) {
//console.log(checked);
//console.log(data);

	//extract the selected items out of the cached list
	//current checked items
	var checkedtopics = $('#topics_table input:checked[name="topic[]"]').map(function() {
		var tmp = topicsummarydata[$(this).val()];
		//add the topic id
		tmp['id'] = $(this).val();
		return tmp;
		//return parseInt($(this).val());
	}); //.get().join()
	
	//total funding
	var curr_summary_totalfunding = parseInt(removeNumberFormatting($("#summary_totalfunding").html()));
	var summary_totalfunding = data['summary_totalfunding'];
	if (checked) curr_summary_totalfunding += summary_totalfunding;
	else curr_summary_totalfunding -= summary_totalfunding;
	curr_summary_totalfunding = addCommas(curr_summary_totalfunding);
	if (curr_summary_totalfunding) curr_summary_totalfunding = '$'+curr_summary_totalfunding; 
	$("#summary_totalfunding").html(curr_summary_totalfunding);
	//max year
	var curr_summary_maxyear = $("#summary_maxyear").html();
	var summary_maxyear = data['summary_maxyear'];
	//if the max year is not set this is the max year
	if (!curr_summary_maxyear) curr_summary_maxyear = summary_maxyear;
	//if the max year is set and 
	else {
		//we are checking
		if (checked) {
			//this year is more than the curr max year update curr max year
			if (summary_maxyear>parseInt(curr_summary_maxyear)) curr_summary_maxyear = summary_maxyear;
		} else {
			//if we are unchecking
			//if nothing currently checked reset
			if (checkedtopics.length==0) curr_summary_maxyear = null;
			else {
				//this year is not the same as curr max year
				if (summary_maxyear!=parseInt(curr_summary_maxyear)) {
					//reset to the "previous" max - we get previous max by looping through the list of cached topcis (excluding this one) and finding the max year
					summary_maxyear = 0;
					for (var i in checkedtopics) {
						if (checkedtopics[i]['summary_maxyear']>summary_maxyear) summary_maxyear = checkedtopics[i]['summary_maxyear'];
					}
					curr_summary_maxyear = summary_maxyear;			
				}				
			}
		}
	}
	$("#summary_maxyear").html(curr_summary_maxyear);	
	//min year
	var curr_summary_minyear = $("#summary_minyear").html();
	var summary_minyear = data['summary_minyear'];
	//if the min year is not set this is the min year
	if (!curr_summary_minyear) curr_summary_minyear = summary_minyear;
	//if the min year is set and 
	else {
		//we are checking
		if (checked) {
			//this year is less than the curr min year update curr min year
			if (summary_minyear>parseInt(curr_summary_minyear)) curr_summary_minyear = summary_minyear;
		} else {
			//if we are unchecking
			//if nothing currently checked reset
			if (checkedtopics.length==0) curr_summary_minyear = null;
			else {
				//this year is the not same as curr min year
				if (summary_minyear!=parseInt(curr_summary_minyear)) {
					//reset to the "previous" max - we get previous max by looping through the list of cached topcis (excluding this one) and finding the min year
					summary_minyear = 0;
					for (var i in checkedtopics) {
						if (!summary_minyear) summary_minyear = checkedtopics[i]['summary_minyear'];
						else {
							if (checkedtopics[i]['summary_minyear']<summary_minyear) summary_minyear = checkedtopics[i]['summary_minyear'];							
						}
					}
					curr_summary_minyear = summary_minyear;			
				}				
			}
		}
	}
	$("#summary_minyear").html(curr_summary_minyear);
//console.log(checkedtopics);	
	//now collate by status
	var status = {};
	var org = {};
	var year = {};
	for (var i in checkedtopics) {
		var summary_status = checkedtopics[i]["summary_status"];
		//gather counts by status
		for (var topic_status in summary_status) {
			if (status[topic_status]) status[topic_status] += summary_status[topic_status];
			else status[topic_status] = summary_status[topic_status];
		}
		//gather counts by year
		var summary_year = checkedtopics[i]["summary_year"];
		//gather counts by year
		for (var topic_year in summary_year) {
			if (year[topic_year]) year[topic_year] += summary_year[topic_year];
			else year[topic_year] = summary_year[topic_year];
		}
		//gather counts by org
		var summary_org = checkedtopics[i]["summary_org"];
		//gather counts by org
		for (var topic_org in summary_org) {
			if (org[topic_org]) org[topic_org] += summary_org[topic_org];
			else org[topic_org] = summary_org[topic_org];
		}
	}
	//got them all, now display
	var status_html = '';
	for (var i in status) {
		status_html += '<tr>';
		status_html += '<td class="label">';
		if (i=='award') status_html+='Awarded';
		else if (i=='propose') status_html+='Proposed';
		else if (i=='decline') status_html+='Declined';
		status_html += '</td>';
		status_html += '<td class="value">'+status[i]+'</td>';
		status_html += '</tr>';
	}
	var year_html = '';
	//we want to sort
	//currently an associative array - so first have to sort keys - bit icky but quick and dirty for now
	var sortedKeys = new Array();
	var sortedObj = {};	
	// Separate keys and sort them
	for (var i in year){
		sortedKeys.push(i);
	}
	sortedKeys.sort();		 
	// Reconstruct sorted obj based on keys
	for (var i in sortedKeys){
		sortedObj[sortedKeys[i]] = year[sortedKeys[i]];
	}
	for (var i in sortedObj) {
		year_html += '<tr>';
		year_html += '<td class="label">'+i+'</td>';
		year_html += '<td class="value">'+sortedObj[i]+'</td>';
		year_html += '</tr>';
	}
	var org_html = '';
	for (var i in org) {
		org_html += '<tr>';
		org_html += '<td class="label">'+i+'</td>';
		org_html += '<td class="value">'+org[i]+'</td>';
		org_html += '</tr>';
	}
	var html = '';
	html += status_html;
	if (org_html) {
		html += '<tr><td class="label">&nbsp;</td><td>&nbsp;</td></tr>';
		html += org_html;
	}
	if (year_html) {
		html += '<tr><td class="label">&nbsp;</td><td>&nbsp;</td></tr>';
		html += year_html;
	}
	$("#summary_breakdown").html(html);
	//now for the topic rankings
	//first by number of grants
	//sort the summaries list - descending by count
	checkedtopics.sort(function(a,b) {return (a.summary_count > b.summary_count) ? -1 : ((b.summary_count > a.summary_count) ? 1 : 0);} );	
	//now select the top 3 out of the summaries list
	for (var i=0;i<3;i++) {
		//we always reset this - just for now, for simplicity sake, later we can add a check to see if the rankings need to be updated or not
		$("#summary_rankedtopics_bycount_"+(i+1)).html(null);	
		if (checkedtopics[i]) {
			//we found one, add it to the summary
			$("#summary_rankedtopics_bycount_"+(i+1)).html(checkedtopics[i]['id']+' ('+checkedtopics[i]['summary_count']+')');				
		}
	}
	//do the funding rankings
	//sort the summaries list - descending by totalfunding
	checkedtopics.sort(function(a,b) {return (a.summary_totalfunding > b.summary_totalfunding) ? -1 : ((b.summary_totalfunding > a.summary_totalfunding) ? 1 : 0);} );	
	//now select the top 3 out of the summaries list
	for (var i=0;i<3;i++) {
		//we always reset this - just for now, for simplicity sake, later we can add a check to see if the rankings need to be updated or not
		$("#summary_rankedtopics_byfunding_"+(i+1)).html(null);	
		if (checkedtopics[i]) {
			//we found one, add it to the summary
			var totalfunding = addCommas(checkedtopics[i]['summary_totalfunding']);
			if (totalfunding) totalfunding = '$'+totalfunding;
			$("#summary_rankedtopics_byfunding_"+(i+1)).html(checkedtopics[i]['id']+' ('+totalfunding+')');	
		}
	}
}

function validateMsg(text) {
	$("#message").html(text)
	$("#message").show();
	//setTimeout('$("#message").slideUp()', 2500);
}

function getTopics() {
	$("#message").html("");
	
	var tab = selTab;
		
	var input = $("#queryform").serializeObject();
	var year_from = input.year_from;
	var year_to = input.year_to;

	if(year_from > year_to) {
		validateMsg("Please enter a valid date range!");
		return;
	}
	
	chgSelects('topic');
}

function editQuery() {
	$("#queryresults").slideUp();
	$("#navDivisions-sm").slideUp(); //this is the guy that shows a summary of the query params
	$("#navTopics-sm").slideUp(); //this is the guy that shows a summary of the query params
	$("#navTopics").slideUp();
	//show form
	$("#navDivisions").slideDown();
}

function editTopics() {
	//hide results
	$("#queryresults").slideUp();
	$("#navTopics-sm").slideUp(); //this is the guy that shows a summary of the query params
	//show form
	$("#navTopics").slideDown();
}

function submitMenu(tab) {
//	tab = selTab;
		
	var input = $("#queryform").serializeObject();
//console.log(input);	
	query_nsfDiv = input.org;
	query_yearFrom = input.year_from;
	query_yearTo = input.year_to;
	var tmp = input["topic[]"];
	query_topics = "";
	if( Object.prototype.toString.call( tmp ) === '[object Array]' ) {
		//cheaper than a jquery map for this simple thing
		for(var i = 0, l = tmp.length; i < l; i++) {
			if (query_topics) query_topics += ",";
		    query_topics += tmp[i];
		}		
	} else {
		query_topics = tmp;
	}
	query_primtopic = input.primary_topic;
	//use status
	var tmp = input.prop_status;
	query_status = "";
	if( Object.prototype.toString.call( tmp ) === '[object Array]' ) {
		//cheaper than a jquery map for this simple thing
		for(var i = 0, l = tmp.length; i < l; i++) {
			if (query_status) query_status += ",";
		    query_status += tmp[i];
		}		
	} else {
		query_status = tmp;
	}

//	if ($smarty.get.alert=="amy") {
//		alert(JSON.stringify(input));
//	}
	renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_status, query_topics, query_primtopic, tab);
	//renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, "grant");
	//renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, "pi");
	//renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, "org");

	//activate tab
	if (tab=='grant') {
		$('#tabs').tabs('select','tabs-1');
	} else if (tab=='pi') {
		$('#tabs').tabs('select','tabs-2');			
	} else if (tab=='org') {
		$('#tabs').tabs('select','tabs-3');
	}
	
	//now either show the results or in case an error occurred, don't show them
	//we check error by seeing if there is anything in the message div - not the best way but quick for now
	//chgSelects above resets the div before a call
//console.log($("#message").html());	
	if (!$("#message").html()) {
		//hide query
		$("#navTopics").slideUp();
		$("#queryresults").slideDown();
		$("#navTopics-sm").slideDown(); //this is the guy that shows a summary of the query params
	}
}

function renderIt(org, year_from, year_to, status, topic, prim, tab) {
	var year = "";
	if(year_from > year_to) {
		validateMsg("Please enter a valid date range!");
		return;
	}
	else if (year_from == year_to){
		year = year_from;
	}

	else{
		year = year_from + "-" + year_to;
	}

	$("#loader").show();
	var query = "";
	if(org != undefined){
		query = query + "org=" + org + "&";
	}
	if(year != ""){
		query = query + "year=" + year + "&";
	}
	if(topic != undefined){
		if(prim){
			query = query + "t1=" + topic + "&";
		}
		else{
			query = query + "t=" + topic + "&";
		}
	}
	if (status != undefined){
		query = query + "status=" + status + "&";
	}
//console.log(query);

	if(query == ""){
		$("#loader").hide();
		validateMsg("Please enter a search query!");
		return;
	}
	else
	{
//		if ($smarty.get.alert=="amy") {
//			alert(apiurl+'topic?' + query + '&jsoncallback=?');
//		}
		renderJSON(query, tab);
/*		$.getJSON(apiurl+'topic?' + query + '&jsoncallback=?', function(data) {
			if (data["Error"] != undefined){
				validateMsg(data["Error"]);
				$("#loader").hide();
			}
			else{
				renderJSON(data);
				$("#loader").hide();
			}
		});*/
	}
}
// left padding s with c to a total of n chars
function padding_left(s, c, n) {
    if (! s || ! c || s.length >= n) {
        return s;
    }

    var max = (n - s.length)/c.length;
    for (var i = 0; i < max; i++) {
        s = c + s;
    }

    return s;
}
