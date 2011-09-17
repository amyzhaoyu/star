//global variable that holds selected proposal data
//when user first selects a proposal, researcher or org read the data and store it in this array (indexed by proposal id)
//then use it to add/remove from the summary instead of retrieving it each time
var propsummarydata = {};

$(document).ready(function() {
	//load all topics to start
	getTopics();

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
//console.log(selTabIndex);
								$('#pi table tbody tr').each( function () {
									$(this).click();
								});									
							}							
						},
						{
							"sExtends": "select_none",
							"fnClick": function ( nButton, oConfig, oFlash ) {
								$('#pi table tbody tr').each( function () {
									$(this).click();
								});									
							}							
						}
					];
	TableTools.DEFAULTS.sSwfPath = "js/tabletools/media/swf/copy_cvs_xls_pdf.swf";
	TableTools.DEFAULTS.sRowSelect = "multi";

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
			selTab = ["grant", "pi", "org", "topics_tab"][ui.index]; //"divs",  put that back before "topics_tab" to reactivate the divs
//console.log(query_nsfDiv);			
//console.log(query_topics);
			renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, selTab);
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

	$('#pi table tbody tr').live('click', function (event) {   
		var oTable = $('#pi table').dataTable();

	    var aData = oTable.fnGetData(this); // get datarow
//console.log(fnGetSelected(oTable));
		//load prop data for selected pis so we can calculate summaries and rankings
		var propids = [];
		var rowdata = oTable.fnGetData(this);
		var tmp_propids = rowdata[6];
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
	   if(event.target.nodeName == "IMG"){
//console.log($(event.target));		
			var pi_node = this;
			if (pi_node != null) {
				var pData = oTable.fnGetData(pi_node);
				if ( $(event.target).attr("src").match('details_close') )
				{
					$(event.target).attr("src", "images/details_open.png");
					$("#pid_" + pData[1]).slideUp(function() {
						oTable.fnClose(pi_node);
					});
				}
				else
				{
					$(event.target).attr("src", "images/details_close.png");
					oTable.fnOpen(pi_node, "<div class='dataInnerts' id='pid_" + pData[1] + "'><div id='userDetails_"+pData[1]+"'></div><div id='propDetails_"+pData[1]+"'><h3>Proposals (<span></span>)</h3></div><div id='copiDetails_"+pData[1]+"'><h3>Co-PIs (<span></span>)</h3></div></div>", 'details' );
					$("#pid_" + pData[1]).hide();
					//load pi data
					$.getJSON(apiurl+'user?id=' + pData[1] + '&jsoncallback=?', function(data) {
						$($("#personRender").tmpl(data["data"])).appendTo("#userDetails_" + pData[1]);
					});
					//co-collaborators					
					$.getJSON(apiurl+'user?id=' + pData[1] + '&page=pi&jsoncallback=?', function(data) {
						$("#copiDetails_"+pData[1]+" h3 span").html(data["count"]);
						// Use $.each() to get all grant details for each PI
						$.each(data["data"], function(i, item){
							$($("#copiRender").tmpl(item)).appendTo("#copiDetails_" + pData[1]);
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
							$("#propDetails_"+pData[1]+" h3 span").html(propdetails["propcount"]);
							$($("#propRender").tmpl(propdetails)).appendTo("#propDetails_" + pData[1]);
						});
					} else {
						var propdetails = calcPIPropDetails(aData);
						$("#propDetails_"+pData[1]+" h3 span").html(propdetails["propcount"]);
						$($("#propRender").tmpl(propdetails)).appendTo("#propDetails_" + pData[1]);						
					}
					$("#pid_" + pData[1]).slideDown();
				}
			}

			event.preventDefault();
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
	        //now aData[0] - 1st column(count_id), aData[1] -2nd, etc. 
			//trap grant selection
			var numPIsSelected = $("#summary_pis").html();
			if ($(this).hasClass('row_selected')) {
				numPIsSelected++; 
			} else {
				numPIsSelected--;
			}

			$("#summary_pis").html(numPIsSelected);

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

	/* Detail for PI Details */
/*	
	$('#pi #dtable_pi tbody td img').live('click', function () {
		var pi_node = $(this).parent().parent().get(0);
		if (pi_node != null) {
			var pData = mTable.fnGetData(pi_node);
			if ( this.src.match('details_close') )
			{
				this.src = "images/details_open.png";
				$("#pid_" + pData[1]).slideUp(function() {
					mTable.fnClose(pi_node);
				});
			}
			else
			{
				this.src = "images/details_close.png";
				mTable.fnOpen(pi_node, "<div class='dataInnerts' id='pid_" + pData[1] + "'></div>", 'details' );
				$.getJSON((apiurl+'prop?id=' + pData[6]).split(' ').join('') + '&jsoncallback=?', function(data) {
					$("#pid_" + pData[1]).hide()
					// Use $.each() to get all grant details for each PI
					$.each(data["data"], function(i, item){
						$($("#personRender").tmpl(item)).appendTo("#pid_" + pData[1]);
					});
					$("#pid_" + pData[1]).slideDown()
				});
			}
		}
	}); */
});	

function summarizePI() {
//console.log(propsummarydata);
	//now recalculate the rankings - do this regardless of checked or unchecked
	//current checked items
	var oTable = $("#pi table").dataTable();
	var checkedpis = fnGetSelected(oTable).map(function(v) {
//console.log(v);		
		var tmp = {};
		tmp['propcount'] = v[5];

		//now total up the funding for all the proposals
		var awardcount = 0;
		var requestfunding = 0;
		var awardfunding = 0;
		var mindate = null;
		var maxdate = null;

		var propids = [];
		var tmp_propids = v[6];
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
				requestfunding += parseInt(propsummarydata[propid]["request"]["dollar"]);						
				if (!mindate) mindate = date;
				else if (date < mindate) mindate = date;
				if (!maxdate) maxdate = date;
				else if (date > maxdate) maxdate = date;
			}
		}
		
		tmp['awardcount'] = awardcount;
		tmp['awardfunding'] = awardfunding;
		if (awardcount) tmp['avgawardfunding'] = (awardfunding/awardcount).toFixed(0);
		else tmp['avgawardfunding'] = 0;
		tmp['requestfunding'] = requestfunding;
		tmp['mindate'] = mindate.getMonth()+'/'+mindate.getDate()+'/'+mindate.getFullYear();
		tmp['maxdate'] = maxdate.getMonth()+'/'+maxdate.getDate()+'/'+maxdate.getFullYear();
		//add the topic id
		tmp['id'] = v[1];
		tmp['name'] = v[2];

		return tmp;			
	});
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

function calcPIPropDetails(v) {
//console.log(propsummarydata);
	//now recalculate the rankings - do this regardless of checked or unchecked
	//current checked items
	var tmp = {};
	tmp['propcount'] = v[5];

	//now total up the funding for all the proposals
	var awardcount = 0;
	var requestfunding = 0;
	var awardfunding = 0;
	var mindate = null;
	var maxdate = null;

	var propids = [];
	var tmp_propids = v[6];
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
			requestfunding += parseInt(propsummarydata[propid]["request"]["dollar"]);						
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
	tmp['id'] = v[1];
	tmp['name'] = v[2];

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
