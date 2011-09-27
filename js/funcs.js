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
			$("#topic_loader").show();	

			var status = [];
			$('input[name=prop_status]:checked').each(function() {
				status.push($(this).val());
			});
			//but we need a string
			status = status.join(',');
			var params = "org=" + $("#orgs").val() + "&" + "year=r" + $("select[name=year_from]").val() + "-" + $("select[name=year_to]").val() + "&" + "status=" + status;
			$.getJSON(apiurl + 'topic?' + params + '&summ&jsoncallback=?', function(data) {
				//populate table
				loadTopics(data);
				$("#topic_loader").hide();
			}); 
		}
	}
	if (selector == "org" || selector == "all") {
		var topicStr = "";
		if ($("#topics").val() != null) {
			topicStr = "t" + ($("#primary_topic").attr("checked")?"1":"") + "=" + $("#topics").val() + "&";
		}
		var params = topicStr + "year=r" + $("select[name=year_from]").val() + "-" + $("select[name=year_to]").val()
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
//console.log('loading topics');	
	//reset the summaries
	$("#topics_selected").html('0');
	$("#proposals_selected").html('0');
	$("#pi_selected").html('0');
	$("#inst_selected").html('0');
	$("#topics_selected_right").html('0');
	$("#proposals_selected_right").html('0');
	$("#summary_totalfunding").html('0');
	$("#summary_minyear").html('');
	$("#summary_maxyear").html('');
	$("#summary_rankedtopics_bycount_1").html('');
	$("#summary_rankedtopics_bycount_2").html('');
	$("#summary_rankedtopics_bycount_3").html('');
	$("#summary_rankedtopics_byfunding_1").html('');
	$("#summary_rankedtopics_byfunding_2").html('');
	$("#summary_rankedtopics_byfunding_3").html('');
	$("#summary_breakdown").html('');
	$('#topics-tab-summary_breakdown').html('');
	$("#pi_selected_right").html('0');
	$("#inst_selected_right").html('0');
	
//console.log('loading topics');	
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
			keyExists("request_dollar",v,null),
			0,
		]; 
	});

	$("#topics_total").html(aaData.length);

//console.log(aaData);
	//before we do anything figure out the max number of proposals
	//we need this for the "bar graphs"
	var maxProposalCount = 0;
	var maxAwardCount = 0;
	var maxFundingRate = 0;
	for (var i=0;i<aaData.length;i++) {
		if (aaData[i][3]>maxProposalCount) maxProposalCount = aaData[i][3];
		if (!aaData[i][6]) {
			//if no requested dollar amount available use awarded dollar for total funding numbers (public vs. private access)
			//if (aaData[i][5]>maxAwardCount) maxAwardCount = aaData[i][5];
			aaData[i][7] = 0;
		} else {
			//if (aaData[i][6]>maxAwardCount) maxAwardCount = aaData[i][6];
			aaData[i][7] = ((aaData[i][5]/aaData[i][6])*100).toFixed(2);
		}
		if (aaData[i][5]>maxAwardCount) maxAwardCount = aaData[i][5];
		if (aaData[i][7]>maxFundingRate) maxFundingRate = aaData[i][7];
	}
//console.log(maxAwardCount);	
//alert(maxProposalCount);	

	//set the number of orgs selected
	$("#orgs_selected_right").html($("#orgs :selected").length);

/*console.log($(document).dataTableSettings);
	var s = $(document).dataTableSettings;
	//clear the datatable
	if (s != 'undefined') {
		var len = s.length;
		for (var i=0; i < len; i++)
		{  
			// if already exists, remove from the array
			if (s[i].sInstance == "topics_table") {
console.log('clearing table');
				$('#topics_table').dataTable().fnClearTable(0);
				//s.splice(i,1);
			}
		}
	}
console.log($(document).dataTableSettings);	*/
//	$('#topics_table').dataTable().fnClearTable( 0 );
	
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
				//"bUseRendered": false,
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
					//var numPixels = 0;
					//if (maxProposalCount > 0) numPixels = Math.ceil((150/maxProposalCount)*oObj.aData[3]);
					var numProposals = oObj.aData[3];
					return '<span class="number numproposals">'+numProposals+'</span>'; //'<strong class="num-bar-wrap num-bar-proposals"><span class="num-bar" style="width: '+numPixels+'px;"><span class="number numproposals">'+numProposals+'</span></span></strong>';
				},
				"bUseRendered": false,
				/*"sWidth": "150px",*/
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
					if (maxAwardCount > 0) {
						numPixels = Math.ceil((150/maxAwardCount)*oObj.aData[5]);
					}
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
						if (maxAwardCount > 0) {
							numPixels = Math.ceil((150/maxAwardCount)*oObj.aData[6]);
						}
						return '<strong class="num-bar-wrap num-bar-amount"><span class="num-bar" style="width: '+numPixels+'px;"><span class="number">$ '+formattedAwarded_Dollar+'M</span></span></strong>';						
					}
				},
				"bSearchable": false,
				"bUseRendered": false,
				"sWidth": "150px",
				"sTitle": "Request Funding", 
				"bVisible": false,
				"aTargets": [ 6 ]
			},
			{
				"fnRender": function ( oObj ) {
					var calc = oObj.aData[7];
					var numPixels = 0;
					if (oObj.aData[7]) {
						if (maxFundingRate > 0) {
							numPixels = Math.ceil((150/maxFundingRate)*calc);
						}
						calc += '%';
					}
					return '<strong class="num-bar-wrap num-bar-proposals"><span class="num-bar" style="width: '+numPixels+'px;"><span class="number numproposals">'+calc+'</span></span></strong>'; //'<strong class="num-bar-wrap num-bar-proposals"><span class="number numproposals">'+calc+'</span></strong>';
				},
				"bVisible": false,
				"bUseRendered": false,
				"sWidth": "150px",
				"sTitle": "Funding Rate", 
				"aTargets": [ 7 ]
			}
		],
		"aaSorting": [[3, 'desc']]
	});
	
	//if awarded selected show last column and default sort by it
	var propstatusarray = [];
	$('[id^="prop_status"]:checked').each(function() {
		propstatusarray.push($(this).val());
	});
	
//console.log('proposalaccessallowed:'+proposalaccessallowed);
//console.log(propstatusarray);
	if (proposalaccessallowed && jQuery.inArray( "award", propstatusarray )!=-1) {
		oTable.fnSetColumnVis( 7, true );
	}
	
	//append the view toggle states after the filter
//console.log($('#topics_table_wrapper #topics_table_filter').html());
	//$('#topics_table_wrapper #topics_table_filter').before( '<div id="topics_table_views" class="dataTables_filter"><a href="#" id="topics_tables_views_text"><img src="images/btn-query-topic-text_on.gif" /></a><a href="#" id="topics_tables_views_graph"><img src="images/btn-query-topic-graph_off.gif" /></a></div>' );
	
	/*
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
	}); */
	
	/*$('#topics_table span[title]').qtip({
	      content: {
	         text: false // Use each elements title attribute
	      },
	});*/
	
	$("#navDivisions").slideUp();
	$("#navDivisions-sm").slideDown();
	$("#navTopics").slideDown();
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

	//check status
	if (!input.prop_status) {
		validateMsg("Please specify a status!");
		return;		
	};
	
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
	
	//now put in a little intelligence here
	var showawards = false;
	var showprop = false;
	var selectedstatus = query_status.split(',');
//console.log(selectedstatus);
	for (var i in selectedstatus) {
		if (selectedstatus[i]=="award") {
			//if award is any one of the items selected tab is always grant
			showawards = true;
		} else {
			showprop = true;
		}
	}

	//if requested tab is grant but propose or decline checked then default is prop
	if (tab=="grant" && !showawards) tab = "prop";		
	
	//reset summaries
	var propstatus = query_status;
	if (tab=="grant") propstatus = "award";
	else if (tab=="prop") {
		//only award or decline depending on what was selected
		var tmp = "";
		var propstatusarray = propstatus.split(",");
//alert(propstatusarray);				
		if (jQuery.inArray( "propose", propstatusarray )!=-1) tmp = "propose";
		if (jQuery.inArray( "decline", propstatusarray )!=-1) {
			if (tmp) tmp += ',';
			tmp += "decline";
		}
		propstatus = tmp;
	}
//console.log('propstatus:'+propstatus);			
	//reset summaries
	if (tab=="prop") {
		$("#summary_props").html('0');
		$("#summary_prop_datefirst").html('');
		$("#summary_prop_datelast").html('');
		$("#summary_prop_funding_total").html('');
		$("#summary_rankedprops_byfunding_1").html('');
		$("#summary_rankedprops_byfunding_2").html('');
		$("#summary_rankedprops_byfunding_3").html('');
		$("#summary_rankedprop_byfunding_4").html('');				
		$("#summary_prop_funding_min").html('');				
	} else if (tab=="grant") {
		$("#summary_grants").html('0');
		$("#summary_datefirst").html('');
		$("#summary_datelast").html('');
		$("#summary_funding_total").html('0');
		$("#summary_rankedgrants_byfunding_1").html('');
		$("#summary_rankedgrants_byfunding_2").html('');
		$("#summary_rankedgrants_byfunding_3").html('');
		$("#summary_rankedgrants_byfunding_4").html('');				
		$("#summary_funding_min").html('');
	} else if (tab=="pi") {
		$("#summary_pis").html('0');
		$("#summary_rankedpis_bypropcount_1").html('');
		$("#summary_rankedpis_bypropcount_2").html('');
		$("#summary_rankedpis_bypropcount_3").html('');
		$("#summary_rankedpis_bypropcount_4").html('');
		$("#summary_rankedpis_bypropcount_5").html('');
		$("#summary_rankedpis_byawardcount_1").html('');
		$("#summary_rankedpis_byawardcount_2").html('');
		$("#summary_rankedpis_byawardcount_3").html('');
		$("#summary_rankedpis_byawardcount_4").html('');
		$("#summary_rankedpis_byawardcount_5").html('');
		$("#summary_rankedpis_byawardfunding_1").html('');
		$("#summary_rankedpis_byawardfunding_2").html('');
		$("#summary_rankedpis_byawardfunding_3").html('');
		$("#summary_rankedpis_byawardfunding_4").html('');
		$("#summary_rankedpis_byawardfunding_5").html('');
		$("#summary_rankedpis_byavgawardfunding_1").html('');
		$("#summary_rankedpis_byavgawardfunding_2").html('');
		$("#summary_rankedpis_byavgawardfunding_3").html('');
		$("#summary_rankedpis_byavgawardfunding_4").html('');
		$("#summary_rankedpis_byavgawardfunding_5").html('');				
	} else if (tab=="org") {
		$("#summary_orgs").html('0');
		$("#summary_rankedorgs_bypropcount_1").html('');
		$("#summary_rankedorgs_bypropcount_2").html('');
		$("#summary_rankedorgs_bypropcount_3").html('');
		$("#summary_rankedorgs_bypropcount_4").html('');
		$("#summary_rankedorgs_bypropcount_5").html('');
		$("#summary_rankedorgs_byawardcount_1").html('');
		$("#summary_rankedorgs_byawardcount_2").html('');
		$("#summary_rankedorgs_byawardcount_3").html('');
		$("#summary_rankedorgs_byawardcount_4").html('');
		$("#summary_rankedorgs_byawardcount_5").html('');
		$("#summary_rankedorgs_byawardfunding_1").html('');
		$("#summary_rankedorgs_byawardfunding_2").html('');
		$("#summary_rankedorgs_byawardfunding_3").html('');
		$("#summary_rankedorgs_byawardfunding_4").html('');
		$("#summary_rankedorgs_byawardfunding_5").html('');
		$("#summary_rankedorgs_byavgawardfunding_1").html('');
		$("#summary_rankedorgs_byavgawardfunding_2").html('');
		$("#summary_rankedorgs_byavgawardfunding_3").html('');
		$("#summary_rankedorgs_byavgawardfunding_4").html('');
		$("#summary_rankedorgs_byavgawardfunding_5").html('');				
	}

//	if ($smarty.get.alert=="amy") {
//		alert(JSON.stringify(input));
//	}
	//renderIt(query_nsfDiv, query_yearFrom, query_yearTo, propstatus, query_topics, query_primtopic, tab);
	//renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_status, query_topics, query_primtopic, tab);
	//renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, "grant");
	//renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, "pi");
	//renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, "org");

//console.log('tab:'+tab);
	//show/hide relevant tabs
	//if only award selected, hide prop tab
	$("#tab-prop").hide();
	$("#tab-grant").hide();
	if (showawards) $("#tab-grant").show();
	if (showprop) $("#tab-prop").show();
/*	if (selectedstatus.length==1) {
		if (selectedstatus[0]=="award") {
			$("#tab-grant").show();	
		} else {
console.log('showing prop tab');			
			$("#tab-prop").show();	
		}
	} else {
		if ("propose" in selectedstatus || "decline" in selectedstatus) $("#tab-prop").show();
		if ("award" in selectedstatus) $("#tab-grant").show();
	}*/

	//deselect all tabs first
    $('#tabs').tabs( 'selected' , -1 );
    $(".ui-tabs-selected").removeClass("ui-state-active").removeClass("ui-tabs-selected");
	
//alert('tab:'+tab);		
	//activate tab
	//this will take care of rendering
	if (tab=='prop') {
//console.log('showing tab prop');
		$('#tabs').tabs('select',0);
	} else if (tab=='grant') {
		$('#tabs').tabs('select',1);
	} else if (tab=='pi') {
		$('#tabs').tabs('select',2);			
	} else if (tab=='org') {
		$('#tabs').tabs('select',3);
	}
//console.log('all good, proceeding');
//return;	

	//now show the selected topics in the filter form for prop tab
	$("form[id=filter_results]").html('');
	var filterhtml = '';
	var filtercount = 0;
	for (var i in selectedstatus) {
		//ugly but quick
		if (selectedstatus[i]=="award") continue; 
		filtercount++;
		if (selectedstatus[i]=="propose") var label="Proposed";
		else if (selectedstatus[i]=="decline") var label="Declined";
		filterhtml += '<strong><input type="checkbox" value="'+selectedstatus[i]+'" name="prop_status" checked>'+label+'</strong>'
	}
	if (filtercount>1 && filterhtml) {
		$("form[id=filter_results]").append(filterhtml);
		$("form[id=filter_results]").append('<input class="buttonGreen-sm" type="button" name="filter_button" value="Filter">');		
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
		query = query + "year=r" + year + "&";
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
