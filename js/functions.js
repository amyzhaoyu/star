//global variable that holds selected proposal data
//when user first selects a proposal, researcher or org read the data and store it in this array (indexed by proposal id)
//then use it to add/remove from the summary instead of retrieving it each time
var propsummarydata = {};

$(document).ready(function() {
	// TableTools defaults
	TableTools.DEFAULTS.aButtons = [
						{
							"sExtends": "copy",
							"sButtonText": "Copy to Clipboard",
							"bSelectedOnly": true
						},
						/*{
							"sExtends": "print",
							"bShowAll": false,
						},*/
						{
							"sExtends": "collection",
							"sButtonText": "Export", 
							"aButtons": [
								{
									"sExtends": "csv", 
									"bSelectedOnly": true
								},
								{
									"sExtends": "pdf",
									"bSelectedOnly": true
								}	
							]
						},
						{
							"sExtends": "select_all",
							"fnClick": function ( nButton, oConfig, oFlash ) {
								var selTabIndex = $("#tabs").tabs('option', 'selected');
//console.log(selTabIndex);
								if (selTabIndex==0) {
									$('#props table tbody tr').each( function () {
										$(this).click();
									});									
								} else if (selTabIndex==1) {
									$('#grants table tbody tr').each( function () {
										$(this).click();
									});									
								} else if (selTabIndex==2) {
									$('#pi table tbody tr').each( function () {
										$(this).click();
									});									
								} else if (selTabIndex==3) {
									$('#org table tbody tr').each( function () {
										$(this).click();
									});									
								}
							}							
						},
						{
							"sExtends": "select_none",
							"fnClick": function ( nButton, oConfig, oFlash ) {
								var selTabIndex = $("#tabs").tabs('option', 'selected');
//console.log(selTabIndex);
								if (selTabIndex==0) {
									$('#props table tbody tr').each( function () {
										$(this).click();
									});									
								} else if (selTabIndex==1) {
									$('#grants table tbody tr').each( function () {
										$(this).click();
									});									
								} else if (selTabIndex==2) {
									$('#pi table tbody tr').each( function () {
										$(this).click();
									});									
								} else if (selTabIndex==3) {
									$('#org table tbody tr').each( function () {
										$(this).click();
									});									
								}
							}							
						}
					];
	TableTools.DEFAULTS.sSwfPath = "js/tabletools/media/swf/copy_cvs_xls_pdf.swf";
	TableTools.DEFAULTS.sRowSelect = "multi";

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

	$('#tabs').tabs({
		select: function(event, ui) {
			selTab = ["prop", "grant", "pi", "org", "topics_tab"][ui.index]; //"divs",  put that back before "topics_tab" to reactivate the divs
//console.log(query_nsfDiv);			
//console.log(query_topics);
			var propstatus = query_status;
			if (selTab=="grant") propstatus = "award";
			else if (selTab=="prop") {
				//only award or decline depending on what was selected
				var tmp = "";
				if ("propose" in propstatus.split(',')) tmp = "propose";
				if ("decline" in propstatus.split(',')) {
					if (tmp) tmp += ',';
					tmp += "decline";
				}
				propstatus = tmp;
			}
console.log('propstatus:'+propstatus);			
			//reset summaries
			if (selTab=="prop") {
				$("#summary_props").html('0');
				$("#summary_prop_datefirst").html('');
				$("#summary_prop_datelast").html('');
				$("#summary_prop_funding_total").html('');
				$("#summary_rankedprops_byfunding_1").html('');
				$("#summary_rankedprops_byfunding_2").html('');
				$("#summary_rankedprops_byfunding_3").html('');
				$("#summary_rankedprop_byfunding_4").html('');				
				$("#summary_prop_funding_min").html('');				
			} else if (selTab=="grant") {
				$("#summary_grants").html('0');
				$("#summary_datefirst").html('');
				$("#summary_datelast").html('');
				$("#summary_funding_total").html('');
				$("#summary_rankedgrants_byfunding_1").html('');
				$("#summary_rankedgrants_byfunding_2").html('');
				$("#summary_rankedgrants_byfunding_3").html('');
				$("#summary_rankedgrants_byfunding_4").html('');				
				$("#summary_funding_min").html('');
			} else if (selTab=="pi") {
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
			} else if (selTab=="org") {
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
			renderIt(query_nsfDiv, query_yearFrom, query_yearTo, propstatus, query_topics, query_primtopic, selTab);
		}
	});

	//$('#tabs').tabs();

	//QTip to show information in form options	
	$('option').each(function(){
		$(this).qtip({
			content: $(this).html(),
			show: 'mouseover',
			hide: 'mouseout',
			position: {
				target: 'mouse',
		  		corner: {
					target: 'topLeft',
			 		tooltip: 'bottomLeft'
		   		}
			}
		});
	});

	//filtering the results
	$('#filter_results input[name="filter_button"]').live('click',function(event) {
		//using only what is selected reload the data
		var filteredstatus = [];
		$('#filter_results input[name="prop_status"]:checked').each(function() {
			filteredstatus.push($(this).val());
		});
		if (filteredstatus.length==0) alert('Please select at least one topic');
		else {
			//but we need a string
			filteredstatus = filteredstatus.join(',');					
			//reload the data with the selected topics
			renderIt(query_nsfDiv, query_yearFrom, query_yearTo, filteredstatus, query_topics, query_primtopic, "prop");
		}
	});

	/* Detail for Grant Details */
	/*$('#grants #dtable_grants tbody td a[class^=details]').live('click', function (event) {
		var nTr = $(this).parent().parent().get(0);
		if (nTr != null) {
			var aData = oTable.fnGetData(nTr);
			if ( $(this).html().match('Hide') )
			{
				$(this).html('Show');
				$("#pid_" + aData[0]).slideUp(function() {
					oTable.fnClose(nTr);
				});
			}
			else
			{
				$(this).html('Hide');
				oTable.fnOpen(nTr, "<div class='dataInnerts' id='pid_" + aData[0] + "'></div>", 'details' );
				$.getJSON(apiurl+'prop?id=' + aData[0] + '&jsoncallback=?', function(data) {
					$("#pid_" + aData[0]).hide()
					$("#pid_" + aData[0]).html($("#propRender").tmpl(data["data"]));
					$("#pid_" + aData[0]).slideDown()
				});
			}
		}
		event.preventDefault();
	});*/

	/* Detail for PI Details */

	/*$('#pi #dtable_pi tbody td a[class^=details]').live('click', function () {

		var pi_node = $(this).parent().parent().get(0);
		if (pi_node != null) {
			var pData = mTable.fnGetData(pi_node);
			if ( $(this).html().match('Hide') )
			{
				$(this).html('Show');
				$("#pid_" + pData[0]).slideUp(function() {
					mTable.fnClose(pi_node);
				});
			}
			else
			{
				$(this).html('Hide');
				mTable.fnOpen(pi_node, "<div class='dataInnerts' id='pid_" + pData[0] + "'></div>", 'details' );
				$.getJSON((apiurl+'prop?id=' + pData[5]).split(' ').join('') + '&jsoncallback=?', function(data) {
					$("#pid_" + pData[0]).hide()
					// Use $.each() to get all grant details for each PI
					$.each(data["data"], function(i, item){
						$($("#personRender").tmpl(item)).appendTo("#pid_" + pData[0]);
					});
					$("#pid_" + pData[0]).slideDown()
				});
			}
		}
		event.preventDefault();
	});*/

	/* Detail for org Details */
	/*$('#org #dtable_org tbody td a[class^=details]').live('click', function () {
		var org_node = $(this).parent().parent().get(0);
		if (org_node != null) {
			var orgData = iTable.fnGetData(org_node);
			if ( $(this).html().match('Hide') )
			{
				$(this).html('Show');
				$("#oid_" + orgData[0]).slideUp(function() {
					iTable.fnClose(org_node);
				});
			}
			else
			{
				$(this).html('Hide');
				iTable.fnOpen(org_node, "<div class='dataInnerts' id='oid_" + orgData[0] + "'></div>", 'details' );
			
				$.getJSON(apiurl+'org?id=' + orgData[0] + '&jsoncallback=?', function(data) {
					$("#oid_" + orgData[0]).hide()
					$("#oid_" + orgData[0]).html($("#orgRender").tmpl(data["data"]));
					$("#oid_" + orgData[0]).slideDown()
				});
			}
		}
		event.preventDefault();
	});*/

	$('#props table tbody tr').live('click', function (event) {
		var oTable = $('#props table').dataTable();
	    var aData = oTable.fnGetData(this); // get datarow

	    if (null != aData)  // null if we clicked on title row
	    {
			//set the class
			if ( $(this).hasClass('row_selected') ) {
				$(this).removeClass('row_selected');
			} else {
				$(this).addClass('row_selected');
			}			
	        //now aData[0] - 1st column(count_id), aData[1] -2nd, etc. 
			//trap prop selection
			var numGrantsSelected = $("#summary_props").html();
			var numFundingSelected = parseInt(removeNumberFormatting($("#summary_prop_funding_total").html()));
			var dateFirst = $("#summary_prop_datefirst").html();
			var dateLast = $("#summary_prop_datelast").html();
			if (dateLast) dateLast = new Date(dateLast);
			if ($(this).hasClass('row_selected')) {
				numGrantsSelected++; 
				numFundingSelected += parseInt(aData[1]);
			} else {
				numGrantsSelected--;
				numFundingSelected -= parseInt(aData[1]);
			}

			//now reformat
			numFundingSelected = addCommas(numFundingSelected);
			if (numFundingSelected) numFundingSelected = '$'+numFundingSelected;

			$("#summary_props").html(numGrantsSelected);
			$("#summary_prop_funding_total").html(numFundingSelected);

//console.log(fnGetSelected(oTable));
			//now recalculate the rankings - do this regardless of checked or unchecked
			var checkedprops = fnGetSelected(oTable);
			//now for the prop rankings
			//first by amount of award
			//sort the summaries list - descending by funding
			checkedprops.sort(function(a,b) {return (a[1] > b[1]) ? -1 : ((b[1] > a[1]) ? 1 : 0);} );	
			//now select the top 4 out of the summaries list
			for (var i=0;i<4;i++) {
				//we always reset this - just for now, for simplicity sake, later we can add a check to see if the rankings need to be updated or not
				$("#summary_rankedprops_byfunding_"+(i+1)).html(null);	
				if (checkedprops[i]) {
					var tmp = addCommas(checkedprops[i][1]);
					if (tmp) tmp = '$'+tmp;				
					//we found one, add it to the summary
					$("#summary_rankedprops_byfunding_"+(i+1)).html(tmp+' ('+checkedprops[i][0]+')');				
				}
			}
			//min summary
			$("#summary_prop_funding_min").html(null);	
			if (checkedprops.length) {
				var tmp = addCommas(checkedprops[checkedprops.length-1][1]);
				if (tmp) tmp = '$'+tmp;				
				$("#summary_prop_funding_min").html(tmp+' ('+checkedprops[checkedprops.length-1][0]+')');					
			}
			//date summary
			//sort the summaries list - descending by funding
			checkedprops.sort(function(a,b) {return (a[2] > b[2]) ? -1 : ((b[2] > a[2]) ? 1 : 0);} );	
			var dateFirst = null;
			var dateLast = null;
			if (checkedprops.length>0) {
				dateFirst = checkedprops[0][2];
				if (dateFirst) dateFirst = new Date(dateFirst).toLocaleDateString();
				dateLast = checkedprops[checkedprops.length-1][2];
				if (dateLast) dateLast = new Date(dateLast).toLocaleDateString();
			}
			$("#summary_prop_datefirst").html(dateFirst);
			$("#summary_prop_datelast").html(dateLast);
	    }
	});

	$('#grants table tbody tr').live('click', function (event) {
		var oTable = $('#grants table').dataTable();

		//if the show details link was clicked trap that		
	   if(event.target.nodeName == "A"){
			var nTr = this;
			if (nTr != null) {
				var aData = oTable.fnGetData(nTr);
				if ( $(event.target).html().match('Hide') )
				{
					$(event.target).html('Show');
					$("#pid_" + aData[0]).slideUp(function() {
						oTable.fnClose(nTr);
					});
				}
				else
				{
					$(event.target).html('Hide');
					oTable.fnOpen(nTr, "<div class='dataInnerts' id='pid_" + aData[0] + "'></div>", 'details' );
					$.getJSON(apiurl+'prop?id=' + aData[0] + '&jsoncallback=?', function(data) {
						$("#pid_" + aData[0]).hide()
						$("#pid_" + aData[0]).html($("#propRender").tmpl(data["data"]));
						$("#pid_" + aData[0]).slideDown()
					});
				}
			}
			event.preventDefault();
			return;
	   }
			        
	    var aData = oTable.fnGetData(this); // get datarow
	    if (null != aData)  // null if we clicked on title row
	    {
			//set the class
			if ( $(this).hasClass('row_selected') ) {
				$(this).removeClass('row_selected');
			} else {
				$(this).addClass('row_selected');
			}			
	        //now aData[0] - 1st column(count_id), aData[1] -2nd, etc. 
			//trap grant selection
			var numGrantsSelected = $("#summary_grants").html();
			var numFundingSelected = parseInt(removeNumberFormatting($("#summary_funding_total").html()));
			var dateFirst = $("#summary_datefirst").html();
			var dateLast = $("#summary_datelast").html();
			if (dateLast) dateLast = new Date(dateLast);
			if ($(this).hasClass('row_selected')) {
				numGrantsSelected++; 
				numFundingSelected += parseInt(aData[1]);
			} else {
				numGrantsSelected--;
				numFundingSelected -= parseInt(aData[1]);
			}
		
			//now reformat
			numFundingSelected = addCommas(numFundingSelected);
			if (numFundingSelected) numFundingSelected = '$'+numFundingSelected;

			$("#summary_grants").html(numGrantsSelected);
			$("#summary_funding_total").html(numFundingSelected);

//console.log(fnGetSelected(oTable));
			//now recalculate the rankings - do this regardless of checked or unchecked
			var checkedgrants = fnGetSelected(oTable);
			//now for the grant rankings
			//first by amount of award
			//sort the summaries list - descending by funding
			checkedgrants.sort(function(a,b) {return (a[1] > b[1]) ? -1 : ((b[1] > a[1]) ? 1 : 0);} );	
			//now select the top 4 out of the summaries list
			for (var i=0;i<4;i++) {
				//we always reset this - just for now, for simplicity sake, later we can add a check to see if the rankings need to be updated or not
				$("#summary_rankedgrants_byfunding_"+(i+1)).html(null);	
				if (checkedgrants[i]) {
					var tmp = addCommas(checkedgrants[i][1]);
					if (tmp) tmp = '$'+tmp;				
					//we found one, add it to the summary
					$("#summary_rankedgrants_byfunding_"+(i+1)).html(tmp+' ('+checkedgrants[i][0]+')');				
				}
			}
			//min summary
			$("#summary_funding_min").html(null);	
			if (checkedgrants.length) {
				var tmp = addCommas(checkedgrants[checkedgrants.length-1][1]);
				if (tmp) tmp = '$'+tmp;				
				$("#summary_funding_min").html(tmp+' ('+checkedgrants[checkedgrants.length-1][0]+')');					
			}
			//date summary
			//sort the summaries list - descending by funding
			checkedgrants.sort(function(a,b) {return (a[2] > b[2]) ? -1 : ((b[2] > a[2]) ? 1 : 0);} );	
			var dateFirst = null;
			var dateLast = null;
			if (checkedgrants.length>0) {
				dateFirst = checkedgrants[0][2];
				if (dateFirst) dateFirst = new Date(dateFirst).toLocaleDateString();
				dateLast = checkedgrants[checkedgrants.length-1][2];
				if (dateLast) dateLast = new Date(dateLast).toLocaleDateString();
			}
			$("#summary_datefirst").html(dateFirst);
			$("#summary_datelast").html(dateLast);
	    }
	});

/*	$('#grants input[name="grant[]"]').live('click',function(event) {
		//trap grant selection
		var numGrantsSelected = $("#summary_grants").html();
		var numFundingSelected = parseInt(removeNumberFormatting($("#summary_funding_total").html()));
		var dateFirst = $("#summary_datefirst").html();
		var dateLast = $("#summary_datelast").html();
		if (dateLast) dateLast = new Date(dateLast);
		if ($(this).attr('checked')) {
			//set the row on
			$(this).parent().parent().addClass('selected');
			numGrantsSelected++; 
			numFundingSelected += parseInt(removeNumberFormatting($(this).parent().parent().find('span.funding').html()));
		} else {
			//set the row off
			$(this).parent().parent().removeClass('selected');
			numGrantsSelected--;
			numFundingSelected -= parseInt(removeNumberFormatting($(this).parent().parent().find('span.funding').html()));
		}
		
		//now reformat
		numFundingSelected = addCommas(numFundingSelected);
		if (numFundingSelected) numFundingSelected = '$'+numFundingSelected;

		$("#summary_grants").html(numGrantsSelected);
		$("#summary_funding_total").html(numFundingSelected);

		//now recalculate the rankings - do this regardless of checked or unchecked
		var checkedgrants = [];
		//current checked items
		var checkedgrants = $('#grants input:checked[name="grant[]"]').map(function() {
			var tmp = {};
			tmp['funding'] = parseInt(removeNumberFormatting($('#grants span[id="funding_'+$(this).val()+'"]').html()));
			tmp['date'] = $('#grants span[id="date_'+$(this).val()+'"]').html();
			//add the topic id
			tmp['id'] = $(this).val();
			return tmp;
		}); //.get().join()
		//now for the grant rankings
		//first by amount of award
		//sort the summaries list - descending by funding
		checkedgrants.sort(function(a,b) {return (a.funding > b.funding) ? -1 : ((b.funding > a.funding) ? 1 : 0);} );	
		//now select the top 4 out of the summaries list
		for (var i=0;i<4;i++) {
			//we always reset this - just for now, for simplicity sake, later we can add a check to see if the rankings need to be updated or not
			$("#summary_rankedgrants_byfunding_"+(i+1)).html(null);	
			if (checkedgrants[i]) {
				var tmp = addCommas(checkedgrants[i]['funding']);
				if (tmp) tmp = '$'+tmp;				
				//we found one, add it to the summary
				$("#summary_rankedgrants_byfunding_"+(i+1)).html(tmp+' ('+checkedgrants[i]['id']+')');				
			}
		}
		//min summary
		$("#summary_funding_min").html(null);	
		if (checkedgrants.length) {
			var tmp = addCommas(checkedgrants[checkedgrants.length-1]['funding']);
			if (tmp) tmp = '$'+tmp;				
			$("#summary_funding_min").html(tmp+' ('+checkedgrants[checkedgrants.length-1]['id']+')');					
		}
		//date summary
		//sort the summaries list - descending by funding
		checkedgrants.sort(function(a,b) {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0);} );	
		var dateFirst = null;
		var dateLast = null;
		if (checkedgrants.length>0) {
			dateFirst = checkedgrants[0]['date'];
			if (dateFirst) dateFirst = new Date(dateFirst).toLocaleDateString();
			dateLast = checkedgrants[checkedgrants.length-1]['date'];
			if (dateLast) dateLast = new Date(dateLast).toLocaleDateString();
		}
		$("#summary_datefirst").html(dateFirst);
		$("#summary_datelast").html(dateLast);		
	});	*/

	$('#pi table tbody tr').live('click', function (event) {   
		var oTable = $('#pi table').dataTable();

		//if the show details link was clicked trap that		
	   if(event.target.nodeName == "A"){
			var pi_node = this;
			if (pi_node != null) {
				var pData = oTable.fnGetData(pi_node);
				if ( $(event.target).html().match('Hide') )
				{
					$(event.target).html('Show');
					$("#pid_" + pData[0]).slideUp(function() {
						oTable.fnClose(pi_node);
					});
				}
				else
				{
					$(event.target).html('Hide');
					oTable.fnOpen(pi_node, "<div class='dataInnerts' id='pid_" + pData[0] + "'></div>", 'details' );
					$.getJSON((apiurl+'prop?id=' + pData[5]).split(' ').join('') + '&jsoncallback=?', function(data) {
						$("#pid_" + pData[0]).hide()
						// Use $.each() to get all grant details for each PI
						$.each(data["data"], function(i, item){
							$($("#personRender").tmpl(item)).appendTo("#pid_" + pData[0]);
						});
						$("#pid_" + pData[0]).slideDown()
					});
				}
			}
			event.preventDefault();
		    return;
		}
		
	    var aData = oTable.fnGetData(this); // get datarow
	    if (null != aData)  // null if we clicked on title row
	    {
			//set the class
			if ( $(this).hasClass('row_selected') ) {
				$(this).removeClass('row_selected');
			} else {
				$(this).addClass('row_selected');
			}			
	        //now aData[0] - 1st column(count_id), aData[1] -2nd, etc. 
			//trap grant selection
			var numPIsSelected = $("#summary_pis").html();
			if ($(this).hasClass('row_selected')) {
				numPIsSelected++; 
			} else {
				numPIsSelected--;
			}

			$("#summary_pis").html(numPIsSelected);

	//console.log(fnGetSelected(oTable));
			//load prop data for selected pis so we can calculate summaries and rankings
			var propids = [];
			var rowdata = oTable.fnGetData(this);
			var tmp_propids = rowdata[5];
			//make array out of string
			if (tmp_propids) propids = tmp_propids.split(',');
			//now load the data for each propid if it is not already loaded
			var params = '';
			for (var i in propids) {
				var propid = jQuery.trim(propids[i]);
				//if not previously loaded and cached, load it
				if (!propsummarydata[propid]) {
					if (params) params += ',';
					params += propid;
				}
			}
			if (params) {
	//console.log('getting data:'+params);
				$.getJSON(apiurl + 'prop?id=' + params + '&jsoncallback=?', function(data) {
	//console.log(data);
					//for each prop store the data in the cache
					if (data["data"]) {
						for (var i in data["data"]) {							
	//console.log(data["data"][i]["nsf_id"]);							
							propsummarydata[data["data"][i]["nsf_id"]] = data["data"][i];
						}
					}
					summarizePI();
				});
			} else {
				summarizePI();
			}
	    }
	});

/*	$('#pi input[name="pi[]"]').live('click',function(event) {
		//trap grant selection
		var numPIsSelected = $("#summary_pis").html();
		if ($(this).attr('checked')) {
			//set the row on
			$(this).parent().parent().addClass('selected');
			numPIsSelected++; 
		} else {
			//set the row off
			$(this).parent().parent().removeClass('selected');
			numPIsSelected--;
		}

		$("#summary_pis").html(numPIsSelected);

//console.log(topicsummarydata);		
		//load prop data for selected pis so we can calculate summaries and rankings
		var propids = [];
		var tmp_propids = $('#pi span[id="pi_propids_'+$(this).val()+'"]').html();
		//make array out of string
		if (tmp_propids) propids = tmp_propids.split(',');
		//now load the data for each propid if it is not already loaded
		var params = '';
		for (var i in propids) {
			//if not previously loaded and cached, load it
			if (!propsummarydata[propids[i]]) {
				if (params) params += ',';
				params += jQuery.trim(propids[i]);
			}
		}
		if (params) {
//console.log('getting data:'+params);
			$.getJSON(apiurl + 'prop?id=' + params + '&jsoncallback=?', function(data) {
//console.log(data);
				//for each prop store the data in the cache
				if (data["data"]) {
					for (var i in data["data"]) {							
//console.log(data["data"][i]["nsf_id"]);							
						propsummarydata[data["data"][i]["nsf_id"]] = data["data"][i];
					}
				}
				summarizePI();
			});
		} else {
			summarizePI();
		}
	});	*/
	
	$('#org table tbody tr').live('click', function (event) {        
		var oTable = $('#org table').dataTable();

		//if the show details link was clicked trap that		
	   if(event.target.nodeName == "A"){
			var org_node = this;
			if (org_node != null) {
				var orgData = oTable.fnGetData(org_node);
				if ( $(event.target).html().match('Hide') )
				{
					$(event.target).html('Show');
					$("#oid_" + orgData[0]).slideUp(function() {
						oTable.fnClose(org_node);
					});
				}
				else
				{
					$(event.target).html('Hide');
					oTable.fnOpen(org_node, "<div class='dataInnerts' id='oid_" + orgData[0] + "'></div>", 'details' );

					$.getJSON(apiurl+'org?id=' + orgData[0] + '&jsoncallback=?', function(data) {
						$("#oid_" + orgData[0]).hide()
						$("#oid_" + orgData[0]).html($("#orgRender").tmpl(data["data"]));
						$("#oid_" + orgData[0]).slideDown()
					});
				}
			}
			event.preventDefault();
		    return;
		}

	    var aData = oTable.fnGetData(this); // get datarow
	    if (null != aData)  // null if we clicked on title row
	    {
			//set the class
			if ( $(this).hasClass('row_selected') ) {
				$(this).removeClass('row_selected');
			} else {
				$(this).addClass('row_selected');
			}			
	        //now aData[0] - 1st column(count_id), aData[1] -2nd, etc. 
			//trap grant selection
			var numOrgsSelected = $("#summary_orgs").html();
			if ($(this).hasClass('row_selected')) {
				numOrgsSelected++; 
			} else {
				numOrgsSelected--;
			}

			$("#summary_orgs").html(numOrgsSelected);

	//console.log(fnGetSelected(oTable));
			//load prop data for selected pis so we can calculate summaries and rankings
			var rowdata = oTable.fnGetData(this);
			var propids = rowdata[4];
			//now load the data for each propid if it is not already loaded
			var params = '';
			for (var i in propids) {
				var propid = jQuery.trim(propids[i]);
				//if not previously loaded and cached, load it
				if (!propsummarydata[propid]) {
					if (params) params += ',';
					params += propid;
				}
			}
			if (params) {
	//console.log('getting data:'+params);
				$.getJSON(apiurl + 'prop?id=' + params + '&jsoncallback=?', function(data) {
	//console.log(data);
					//for each prop store the data in the cache
					if (data["data"]) {
						for (var i in data["data"]) {							
	//console.log(data["data"][i]["nsf_id"]);							
							propsummarydata[data["data"][i]["nsf_id"]] = data["data"][i];
						}
					}
					summarizeOrg();
				});
			} else {
				summarizeOrg();
			}
	    }
	});

/*	$('#org input[name="org[]"]').live('click',function(event) {
		//trap grant selection
		var numOrgsSelected = $("#summary_orgs").html();
		if ($(this).attr('checked')) {
			//set the row on
			$(this).parent().parent().addClass('selected');
			numOrgsSelected++; 
		} else {
			//set the row off
			$(this).parent().parent().removeClass('selected');
			numOrgsSelected--;
		}

		$("#summary_orgs").html(numOrgsSelected);

//console.log(topicsummarydata);		
		//load prop data for selected orgs so we can calculate summaries and rankings
		var propids = [];
		var tmp_propids = $('#org span[id="org_propids_'+$(this).val()+'"]').html();
		
		//make array out of string
		if (tmp_propids) propids = tmp_propids.split(',');
		//now load the data for each propid if it is not already loaded
		var params = '';
		for (var i in propids) {
console.log(propid);			
			var propid = jQuery.trim(propids[i]);
console.log(propid);			
			//if not previously loaded and cached, load it
			if (!propsummarydata[propid]) {
				if (params) params += ',';
				params += propid;
			}
		}
		if (params) {
console.log('getting data:'+params);
			$.getJSON(apiurl + 'prop?id=' + params + '&jsoncallback=?', function(data) {
//console.log(data);
				//for each prop store the data in the cache
				if (data["data"]) {
					for (var i in data["data"]) {							
//console.log(data["data"][i]["nsf_id"]);							
						propsummarydata[data["data"][i]["nsf_id"]] = data["data"][i];
					}
				}
				summarizeOrg();
			});
		} else {
			summarizeOrg();
		}
	});	*/	
});		

function summarizePI() {
//console.log(propsummarydata);
	//now recalculate the rankings - do this regardless of checked or unchecked
	//current checked items
	var oTable = $("#pi table").dataTable();
	var checkedpis = fnGetSelected(oTable).map(function(v) {
//console.log(v);		
		var tmp = {};
		tmp['propcount'] = v[4];

		//now total up the funding for all the proposals
		var awardcount = 0;
		var requestfunding = 0;
		var awardfunding = 0;

		var propids = [];
		var tmp_propids = v[5];
		//make array out of string
		if (tmp_propids) propids = tmp_propids.split(',');
		for (var i in propids) {
			var propid = jQuery.trim(propids[i]);
			//read from cache
//console.log(propid);			
			if (propsummarydata[propid]) {
				if (propsummarydata[propid]["status"]["code"]=="award") {
					awardcount++;
					if (propsummarydata[propid]["awarded"]["dollar"])
						awardfunding += parseInt(propsummarydata[propid]["awarded"]["dollar"]);
				}
				requestfunding += parseInt(propsummarydata[propid]["request"]["dollar"]);						
			}
		}
		tmp['awardcount'] = awardcount;
		tmp['awardfunding'] = awardfunding;
		if (awardcount) tmp['avgawardfunding'] = (awardfunding/awardcount).toFixed(0);
		else tmp['avgawardfunding'] = 0;
		tmp['requestfunding'] = requestfunding;
		//add the topic id
		tmp['id'] = v[0];
		tmp['name'] = v[1];

		return tmp;			
	});	
	/* 
	var checkedpis = [];
	var checkedpis = $('#pi input:checked[name="pi[]"]').map(function() {
		var tmp = {};
		tmp['propcount'] = parseInt($('#pi span[id="pi_propcount_'+$(this).val()+'"]').html());

		//now total up the funding for all the proposals
		var awardcount = 0;
		var requestfunding = 0;
		var awardfunding = 0;

		var propids = [];
		var tmp_propids = $('#pi span[id="pi_propids_'+$(this).val()+'"]').html();
		//make array out of string
		if (tmp_propids) propids = tmp_propids.split(',');
		for (var i in propids) {
			var propid = jQuery.trim(propids[i]);
			//read from cache
//console.log(propid);			
			if (propsummarydata[propid]) {
				if (propsummarydata[propid]["status"]["code"]=="award") {
					awardcount++;
					if (propsummarydata[propid]["awarded"]["dollar"])
						awardfunding += parseInt(propsummarydata[propid]["awarded"]["dollar"]);
				} else {
					requestfunding += parseInt(propsummarydata[propid]["request"]["dollar"]);						
				}
			}
		}
		tmp['awardcount'] = awardcount;
		tmp['awardfunding'] = awardfunding;
		if (awardcount) tmp['avgawardfunding'] = (awardfunding/awardcount).toFixed(0);
		else tmp['avgawardfunding'] = 0;
		tmp['requestfunding'] = requestfunding;
		//add the topic id
		tmp['id'] = $(this).val();
		tmp['name'] = $('#pi span[id="pi_name_'+$(this).val()+'"]').html();

		return tmp;			
	}); */
//console.log('summarized');
//console.log(checkedpis);

	//now for the researcher rankings
	//by number of proposals
	//sort the summaries list - descending by number of proposals submitted
	checkedpis.sort(function(a,b) {return (a.propcount > b.propcount) ? -1 : ((b.propcount > a.propcount) ? 1 : 0);} );	
	//now select the top 5 out of the summaries list
	for (var i=0;i<5;i++) {
		//we always reset this - just for now, for simplicity sake, later we can add a check to see if the rankings need to be updated or not
		$("#summary_rankedpis_bypropcount_"+(i+1)).html(null);	
		if (checkedpis[i]) {
			//we found one, add it to the summary
			$("#summary_rankedpis_bypropcount_"+(i+1)).html(checkedpis[i]['propcount']+' ('+checkedpis[i]['name']+')');				
		}
	}
	//by number of awards
	//sort the summaries list - descending by number of awarded proposals
	checkedpis.sort(function(a,b) {return (a.awardcount > b.awardcount) ? -1 : ((b.awardcount > a.awardcount) ? 1 : 0);} );	
//console.log(checkedpis);		
	//now select the top 5 out of the summaries list
	for (var i=0;i<5;i++) {
		//we always reset this - just for now, for simplicity sake, later we can add a check to see if the rankings need to be updated or not
		$("#summary_rankedpis_byawardcount_"+(i+1)).html(null);	
		if (checkedpis[i] && checkedpis[i]['awardcount']) {
			//we found one, add it to the summary
			$("#summary_rankedpis_byawardcount_"+(i+1)).html(checkedpis[i]['awardcount']+' ('+checkedpis[i]['name']+')');				
		}
	}
	//by number of award funding
	//sort the summaries list - descending by funding of awarded proposals
	checkedpis.sort(function(a,b) {return (a.awardfunding > b.awardfunding) ? -1 : ((b.awardfunding > a.awardfunding) ? 1 : 0);} );	
//console.log(checkedpis);		
	//now select the top 5 out of the summaries list
	for (var i=0;i<5;i++) {
		//we always reset this - just for now, for simplicity sake, later we can add a check to see if the rankings need to be updated or not
		$("#summary_rankedpis_byawardfunding_"+(i+1)).html(null);	
		if (checkedpis[i] && checkedpis[i]['awardfunding']) {
			//we found one, add it to the summary
			$("#summary_rankedpis_byawardfunding_"+(i+1)).html('$'+addCommas(checkedpis[i]['awardfunding'])+' ('+checkedpis[i]['name']+')');				
		}
	}
	//by avg. award funding by grant
	//sort the summaries list - descending by funding of awarded proposals
	checkedpis.sort(function(a,b) {return (a.avgawardfunding > b.avgawardfunding) ? -1 : ((b.avgawardfunding > a.avgawardfunding) ? 1 : 0);} );	
//console.log(checkedpis);		
	//now select the top 5 out of the summaries list
	for (var i=0;i<5;i++) {
		//we always reset this - just for now, for simplicity sake, later we can add a check to see if the rankings need to be updated or not
		$("#summary_rankedpis_byavgawardfunding_"+(i+1)).html(null);	
		if (checkedpis[i] && checkedpis[i]['avgawardfunding']) {
			//we found one, add it to the summary
			$("#summary_rankedpis_byavgawardfunding_"+(i+1)).html('$'+addCommas(checkedpis[i]['avgawardfunding'])+' ('+checkedpis[i]['name']+')');				
		}
	}
}

function summarizeOrg() {
//console.log(propsummarydata);
	//now recalculate the rankings - do this regardless of checked or unchecked
	//current checked items
	var oTable = $("#org table").dataTable();
	var checkedorgs = fnGetSelected(oTable).map(function(v) {
//console.log(v);
		var tmp = {};
		tmp['propcount'] = v[2];

		//now total up the funding for all the proposals
		var awardcount = 0;
		var requestfunding = 0;
		var awardfunding = 0;

		var propids = v[4];
		for (var i in propids) {
			var propid = jQuery.trim(propids[i]);
			//read from cache
//console.log(propid);			
			if (propsummarydata[propid]) {
				if (propsummarydata[propid]["status"]["code"]=="award") {
					awardcount++;
					if (propsummarydata[propid]["awarded"]["dollar"])
						awardfunding += parseInt(propsummarydata[propid]["awarded"]["dollar"]);
				}
				requestfunding += parseInt(propsummarydata[propid]["request"]["dollar"]);						
			}
		}
		tmp['awardcount'] = awardcount;
		tmp['awardfunding'] = awardfunding;
		if (awardcount) tmp['avgawardfunding'] = (awardfunding/awardcount).toFixed(0);
		else tmp['avgawardfunding'] = 0;
		tmp['requestfunding'] = requestfunding;
		//add the topic id
		tmp['id'] = v[0];
		tmp['name'] = v[1];

		return tmp;			
	});	
	/*
	var checkedorgs = [];
	var checkedorgs = $('#org input:checked[name="org[]"]').map(function() {
		var tmp = {};
		tmp['propcount'] = parseInt($('#org span[id="org_propcount_'+$(this).val()+'"]').html());

		//now total up the funding for all the proposals
		var awardcount = 0;
		var requestfunding = 0;
		var awardfunding = 0;

		var propids = [];
		var tmp_propids = $('#org span[id="org_propids_'+$(this).val()+'"]').html();
		//make array out of string
		if (tmp_propids) propids = tmp_propids.split(',');
		for (var i in propids) {
			var propid = jQuery.trim(propids[i]);
			//read from cache
//console.log(propid);			
			if (propsummarydata[propid]) {
				if (propsummarydata[propid]["status"]["code"]=="award") {
					awardcount++;
					if (propsummarydata[propid]["awarded"]["dollar"])
						awardfunding += parseInt(propsummarydata[propid]["awarded"]["dollar"]);
				} else {
					requestfunding += parseInt(propsummarydata[propid]["request"]["dollar"]);						
				}
			}
		}
		tmp['awardcount'] = awardcount;
		tmp['awardfunding'] = awardfunding;
		if (awardcount) tmp['avgawardfunding'] = (awardfunding/awardcount).toFixed(0);
		else tmp['avgawardfunding'] = 0;
		tmp['requestfunding'] = requestfunding;
		//add the topic id
		tmp['id'] = $(this).val();
		tmp['name'] = $('#org span[id="org_name_'+$(this).val()+'"]').html();

		return tmp;			
	}); */
//console.log('summarized');
//console.log(checkedorgs);

	//now for the researcher rankings
	//by number of proposals
	//sort the summaries list - descending by number of proposals submitted
	checkedorgs.sort(function(a,b) {return (a.propcount > b.propcount) ? -1 : ((b.propcount > a.propcount) ? 1 : 0);} );	
	//now select the top 5 out of the summaries list
	for (var i=0;i<5;i++) {
		//we always reset this - just for now, for simplicity sake, later we can add a check to see if the rankings need to be updated or not
		$("#summary_rankedorgs_bypropcount_"+(i+1)).html(null);	
		if (checkedorgs[i]) {
			//we found one, add it to the summary
			$("#summary_rankedorgs_bypropcount_"+(i+1)).html(checkedorgs[i]['propcount']+' ('+checkedorgs[i]['name']+')');				
		}
	}
	//by number of awards
	//sort the summaries list - descending by number of awarded proposals
	checkedorgs.sort(function(a,b) {return (a.awardcount > b.awardcount) ? -1 : ((b.awardcount > a.awardcount) ? 1 : 0);} );	
//console.log(checkedorgs);		
	//now select the top 5 out of the summaries list
	for (var i=0;i<5;i++) {
		//we always reset this - just for now, for simplicity sake, later we can add a check to see if the rankings need to be updated or not
		$("#summary_rankedorgs_byawardcount_"+(i+1)).html(null);	
		if (checkedorgs[i] && checkedorgs[i]['awardcount']) {
			//we found one, add it to the summary
			$("#summary_rankedorgs_byawardcount_"+(i+1)).html(checkedorgs[i]['awardcount']+' ('+checkedorgs[i]['name']+')');				
		}
	}
	//by number of award funding
	//sort the summaries list - descending by funding of awarded proposals
	checkedorgs.sort(function(a,b) {return (a.awardfunding > b.awardfunding) ? -1 : ((b.awardfunding > a.awardfunding) ? 1 : 0);} );	
//console.log(checkedorgs);		
	//now select the top 5 out of the summaries list
	for (var i=0;i<5;i++) {
		//we always reset this - just for now, for simplicity sake, later we can add a check to see if the rankings need to be updated or not
		$("#summary_rankedorgs_byawardfunding_"+(i+1)).html(null);	
		if (checkedorgs[i] && checkedorgs[i]['awardfunding']) {
			//we found one, add it to the summary
			$("#summary_rankedorgs_byawardfunding_"+(i+1)).html('$'+addCommas(checkedorgs[i]['awardfunding'])+' ('+checkedorgs[i]['name']+')');				
		}
	}
	//by avg. award funding by grant
	//sort the summaries list - descending by funding of awarded proposals
	checkedorgs.sort(function(a,b) {return (a.avgawardfunding > b.avgawardfunding) ? -1 : ((b.avgawardfunding > a.avgawardfunding) ? 1 : 0);} );	
//console.log(checkedorgs);		
	//now select the top 5 out of the summaries list
	for (var i=0;i<5;i++) {
		//we always reset this - just for now, for simplicity sake, later we can add a check to see if the rankings need to be updated or not
		$("#summary_rankedorgs_byavgawardfunding_"+(i+1)).html(null);	
		if (checkedorgs[i] && checkedorgs[i]['avgawardfunding']) {
			//we found one, add it to the summary
			$("#summary_rankedorgs_byavgawardfunding_"+(i+1)).html('$'+addCommas(checkedorgs[i]['avgawardfunding'])+' ('+checkedorgs[i]['name']+')');				
		}
	}
}

function fnGetSelected( oTableLocal )
{
    var aReturn = new Array();
    var aTrs = oTableLocal.fnGetNodes();
     
    for ( var i=0 ; i<aTrs.length ; i++ )
    {
        if ( $(aTrs[i]).hasClass('row_selected') )
        {
            aReturn.push( oTableLocal.fnGetData(aTrs[i]) ); //return data, not node
        }
    }
    return aReturn;
}
