{* style *}
<link rel="stylesheet" href="css/style_sass_rl.css">
<link rel="stylesheet" href="js/datatables/media/css/demo_page.css">
<link rel="stylesheet" href="js/datatables/media/css/demo_table_jui.css">
<link rel="stylesheet" href="js/tabletools/media/css/TableTools.css">
<link rel="stylesheet" href="js/tabletools/media/css/TableTools_JUI.css">

{* templates *}
<script id="orgSearch" type="text/x-jquery-tmpl"> 
	{literal}
		<p><b>${proposal.title}</b> (<a onclick="renderProp('id=${proposal.nsf_id}', '${proposal.nsf_id}');">${proposal.nsf_id}</a>)</p>
		<div id="div_${proposal.nsf_id}" style="display:none;"><div>
		</div>
			<a onclick="$('#div_${proposal.nsf_id}').slideUp();">Close!</a>
		</div>
	{/literal}
</script>
<script id="propRender" type="text/x-jquery-tmpl"> 
	{literal}
		<p><strong>Title: </strong>${title}</p>
		<p><strong>Abstract Text:</strong>${abstract}</p>
		<p><strong>NSF Division: </strong>${org.full} (${org.name})</p>
	{/literal}
</script>
<script id="personRender" type="text/x-jquery-tmpl"> 
	{literal}
		<b>Grant ${nsf_id}:</b>
		<p>${title}</p>
		<p>NSF Division: ${org.full} (${org.name})</p>
		<p>Program Element: ${pge.full} (${pge.code})</p>
	{/literal}
</script>
<script id="orgRender" type="text/x-jquery-tmpl"> 
	{literal}
		<b>${name}</b>
		<p>${address.street}</p>
		<p>${address.city}, ${address.state} ${address.zip} ${address.country}</p>
		<p>Phone: ${phone}</p>

	{/literal}
</script>

{* html *}
<table class="topics-table-wrap">
  <tr valign="top">
    <td class="topics-table-cell">
	<h1> Query results: </h1>
	<h3> Click on individual rows to select data. Drill down into each line item by clicking on the "+" button. </h3>
	{* JQuery UI - tabs *}
	<div id="tabs">
		<ul>
			<li><a href="#tabs-1">Funding</a></li>
			<li><a href="#tabs-2">Researchers</a></li>
			<li><a href="#tabs-3">Institutions</a></li>
	<!--		<li><a href="#tabs-4">Related Divisions</a></li>-->
			<li><a href="#tabs-5">Topics</a></li>
			<li><a href="#tabs-6">Patents (soon)</a></li>
			<li><a href="#tabs-7">Publications (soon)</a></li>
		</ul>
		<div id="tabs-1"><div id="grants"></div> </div>
		<div id="tabs-2"><div id="pi"></div> </div>
		<div id="tabs-3"><div id="org"></div></div>
	<!--	<div id="tabs-4"><div id="divs"></div></div>-->
		<div id="tabs-5"><div id = "topics_tab"></div></div>
		<div id="tabs-6"><div id = "patents"></div></div>
		<div id="tabs-7"><div id = "publications"></div></div>
   </div>
   </td>
   <td><div class="topic-selection-summary-wrap">

     <h3>Selection Summary</h3>
       <p>The below reflects a summary of the items you 
         selected on the left.</p>

       <table id="grant-selection-summary-table" class="topic-selection-summary-table">
         <tr class="heading">
           <td class="label"><strong>Grants Selected</strong></td>
           <td><div class="header-row-wrap"><strong><span id="summary_grants">0</span></strong></div></td>
         </tr>
         <tr>
           <td class="label">Date first</td>
           <td class="value" id="summary_datefirst"></td>
         </tr>
         <tr>
           <td class="label">Date last</td>
           <td class="value" id="summary_datelast"></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
         <tr>
           <td class="label">Total Selection Award</td>
           <td class="value" id="summary_funding_total">0</td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
         <tr>
           <td class="label">Top Award ($)</td>
           <td class="value" id="summary_rankedgrants_byfunding_1"></td>
         </tr>
         <tr>
           <td class="label">2nd</td>
           <td class="value" id="summary_rankedgrants_byfunding_2"></td>
         </tr>
         <tr>
           <td class="label">3rd</td>
           <td class="value" id="summary_rankedgrants_byfunding_3"></td>
         </tr>
         <tr>
           <td class="label">4th</td>
           <td class="value" id="summary_rankedgrants_byfunding_4"></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
         <tr>
           <td class="label">Smallest Award</td>
           <td class="value" id="summary_funding_min"></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
       </table>

       <table id="pi-selection-summary-table" class="topic-selection-summary-table">
         <tr class="heading">
           <td class="label"><strong>Researchers Selected</strong></td>
           <td><div class="header-row-wrap"><strong><span id="summary_pis">0</span></strong></div></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
         <tr>
           <td class="label" colspan="2"><strong>Total Proposals Submitted by Researcher</strong></td>
         </tr>
         <tr>
           <td class="label">1st</td>
           <td class="value" id="summary_rankedpis_bypropcount_1"></td>
         </tr>
         <tr>
           <td class="label">2nd</td>
           <td class="value" id="summary_rankedpis_bypropcount_2"></td>
         </tr>
         <tr>
           <td class="label">3rd</td>
           <td class="value" id="summary_rankedpis_bypropcount_3"></td>
         </tr>
         <tr>
           <td class="label">4th</td>
           <td class="value" id="summary_rankedpis_bypropcount_4"></td>
         </tr>
         <tr>
           <td class="label">5th</td>
           <td class="value" id="summary_rankedpis_bypropcount_5"></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
         <tr>
           <td class="label" colspan="2"><strong>Proposals Awarded (qty.) by Researcher</strong></td>
         </tr>
         <tr>
           <td class="label">1st</td>
           <td class="value" id="summary_rankedpis_byawardcount_1"></td>
         </tr>
         <tr>
           <td class="label">2nd</td>
           <td class="value" id="summary_rankedpis_byawardcount_2"></td>
         </tr>
         <tr>
           <td class="label">3rd</td>
           <td class="value" id="summary_rankedpis_byawardcount_3"></td>
         </tr>
         <tr>
           <td class="label">4th</td>
           <td class="value" id="summary_rankedpis_byawardcount_4"></td>
         </tr>
         <tr>
           <td class="label">5th</td>
           <td class="value" id="summary_rankedpis_byawardcount_5"></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
         <tr>
           <td class="label" colspan="2"><strong>Proposals Awarded ($) by Researcher</strong></td>
         </tr>
         <tr>
           <td class="label">1st</td>
           <td class="value" id="summary_rankedpis_byawardfunding_1"></td>
         </tr>
         <tr>
           <td class="label">2nd</td>
           <td class="value" id="summary_rankedpis_byawardfunding_2"></td>
         </tr>
         <tr>
           <td class="label">3rd</td>
           <td class="value" id="summary_rankedpis_byawardfunding_3"></td>
         </tr>
         <tr>
           <td class="label">4th</td>
           <td class="value" id="summary_rankedpis_byawardfunding_4"></td>
         </tr>
         <tr>
           <td class="label">5th</td>
           <td class="value" id="summary_rankedpis_byawardfunding_5"></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
         <tr>
           <td class="label" colspan="2"><strong>Avg. Award/Grant by Researcher</strong></td>
         </tr>
         <tr>
           <td class="label">1st</td>
           <td class="value" id="summary_rankedpis_byavgawardfunding_1"></td>
         </tr>
         <tr>
           <td class="label">2nd</td>
           <td class="value" id="summary_rankedpis_byavgawardfunding_2"></td>
         </tr>
         <tr>
           <td class="label">3rd</td>
           <td class="value" id="summary_rankedpis_byavgawardfunding_3"></td>
         </tr>
         <tr>
           <td class="label">4th</td>
           <td class="value" id="summary_rankedpis_byavgawardfunding_4"></td>
         </tr>
         <tr>
           <td class="label">5th</td>
           <td class="value" id="summary_rankedpis_byavgawardfunding_5"></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
       </table>

       <table id="org-selection-summary-table" class="topic-selection-summary-table">
         <tr class="heading">
           <td class="label"><strong>Institutions Selected</strong></td>
           <td><div class="header-row-wrap"><strong><span id="summary_orgs">0</span></strong></div></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
		<tr>
		  <td class="label" colspan="2"><strong>Total Proposals Submitted by Institute</strong></td>
		</tr>
		<tr>
		  <td class="label">1st</td>
		  <td class="value" id="summary_rankedorgs_bypropcount_1"></td>
		</tr>
		<tr>
		  <td class="label">2nd</td>
		  <td class="value" id="summary_rankedorgs_bypropcount_2"></td>
		</tr>
		<tr>
		  <td class="label">3rd</td>
		  <td class="value" id="summary_rankedorgs_bypropcount_3"></td>
		</tr>
		<tr>
		  <td class="label">4th</td>
		  <td class="value" id="summary_rankedorgs_bypropcount_4"></td>
		</tr>
		<tr>
		  <td class="label">5th</td>
		  <td class="value" id="summary_rankedorgs_bypropcount_5"></td>
		</tr>
		<tr>
		  <td class="label">&nbsp;</td>
		  <td>&nbsp;</td>
		</tr>
		<tr>
		  <td class="label" colspan="2"><strong>Proposals Awarded (qty.) by Institute</strong></td>
		</tr>
		<tr>
		  <td class="label">1st</td>
		  <td class="value" id="summary_rankedorgs_byawardcount_1"></td>
		</tr>
		<tr>
		  <td class="label">2nd</td>
		  <td class="value" id="summary_rankedorgs_byawardcount_2"></td>
		</tr>
		<tr>
		  <td class="label">3rd</td>
		  <td class="value" id="summary_rankedorgs_byawardcount_3"></td>
		</tr>
		<tr>
		  <td class="label">4th</td>
		  <td class="value" id="summary_rankedorgs_byawardcount_4"></td>
		</tr>
		<tr>
		  <td class="label">5th</td>
		  <td class="value" id="summary_rankedorgs_byawardcount_5"></td>
		</tr>
		<tr>
		  <td class="label">&nbsp;</td>
		  <td>&nbsp;</td>
		</tr>
		<tr>
		  <td class="label" colspan="2"><strong>Proposals Awarded ($) by Institute</strong></td>
		</tr>
		<tr>
		  <td class="label">1st</td>
		  <td class="value" id="summary_rankedorgs_byawardfunding_1"></td>
		</tr>
		<tr>
		  <td class="label">2nd</td>
		  <td class="value" id="summary_rankedorgs_byawardfunding_2"></td>
		</tr>
		<tr>
		  <td class="label">3rd</td>
		  <td class="value" id="summary_rankedorgs_byawardfunding_3"></td>
		</tr>
		<tr>
		  <td class="label">4th</td>
		  <td class="value" id="summary_rankedorgs_byawardfunding_4"></td>
		</tr>
		<tr>
		  <td class="label">5th</td>
		  <td class="value" id="summary_rankedorgs_byawardfunding_5"></td>
		</tr>
		<tr>
		  <td class="label">&nbsp;</td>
		  <td>&nbsp;</td>
		</tr>
		<tr>
		  <td class="label" colspan="2"><strong>Avg. Award/Grant by Institute</strong></td>
		</tr>
		<tr>
		  <td class="label">1st</td>
		  <td class="value" id="summary_rankedorgs_byavgawardfunding_1"></td>
		</tr>
		<tr>
		  <td class="label">2nd</td>
		  <td class="value" id="summary_rankedorgs_byavgawardfunding_2"></td>
		</tr>
		<tr>
		  <td class="label">3rd</td>
		  <td class="value" id="summary_rankedorgs_byavgawardfunding_3"></td>
		</tr>
		<tr>
		  <td class="label">4th</td>
		  <td class="value" id="summary_rankedorgs_byavgawardfunding_4"></td>
		</tr>
		<tr>
		  <td class="label">5th</td>
		  <td class="value" id="summary_rankedorgs_byavgawardfunding_5"></td>
		</tr>
		<tr>
		  <td class="label">&nbsp;</td>
		  <td>&nbsp;</td>
		</tr>
       </table>
       </div><!-- /topic-selection-summary-wrap -->
     </td>
  </tr>
</table>
	
{* scripts *}
<script>
//Check to see if the data exists or is null 
function keyExists(key, object, value) {
	if (value == null)
		value = "";
	$(key.split(".")).each(function(i, v) {
		if (v in object) 
			object = object[v];
		else {
			object = value;
			return false;
		}
	});
	return object;
}

var oTable; //this is the grants table
var mTable; //this is the people table
var iTable; //this is the institutions table
var tTable; //this is the topics table
function renderJSON(query, tab) 
{
	if (tab == null)
		tab = "grant";
	query = query.substr(0, query.length-1);

	if(tab == "topics_tab"){
		$.getJSON(apiurl+'topic?' + query + '&summ=full&jsoncallback=?', function(data){
			createTable(tab, data);		
		});
	}
	// example: topic?year=2010-2010&t1=341,123&summ=full
	else if (tab == "divs"){
		//alert(apiurl+'topic?' + query + '&summ=full&jsoncallback=?')
	}
	else{
//console.log(query);
//console.log(tab);		
		$.getJSON(apiurl+'topic?' + query + '&page=' + tab + '&jsoncallback=?', function(data) {
			createTable(tab, data);		
		});
	}
}

function createTable(tab, data)
{
	if (data["Error"] != undefined){
		validateMsg(data["Error"]);
		$("#loader").hide();
	}
	else {
		if (tab == "grant") {
			{* BEGIN GRANTS TABLE *}
			{* Render Grant DataTable *}
			$("#grants").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable_grants'></table>");

			aaData = _.map(data["data"], function(v) { 
				return [
					v["proposal"]["nsf_id"],
					v["awarded"]["dollar"],
					v["awarded"]["date"],
					v["pge"]["code"], 
					v["org"]["name"],
					v["topic"]["id"].join(", "), 
					v["proposal"]["title"],
				]; 
			});

			oTable = $('#grants table').dataTable({
				//TableTools - copy, csv, print, pdf
				"bJQueryUI": true,
				"sPaginationType": "full_numbers",
				//"sDom": 'T<"clear">lfrtip',
				"sDom": 'T<"clear"><"H"lfr>t<"F"ip>',
				"bDestroy": true,
				"bProcessing": true,
				"iDisplayLength": 50,
				"aoColumnDefs": [
					{
						//"fnRender": function ( oObj ) {
						//	return '<input type="checkbox" name="grant[]" value="'+oObj.aData[0]+'"> '+oObj.aData[0];
						//},
						//"bUseRendered": false,
						"sTitle": "Prop ID",
						"aTargets": [ 0 ]
					},
					{ 
						"fnRender": function ( oObj ) {
							return addCommas(oObj.aData[1]);
							//return '<span class="funding" id="funding_'+oObj.aData[0]+'">'+addCommas(oObj.aData[1])+'</span>';
						},
						"bUseRendered": false,
						"sTitle": "Amount",
						"aTargets": [ 1 ]
					},
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<span class="date" id="date_'+oObj.aData[0]+'">'+oObj.aData[2]+'</span>';
						//},
						//"bUseRendered": false,
						"sTitle": "Award Date",
						"aTargets": [ 2 ] 
					}, 
					{ "sTitle": "Prg. Elem. Code", "aTargets": [ 3 ] }, 
					{ "sTitle": "Division", "aTargets": [ 4 ] }, 
					{ "sTitle": "Topics", "aTargets": [ 5 ] },
					{ 
						"fnRender": function ( oObj ) {
							return '<a class="details" title="'+oObj.aData[6]+'">Show</a>';
						},
						"bSortable": false,						
						"sTitle": "Details",
						"aTargets": [ 6 ]
					}
				],
				"aaData": aaData,
				"aaSorting": [[2, 'desc'], [0, 'desc']],
				"oLanguage": {
					"sLengthMenu:": "Display _MENU_ records per page",
					"sSearch": "Keyword Filter:"
				}
			});
			{* END GRANTS SECTION *}
		} else if (tab == "pi") {			
			{* BEGIN PI SECTION *}
			/* Render PI DataTable - add in more detail for each PI*/
			$("#pi").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable_pi'></table>");
			


			//data["data"] = $.grep(data["data"], function(v) { return (v.inst != null); }); //removes the double not available
			aaData = _.map(data["data"], function(v) { 
				return [
					v["nsf_id"], 
					keyExists("name", v, "Not Available"), 
					keyExists("inst.name", v, "Not Available"),
					keyExists("inst.dept", v, "Not Available"),
					v["count"],
					v["prop"].join(", "),
					'Show',
				]; 
			});

			mTable = $('#pi table').dataTable({
				//TableTools - copy, csv, print, pdf
				"bJQueryUI": true,
				"sPaginationType": "full_numbers",					
				//"sDom": 'T<"clear">lfrtip',
				"sDom": 'T<"clear"><"H"lfr>t<"F"ip>',
				//"bDestroy": true,
				"bProcessing": true,

				"iDisplayLength": 50,
				"aoColumnDefs": [
					{
						//"fnRender": function ( oObj ) {
						//	return '<input type="checkbox" name="pi[]" value="'+oObj.aData[0]+'"> '+oObj.aData[0];
						//},
						//"bUseRendered": false,
						"sTitle": "PI ID",
						"aTargets": [ 0 ]
					},
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<span id="pi_name_'+oObj.aData[0]+'">'+oObj.aData[1]+'</span>';
						//},
						//"bUseRendered": false,
						"sTitle": "Name", 
						"aTargets": [ 1 ] 
					}, 
					{ "sTitle": "Institution", "aTargets": [ 2 ] }, 
					{ "sTitle": "Department", "aTargets": [ 3 ] },  
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<span id="pi_propcount_'+oObj.aData[0]+'">'+oObj.aData[4]+'</span>';
						//},
						//"bUseRendered": false,
						"sTitle": "Number of Grants", 
						"aTargets": [ 4 ] 
					},  
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<span id="pi_propids_'+oObj.aData[0]+'">'+oObj.aData[5]+'</span>';
						//},
						//"bUseRendered": false,
						"sTitle": "Grants IDs", 
						"aTargets": [ 5 ] 
					},
					{ 
						"fnRender": function ( oObj ) {
							return '<a class="pi_details" title="'+oObj.aData[6]+'">Show</a>';
						},
						"bSearchable": false,
						"bSortable": false,						
						"sTitle": "Details",
						"aTargets": [ 6 ]
					}
				],
				"aaData": aaData,
				"aaSorting": [[4, 'desc']],
				"oLanguage": {
					"sLengthMenu:": "Display _MENU_ records per page",
					"sSearch": "Keyword Filter:"
				}
				//"sDom": 'T<"clear">lfrtip',
			});
			 {* END OF PI SECTION *}
		}  else if (tab == "org") {			
			{* BEGIN INSTITUTIONS SECTION *}
			/* Render institutions DataTable */
			$("#org").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable_org'></table>");
			//data["data"] = $.grep(data["data"], function(v) { return (v.inst != null); }); //removes the double not available
			aaData = _.map(data["data"], function(v) { 
				return [
					keyExists("nsf_id", v, "Not Available"), 
					keyExists("name", v, "Not Available"),
					v["count"],
					v["pi"].length,
					v["prop"],
					'Show',
				]; 
			});


			iTable = $('#org table').dataTable({
				"bJQueryUI": true,
				"sPaginationType": "full_numbers",
				//"sDom": 'T<"clear">lfrtip',
				"sDom": 'T<"clear"><"H"lfr>t<"F"ip>',
				"bDestroy": true,
				"bProcessing": true,

				"iDisplayLength": 50,
				"aoColumnDefs": [
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<input type="checkbox" name="org[]" value="'+oObj.aData[0]+'"> '+oObj.aData[0];
						//},
						//"bUseRendered": false,
						"sTitle": "Institution ID",
						"aTargets": [ 0 ]
					},
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<span id="org_name_'+oObj.aData[0]+'">'+oObj.aData[1]+'</span>';
						//},
						//"bUseRendered": false,
						"sTitle": "Name", 
						"aTargets": [ 1 ] 
					}, 
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<span id="org_propcount_'+oObj.aData[0]+'">'+oObj.aData[2]+'</span>';
						//},
						//"bUseRendered": false,						
						"sTitle": "Number of Proposals", 
						"aTargets": [ 2 ] 
					}, 
					{ "sTitle": "Number of PIs", "aTargets": [ 3 ] },
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<span id="org_propids_'+oObj.aData[0]+'">'+oObj.aData[4]+'</span>';
						//},
						//"bUseRendered": false,						
						"bVisible": false, 
						"sTitle": "Grant IDs", 
						"aTargets": [ 4 ] 
					},
					{ 
						"fnRender": function ( oObj ) {
							return '<a class="org_details" title="'+oObj.aData[5]+'">Show</a>';
						},
						"bSearchable": false,
						"bSortable": false,						
						"sTitle": "Details",
						"aTargets": [ 5 ]
					}					
				],
				"aaData": aaData,
				"aaSorting": [[2, 'desc']]
			});
			 {* END OF INSTITUTIONS SECTION *}
		} else if (tab == "topics_tab"){
			$("#topics_tab").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable_topics'></table>");
			// API change needed: display topic text for summ when t1 is specified
			aaData = _.map(data["data"], function(v) { 
				return [
					keyExists("t1", v, "Not Available"), 
					keyExists("words", v, "Not Available"),
					keyExists("count", v, "Not Available")
				]; 
			});

			tTable = $('#topics_tab table').dataTable({
				//TableTools - copy, csv, print, pdf
				"bJQueryUI": true,
				"sPaginationType": "full_numbers",
				//"sDom": '<"clear">lfrtip',
				"sDom": 'T<"clear"><"H"lfr>t<"F"ip>',
				"bDestroy": true,
				"bProcessing": true,
				"iDisplayLength": 50,
				"aoColumnDefs": [
					{ "sWidth": "15%", "sTitle": "Topic ID", "aTargets": [ 0 ] },
					{ "sWidth": "70%", "sTitle": "Topic Description", "aTargets": [ 1 ] }, 
					{ "sWidth": "15%", "sTitle": "Total Grants", "aTargets": [ 2 ] }
				],
				"aaData": aaData,
				"aaSorting": [[2, 'desc']],
				"oLanguage": {
					"sLengthMenu:": "Display _MENU_ records per page",
					"sSearch": "Keyword Filter:"
				}
			});
		}
		//now show hide the appropriate summaries
		$('table[id$="-selection-summary-table"]').hide();
//console.log('id="'+tab+'-selection-summary-table"');		
		$('table[id="'+tab+'-selection-summary-table"]').show();
	}
	$("#loader").hide();
}
</script>	


