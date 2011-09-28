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
									var oTable = $('#props table').dataTable();
									var notselectedRows = fnGetNotSelectedRows(oTable);
									$.each(notselectedRows, function(i, item){
										$(notselectedRows[i]).addClass('row_selected');
										$(notselectedRows[i]).addClass('DTTT_selected');
										//update summary
										updatePropSummary(oTable,oTable.fnGetData(notselectedRows[i]),true);
									});
								} else if (selTabIndex==1) {
									var oTable = $('#grants table').dataTable();
									var notselectedRows = fnGetNotSelectedRows(oTable);
									$.each(notselectedRows, function(i, item){
										$(notselectedRows[i]).addClass('row_selected');
										$(notselectedRows[i]).addClass('DTTT_selected');
										//update summary
										updateGrantSummary(oTable,oTable.fnGetData(notselectedRows[i]),true);
									});
								} else if (selTabIndex==2) {
									var oTable = $('#pi table').dataTable();
									var notselectedRows = fnGetNotSelectedRows(oTable);
									$.each(notselectedRows, function(i, item){
										$(notselectedRows[i]).addClass('row_selected');
										$(notselectedRows[i]).addClass('DTTT_selected');
										//update summary
										updatePISummary(oTable.fnGetData(notselectedRows[i]),true);
									});
								} else if (selTabIndex==3) {
									var oTable = $('#org table').dataTable();
									var notselectedRows = fnGetNotSelectedRows(oTable);
									$.each(notselectedRows, function(i, item){
										$(notselectedRows[i]).addClass('row_selected');
										$(notselectedRows[i]).addClass('DTTT_selected');
										//update summary
										updateOrgSummary(oTable.fnGetData(notselectedRows[i]),true);
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
									var oTable = $('#props table').dataTable();
									var notselectedRows = fnGetSelectedRows(oTable);
									$.each(notselectedRows, function(i, item){
										$(notselectedRows[i]).removeClass('row_selected');
										$(notselectedRows[i]).removeClass('DTTT_selected');
										//update summary
										updatePropSummary(oTable,oTable.fnGetData(notselectedRows[i]),false);
									});
								} else if (selTabIndex==1) {
									var oTable = $('#grants table').dataTable();
									var notselectedRows = fnGetSelectedRows(oTable);
									$.each(notselectedRows, function(i, item){
										$(notselectedRows[i]).removeClass('row_selected');
										$(notselectedRows[i]).removeClass('DTTT_selected');
										//update summary
										updateGrantSummary(oTable,oTable.fnGetData(notselectedRows[i]),false);
									});
								} else if (selTabIndex==2) {
									var oTable = $('#pi table').dataTable();
									var notselectedRows = fnGetSelectedRows(oTable);
									$.each(notselectedRows, function(i, item){
										$(notselectedRows[i]).removeClass('row_selected');
										$(notselectedRows[i]).removeClass('DTTT_selected');
										//update summary
										updatePISummary(oTable.fnGetData(notselectedRows[i]),false);
									});
								} else if (selTabIndex==3) {
									var oTable = $('#org table').dataTable();
									var notselectedRows = fnGetSelectedRows(oTable);
									$.each(notselectedRows, function(i, item){
										$(notselectedRows[i]).removeClass('row_selected');
										$(notselectedRows[i]).removeClass('DTTT_selected');
										//update summary
										updateOrgSummary(oTable.fnGetData(notselectedRows[i]),false);
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
			selTab = ["prop", "grant", "pi", "org", "topics_tab", "patents", "publications"][ui.index]; //"divs",  put that back before "topics_tab" to reactivate the divs
//console.log(query_nsfDiv);			
//console.log(query_topics);
//alert(selTab);
			var propstatus = query_status;
			if (selTab=="grant") propstatus = "award";
			else if (selTab=="prop") {
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
				$("#summary_funding_total").html('0');
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

		//if the prop id link was clicked trap that		
	   if(event.target.nodeName == "A") {
//console.log($(event.target));		
			return;
		}

	    if (null != aData)  // null if we clicked on title row
	    {
			//set the class
			if ( $(this).hasClass('row_selected') ) {
				$(this).removeClass('row_selected');
			} else {
				$(this).addClass('row_selected');
			}			
			updatePropSummary(oTable,aData,$(this).hasClass('row_selected'));
	    }
	});

	$('#grants table tbody tr').live('click', function (event) {
		var oTable = $('#grants table').dataTable();

		//if the show details link was clicked trap that		
	   if(event.target.nodeName == "A"){
			if ($(event.target).hasClass('details')) {		
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
			} else {
				return;
			}
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
			updateGrantSummary(oTable,aData,$(this).hasClass('row_selected'));
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
	    var aData = oTable.fnGetData(this); // get datarow
//console.log(fnGetSelected(oTable));

		//load prop data for selected pis so we can calculate summaries and rankings
		var propids = [];
		var tmp_propids = aData[5];
		//make array out of string
		if (tmp_propids) propids = tmp_propids.split(',');
		//now load the data for each propid if it is not already loaded
		var params = '';
//console.log(propsummarydata);		
		for (var i in propids) {
			var propid = jQuery.trim(propids[i]);
			//if not previously loaded and cached, load it
			if (!propsummarydata[propid]) {
				if (params) params += ',';
				params += propid;
			}
		}
//console.log(params);

		//if the show details link was clicked trap that		
	   if(event.target.nodeName == "A"){
			if ($(event.target).hasClass('pi_details')) {		
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
						oTable.fnOpen(pi_node, "<div class='dataInnerts' id='pid_" + pData[0] + "'><table><tr><td id='userDetails_"+pData[0]+"'></td><td id='propDetails_"+pData[0]+"'><h3>Proposals (<span></span>)</h3></td><td id='copiDetails_"+pData[0]+"'><h3>Co-PIs (<span></span>)</h3></td></tr><tr><td colspan='3' id='propList_"+pData[0]+"'></td></tr></table></div>", 'details' );
						$.getJSON((apiurl+'prop?id=' + pData[5]).split(' ').join('') + '&jsoncallback=?', function(data) {
							$("#pid_" + pData[0]).hide()
							// Use $.each() to get all grant details for each PI
							$.each(data["data"], function(i, item){
								$($("#propListRender").tmpl(item)).appendTo("#propList_" + pData[0]);
							});
							//load pi data
							$.getJSON(apiurl+'user?id=' + pData[0] + '&jsoncallback=?', function(data) {
								$($("#personRender").tmpl(data["data"])).appendTo("#userDetails_" + pData[0]);
							});
							//co-collaborators					
							$.getJSON(apiurl+'user?id=' + pData[0] + '&page=pi&jsoncallback=?', function(data) {
								$("#copiDetails_"+pData[0]+" h3 span").html(data["count"]);
								// Use $.each() to get all grant details for each PI
								$.each(data["data"], function(i, item){
									$($("#copiRender").tmpl(item)).appendTo("#copiDetails_" + pData[0]);
								});
							});
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
									var propdetails = calcPIPropDetails(aData);
									$("#propDetails_"+pData[0]+" h3 span").html(propdetails["propcount"]);
									$($("#propSummRender").tmpl(propdetails)).appendTo("#propDetails_" + pData[0]);
								});
							} else {
								var propdetails = calcPIPropDetails(aData);
								$("#propDetails_"+pData[0]+" h3 span").html(propdetails["propcount"]);
								$($("#propSummRender").tmpl(propdetails)).appendTo("#propDetails_" + pData[0]);						
							}
							$("#pid_" + pData[0]).slideDown()
						});
					}
				}
				event.preventDefault();
			    return;
			} else {
				return;
			}
		}
		
	    //var aData = oTable.fnGetData(this); // get datarow
	    if (null != aData)  // null if we clicked on title row
	    {
			//set the class
			if ( $(this).hasClass('row_selected') ) {
				$(this).removeClass('row_selected');
			} else {
				$(this).addClass('row_selected');
			}
			updatePISummary(aData,$(this).hasClass('row_selected'));			
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
			if ($(event.target).hasClass('org_details')) {		
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
			} else {
				return;
			}
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
			updateOrgSummary(aData,$(this).hasClass('row_selected'));
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
	
	$('#topics_table input[name="topic[]"]').live('click',function(event) {
//console.log('clicked:'+$(this).attr('value'));
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
			var params = "org=" + $("#orgs").val() + "&" + "year=r" + $("select[name=year_from]").val() + "-" + $("select[name=year_to]").val() + "&" + "t1=" + topicid+"&status="+propstatus+"&summ=full";
			$.getJSON(apiurl + 'topic?' + params + '&jsoncallback=?', function(data) {
				//what we get back is a list of topics per year, per org, per status
				//create the compiled data once for quick access
				var count = 0;
				var totalfunding = 0;
				var max_year = null;
				var min_year = null;
				var status = {};
				var org_count = {};
				var year_count = {};
				var org_funding = {};
				var year_funding = {};
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
					if (year_count[data["data"][i]["year"]]) year_count[data["data"][i]["year"]] += parseInt(data["data"][i]["count"]);
					else year_count[data["data"][i]["year"]] = parseInt(data["data"][i]["count"]);					
					//gather counts by org
					if (org_count[data["data"][i]["org"]]) org_count[data["data"][i]["org"]] += parseInt(data["data"][i]["count"]);
					else org_count[data["data"][i]["org"]] = parseInt(data["data"][i]["count"]);					
					//gather funding by year
					if (year_funding[data["data"][i]["year"]]) year_funding[data["data"][i]["year"]] += parseInt(data["data"][i]["awarded_dollar"]);
					else year_funding[data["data"][i]["year"]] = parseInt(data["data"][i]["awarded_dollar"]);					
					//gather funding by org
					if (org_funding[data["data"][i]["org"]]) org_funding[data["data"][i]["org"]] += parseInt(data["data"][i]["awarded_dollar"]);
					else org_funding[data["data"][i]["org"]] = parseInt(data["data"][i]["awarded_dollar"]);					
				}
//console.log(org_funding);								
				var compileddata = {};
				//save it
				compileddata['summary_count'] = count;
				compileddata['summary_totalfunding'] = totalfunding;
				compileddata['summary_maxyear'] = max_year;
				compileddata['summary_minyear'] = min_year;
				compileddata['summary_status'] = status;
				compileddata['summary_year_count'] = year_count;
				compileddata['summary_org_count'] = org_count;
				compileddata['summary_year_funding'] = year_funding;
				compileddata['summary_org_funding'] = org_funding;
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
		var params = "org=" + $("#orgs").val() + "&" + "year=r" + $("select[name=year_from]").val() + "-" + $("select[name=year_to]").val() + "&" + "t1=" + topicid+"&status="+propstatus+"&page=org";
		$.getJSON(apiurl + 'topic?' + params + '&jsoncallback=?', function(data) {
			var curr_inst_count = parseInt($("#inst_selected_right").html());
			if (checked) curr_inst_count += parseInt(data["count"]);
			else curr_inst_count -= parseInt(data["count"]);
			$("#inst_selected_right").html(curr_inst_count);
			$("#inst_selected").html(curr_inst_count);
		});

		//get count of researchers - we're not caching these for now
		var params = "org=" + $("#orgs").val() + "&" + "year=r" + $("select[name=year_from]").val() + "-" + $("select[name=year_to]").val() + "&" + "t1=" + topicid+"&status="+propstatus+"&page=pi";
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
});		

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
	//now collate by count
	var status = {};
	var org_count = {};
	var year_count = {};
	var org_funding = {};
	var year_funding = {};
	for (var i in checkedtopics) {
		var summary_status = checkedtopics[i]["summary_status"];
		//gather counts by status
		for (var topic_status in summary_status) {
			if (status[topic_status]) status[topic_status] += summary_status[topic_status];
			else status[topic_status] = summary_status[topic_status];
		}
		//gather counts by year
		var summary_year = checkedtopics[i]["summary_year_count"];
		for (var topic_year in summary_year) {
			if (year_count[topic_year]) year_count[topic_year] += summary_year[topic_year];
			else year_count[topic_year] = summary_year[topic_year];
		}
		//gather counts by org
		var summary_org = checkedtopics[i]["summary_org_count"];
		for (var topic_org in summary_org) {
			if (org_count[topic_org]) org_count[topic_org] += summary_org[topic_org];
			else org_count[topic_org] = summary_org[topic_org];
		}
		//gather funding by year
		var summary_year = checkedtopics[i]["summary_year_funding"];
		for (var topic_year in summary_year) {
			if (year_funding[topic_year]) year_funding[topic_year] += summary_year[topic_year];
			else year_funding[topic_year] = summary_year[topic_year];
		}
		//gather funding by org
		var summary_org = checkedtopics[i]["summary_org_funding"];
		for (var topic_org in summary_org) {
			if (org_funding[topic_org]) org_funding[topic_org] += summary_org[topic_org];
			else org_funding[topic_org] = summary_org[topic_org];
		}
	}
	//got them all, now display
	var status_html = '';
	for (var i in status) {
		status_html += '<tr>';
		status_html += '<td class="label">';
		if (i=='award') status_html+='Awarded';
		else if (i=='propose') status_html+='Other';
		else if (i=='decline') status_html+='Declined';
		status_html += '</td>';
		status_html += '<td class="value">'+status[i]+'</td>';
		status_html += '</tr>';
	}
	//by count
	var year_count_html = '';
	//we want to sort
	//currently an associative array - so first have to sort keys - bit icky but quick and dirty for now
	var sortedKeys = new Array();
	var sortedObj = {};	
	// Separate keys and sort them
	for (var i in year_count){
		sortedKeys.push(i);
	}
	sortedKeys.sort();		 
	// Reconstruct sorted obj based on keys
	for (var i in sortedKeys){
		sortedObj[sortedKeys[i]] = year_count[sortedKeys[i]];
	}
	for (var i in sortedObj) {
		year_count_html += '<tr>';
		year_count_html += '<td class="label">'+i+'</td>';
		year_count_html += '<td class="value">'+sortedObj[i]+'</td>';
		year_count_html += '</tr>';
	}
	var org_count_html = '';
	for (var i in org_count) {
		org_count_html += '<tr>';
		org_count_html += '<td class="label">'+i+'</td>';
		org_count_html += '<td class="value">'+org_count[i]+'</td>';
		org_count_html += '</tr>';
	}
	//by funding
	var year_funding_html = '';
	//we want to sort
	//currently an associative array - so first have to sort keys - bit icky but quick and dirty for now
	var sortedKeys = new Array();
	var sortedObj = {};	
	// Separate keys and sort them
	for (var i in year_funding){
		sortedKeys.push(i);
	}
	sortedKeys.sort();		 
	// Reconstruct sorted obj based on keys
	for (var i in sortedKeys){
		sortedObj[sortedKeys[i]] = year_funding[sortedKeys[i]];
	}
	for (var i in sortedObj) {
		year_funding_html += '<tr>';
		year_funding_html += '<td class="label">'+i+'</td>';
		year_funding_html += '<td class="value">'+'$'+addCommas(sortedObj[i])+'</td>';
		year_funding_html += '</tr>';
	}
	var org_funding_html = '';
	for (var i in org_funding) {
		org_funding_html += '<tr>';
		org_funding_html += '<td class="label">'+i+'</td>';
		org_funding_html += '<td class="value">'+'$'+addCommas(org_funding[i])+'</td>';
		org_funding_html += '</tr>';
	}
	//build breakdown
	var html = '';
	html += status_html;
	if (org_count_html || org_funding_html) {
		html += '<tr><td class="label">&nbsp;</td><td>&nbsp;</td></tr>';
		html += '<tr class="heading"><td class="label" colspan="2"><strong>By Division</strong></td></tr>';
		if (org_count_html) {
			html += '<tr><td class="label" colspan="2"><strong>By Qty.</strong></td></tr>';
			html += org_count_html;			
		}
		if (org_funding_html) {
			html += '<tr><td class="label" colspan="2"><strong>By Award Amount</strong></td></tr>';
			html += org_funding_html;			
		}
	}
	if (year_count_html || year_funding_html) {
		html += '<tr><td class="label">&nbsp;</td><td>&nbsp;</td></tr>';
		html += '<tr class="heading"><td class="label" colspan="2"><strong>By Year</strong></td></tr>';
		if (year_count_html) {
			html += '<tr><td class="label" colspan="2"><strong>By Qty.</strong></td></tr>';
			html += year_count_html;
		}
		if (year_funding_html) {
			html += '<tr><td class="label" colspan="2"><strong>By Award Amount</strong></td></tr>';
			html += year_funding_html;
		}
	}
	$("#summary_breakdown").html(html);
	$('#topics-tab-summary_breakdown').html(html);
	//now for the topic rankings
	//first by number of grants
	//sort the summaries list - descending by count
	checkedtopics.sort(function(a,b) {return (parseInt(a.summary_count) > parseInt(b.summary_count)) ? -1 : ((parseInt(b.summary_count) > parseInt(a.summary_count)) ? 1 : 0);} );	
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
	checkedtopics.sort(function(a,b) {return (parseInt(a.summary_totalfunding) > parseInt(b.summary_totalfunding)) ? -1 : ((parseInt(b.summary_totalfunding) > parseInt(a.summary_totalfunding)) ? 1 : 0);} );	
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

function updatePropSummary(oTable,aData,selected) {
	//now aData[0] - 1st column(count_id), aData[1] -2nd, etc. 
	//trap prop selection
	var numGrantsSelected = $("#summary_props").html();
	var numFundingSelected = parseInt(removeNumberFormatting($("#summary_prop_funding_total").html()));
	var dateFirst = $("#summary_prop_datefirst").html();
	var dateLast = $("#summary_prop_datelast").html();
	if (dateLast) dateLast = new Date(dateLast);
	if (selected) {
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
	checkedprops.sort(function(a,b) {return (parseInt(a[1]) > parseInt(b[1])) ? -1 : ((parseInt(b[1]) > parseInt(a[1])) ? 1 : 0);} );	
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
	//sort the summaries list - ascending by date
	checkedprops.sort(function(a,b) {return (a[2] > b[2]) ? 1 : ((b[2] > a[2]) ? -1 : 0);} );	
	var dateFirst = null;
	var dateLast = null;
	if (checkedprops.length>0) {
		dateFirst = checkedprops[0][2];
		if (dateFirst) {
			var tmpdate = new Date(dateFirst);
			dateFirst = tmpdate.getFullYear()+'/'+tmpdate.getMonth()+'/'+tmpdate.getDate();
		}
		dateLast = checkedprops[checkedprops.length-1][2];
		if (dateLast) {
			var tmpdate = new Date(dateLast);
			dateLast = tmpdate.getFullYear()+'/'+tmpdate.getMonth()+'/'+tmpdate.getDate();
		}
	}
	$("#summary_prop_datefirst").html(dateFirst);
	$("#summary_prop_datelast").html(dateLast);	
}

function updateGrantSummary(oTable,aData,selected) {
    //now aData[0] - 1st column(count_id), aData[1] -2nd, etc. 
	//trap grant selection
	var numGrantsSelected = $("#summary_grants").html();
	var numFundingSelected = parseInt(removeNumberFormatting($("#summary_funding_total").html()));
	var dateFirst = $("#summary_datefirst").html();
	var dateLast = $("#summary_datelast").html();
	if (dateLast) dateLast = new Date(dateLast);
	if (selected) {
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
	checkedgrants.sort(function(a,b) {return (parseInt(a[1]) > parseInt(b[1])) ? -1 : ((parseInt(b[1]) > parseInt(a[1])) ? 1 : 0);} );	
//console.log(checkedgrants);			
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
	//sort the summaries list - ascending by date
	checkedgrants.sort(function(a,b) {return (a[2] > b[2]) ? 1 : ((b[2] > a[2]) ? -1 : 0);} );	
	var dateFirst = null;
	var dateLast = null;
	if (checkedgrants.length>0) {
		dateFirst = checkedgrants[0][2];
		if (dateFirst) {
			var tmpdate = new Date(dateFirst);
			dateFirst = tmpdate.getFullYear()+'/'+tmpdate.getMonth()+'/'+tmpdate.getDate();
		}
		dateLast = checkedgrants[checkedgrants.length-1][2];
		if (dateLast) {
			var tmp = new Date(dateLast);
			dateLast = tmpdate.getFullYear()+'/'+tmpdate.getMonth()+'/'+tmpdate.getDate();
		}
	}
	$("#summary_datefirst").html(dateFirst);
	$("#summary_datelast").html(dateLast);	
}

function updatePISummary(aData,selected) {
	//now aData[0] - 1st column(count_id), aData[1] -2nd, etc. 
	//trap grant selection
	var numPIsSelected = $("#summary_pis").html();
	if (selected) {
		numPIsSelected++; 
	} else {
		numPIsSelected--;
	}

	$("#summary_pis").html(numPIsSelected);

//console.log(fnGetSelected(oTable));
	//load prop data for selected pis so we can calculate summaries and rankings
	var propids = [];
//	var rowdata = oTable.fnGetData(this);
	var tmp_propids = aData[5];
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

function updateOrgSummary(aData,selected) {
//now aData[0] - 1st column(count_id), aData[1] -2nd, etc. 
	//trap grant selection
	var numOrgsSelected = $("#summary_orgs").html();
	if (selected) {
		numOrgsSelected++; 
	} else {
		numOrgsSelected--;
	}

	$("#summary_orgs").html(numOrgsSelected);

//console.log(fnGetSelected(oTable));
	//load prop data for selected pis so we can calculate summaries and rankings
	//var rowdata = oTable.fnGetData(this);
	var propids = aData[4];
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

function summarizePI() {
//console.log(propsummarydata);
	//now recalculate the rankings - do this regardless of checked or unchecked
	//current checked items
	var oTable = $("#pi table").dataTable();
	var checkedpis =  _.map(fnGetSelected(oTable),function(v) {
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
	checkedpis.sort(function(a,b) {return (parseInt(a.propcount) > parseInt(b.propcount)) ? -1 : ((parseInt(b.propcount) > parseInt(a.propcount)) ? 1 : 0);} );	
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
	checkedpis.sort(function(a,b) {return (parseInt(a.awardcount) > parseInt(b.awardcount)) ? -1 : ((parseInt(b.awardcount) > parseInt(a.awardcount)) ? 1 : 0);} );	
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
	checkedpis.sort(function(a,b) {return (parseInt(a.awardfunding) > parseInt(b.awardfunding)) ? -1 : ((parseInt(b.awardfunding) > parseInt(a.awardfunding)) ? 1 : 0);} );	
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
	checkedpis.sort(function(a,b) {return (parseFloat(a.avgawardfunding) > parseFloat(b.avgawardfunding)) ? -1 : ((parseFloat(b.avgawardfunding) > parseFloat(a.avgawardfunding)) ? 1 : 0);} );	
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
	var checkedorgs =  _.map(fnGetSelected(oTable),function(v) {
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
	checkedorgs.sort(function(a,b) {return (parseInt(a.propcount) > parseInt(b.propcount)) ? -1 : ((parseInt(b.propcount) > parseInt(a.propcount)) ? 1 : 0);} );	
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
	checkedorgs.sort(function(a,b) {return (parseInt(a.awardcount) > parseInt(b.awardcount)) ? -1 : ((parseInt(b.awardcount) > parseInt(a.awardcount)) ? 1 : 0);} );	
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
	checkedorgs.sort(function(a,b) {return (parseInt(a.awardfunding) > parseInt(b.awardfunding)) ? -1 : ((parseInt(b.awardfunding) > parseInt(a.awardfunding)) ? 1 : 0);} );	
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
	checkedorgs.sort(function(a,b) {return (parseFloat(a.avgawardfunding) > parseFloat(b.avgawardfunding)) ? -1 : ((parseFloat(b.avgawardfunding) > parseFloat(a.avgawardfunding)) ? 1 : 0);} );	
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

function calcPIPropDetails(v) {
//console.log(propsummarydata);
	//now recalculate the rankings - do this regardless of checked or unchecked
	//current checked items
	var tmp = {};
	tmp['propcount'] = v[4];

	//now total up the funding for all the proposals
	var awardcount = 0;
	var requestfunding = 0;
	var awardfunding = 0;
	var mindate = null;
	var maxdate = null;

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
				var date = new Date(propsummarydata[propid]["awarded"]["date"]);
			} else {
				var date = new Date(propsummarydata[propid]["request"]["date"]);
			}
			if (propsummarydata[propid]["request"]) requestfunding += parseInt(propsummarydata[propid]["request"]["dollar"]);						
			if (!mindate) mindate = date;
			else if (date < mindate) mindate = date;
			if (!maxdate) maxdate = date;
			else if (date > maxdate) maxdate = date;
		}
	}
	tmp['awardcount'] = awardcount;
	tmp['awardfunding'] = '$'+addCommas(awardfunding.toString());
	if (awardcount) tmp['avgawardfunding'] = '$'+addCommas((awardfunding/awardcount).toFixed(0).toString());
	else tmp['avgawardfunding'] = 0;
	tmp['requestfunding'] = '$'+addCommas(requestfunding.toString());
	tmp['mindate'] = mindate.getMonth()+'/'+mindate.getDate()+'/'+mindate.getFullYear();
	tmp['maxdate'] = maxdate.getMonth()+'/'+maxdate.getDate()+'/'+maxdate.getFullYear();
	//add the topic id
	tmp['id'] = v[0];
	tmp['name'] = v[1];

	return tmp;			
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

function fnGetSelectedRows( oTableLocal )
{
    var aReturn = new Array();
    var aTrs = oTableLocal.fnGetNodes();
     
    for ( var i=0 ; i<aTrs.length ; i++ )
    {
        if ( $(aTrs[i]).hasClass('row_selected') )
        {
            aReturn.push( aTrs[i] ); //return node
        }
    }
    return aReturn;
}

function fnGetNotSelectedRows( oTableLocal )
{
    var aReturn = new Array();
    var aTrs = oTableLocal.fnGetNodes();
     
    for ( var i=0 ; i<aTrs.length ; i++ )
    {
        if ( !$(aTrs[i]).hasClass('row_selected') )
        {
            aReturn.push( aTrs[i] ); //return node
        }
    }
    return aReturn;
}
