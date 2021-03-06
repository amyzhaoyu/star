//global variable that holds proposal data for selected topics
//when user first selects a topic read the data and store it in this array (indexed by topic id)
//then use it to add/remove from the summary instead of retrieving it each time
var topicsummarydata = {};

function setSelects() {
/*	var numSelected = $("#orgs :selected").length;
	var selValues = "";
	$.each($("#orgs").val(),function(key,value) {
		if (selValues!="") selValues += ", ";
		selValues += value;
	});
	$("#orgs_selected").html((selValues==null)?"":(selValues)); */
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
		$("#topic_loader").show();
		
		var selTopics = $("#topics").val(); //PREVIOUSLY SELECTED
		var status = [];
		$('input[name=prop_status]:checked').each(function() {
			status.push($(this).val());
		});
		//but we need a string
		status = status.join(',');
		var params = "";
		params += "org=AST,CHE,DMR,DMS,PHY,BIO,MCB,DBI,IOS,DEB,EF,CISE,CCF,CNS,IIS,EHR,DRL,DGE,HRD,DUE,ENG,CBET,CMMI,ECCS,EEC,EFRI,IIP,GEO,AGS,EAR,OCE,SBE,SES,BCS,NCSE,SMA,BFA,BD,DACS,DFM,DGA,DIAS,OIRM,HRM,DIS,DAS";
		params += "&year=r" + $("select[name=year_from]").val() + "-" + $("select[name=year_to]").val();
		if (status) params += "&" + "status=" + status;		
//console.log(apiurl+'topic?' + params + '&summ&jsoncallback=?');		
		$.getJSON(apiurl+'topic?' + params + '&summ&jsoncallback=?', function(data) {
			//populate table
			loadTopics(data);
			$("#topic_loader").hide();
		}); 
	}
	if (selector == "org" || selector == "all") {
		var topicStr = "";
		if ($("#topics").val() != null) {
			topicStr = "t" + ($("#primary_topic").attr("checked")?"1":"") + "=" + $("#topics").val() + "&";
		}
		var params = topicStr + "year=r" + $("select[name=year_from]").val() + "-" + $("select[name=year_to]").val()
		$.getJSON(apiurl+'topic?' + params + '&summ&jsoncallback=?', function(data) {
			//populate table
			loadTopics(data);			
		}); 
	}
	setSelects();
}

function fullTopics(){
	$.getJSON(apiurl+'topic?&summ&jsoncallback=?', function(data) {
		//populate table
		loadTopics(data);
	}); 
	setSelects();
}

function loadTopics(data) {
//console.log('loading topics');
	//reset the summaries
	$("#topics_selected").html('0');
	$("#pi_selected").html('0');
	$("#topics_selected_right").html('0');
	$("#topics_selected_list").empty();
	$("#pi_selected_right").html('0');
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
	
	//clear data table
	//$('#topics_table').empty();

	var aaData = _.map(data["data"], function(v) { 
		//the random columns generate a number to use to generate an image of a graph from a list of graph images img1-img10
		//the last column is a dummy number between 
		var fundMax = 20;
		var fundMin = 1;
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
		/*if (!aaData[i][6]) {
			//if no requested dollar amount available use awarded dollar for total funding numbers (public vs. private access)
			if (aaData[i][5]>maxAwardCount) maxAwardCount = aaData[i][5];
		} else {
			if (aaData[i][6]>maxAwardCount) maxAwardCount = aaData[i][6];
		}*/
		if (aaData[i][5]>maxAwardCount) maxAwardCount = aaData[i][5];
	}
//console.log(maxAwardCount);	
//alert(maxProposalCount);	

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
					return '<span class="number">'+oObj.aData[3]+'</span>'; //'<strong class="num-bar-wrap num-bar-proposals"><span class="num-bar" style="width: '+numPixels+'px;"><span class="number">'+oObj.aData[3]+'</span></span></strong>';
				},
				"bUseRendered": false,
				/* "sWidth": "150px",*/
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
					var formattedAwarded_Dollar = (oObj.aData[5]/1000000).toFixed(2);					
					var numPixels = 0;
					if (maxAwardCount > 0) {
						numPixels = Math.ceil((150/maxAwardCount)*oObj.aData[5]);
					}
//console.log(oObj.aData[5]);					
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
			}
		],
		"aaSorting": [[3, 'desc']]
	});
	
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
	
	//some quick checks
	if(input.year_from > input.year_to) {
		validateMsg("Please enter a valid date range!");
		return;
	}
	//check status
	if (!input.prop_status) {
		validateMsg("Please specify a status!");
		return;		
	};
	
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

	$("#summary_pis").html('0');
	$("#summary_rankedpis_bypropcount_1").html('0');
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

//	if ($smarty.get.alert=="amy") {
//		alert(JSON.stringify(input));
//	}
	renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_status, query_topics, query_primtopic, tab);
	//renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, "grant");
	//renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, "pi");
	//renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, "org");

	//activate tab
	//this will take care of rendering
	//if (tab=='pi') {
//console.log('selecting tab:'+tab);
	//	$('#tabs').tabs('select','tabs-1');			
	//}
	
	//now show the selected topics in the filter form
	var tmp = query_topics.split(',');
	$("form[id=filter_results]").html('');
	for (var i in tmp) {
		$("form[id=filter_results]").append('<strong><input type="checkbox" value="'+tmp[i]+'" name="topic[]" checked>Topic: '+tmp[i]+'</strong>');
	}
	$("form[id=filter_results]").append('<input class="buttonGreen-sm" type="button" name="filter_button" value="Filter">');	
	
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

