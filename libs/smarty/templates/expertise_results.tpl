{* style *}
<link rel="stylesheet" href="css/style_sass_rl.css">
<link rel="stylesheet" href="js/datatables/media/css/demo_page.css">
<link rel="stylesheet" href="js/datatables/media/css/demo_table_jui.css">
<link rel="stylesheet" href="js/tabletools/media/css/TableTools.css">
<link rel="stylesheet" href="js/tabletools/media/css/TableTools_JUI.css">

{* templates *}
<script id="personRender" type="text/x-jquery-tmpl"> 
	{literal}
		<h3><strong>${name}:</strong></h3>
		<p>${email}<br />
		${phone}</p>
		<p>${inst.dept}<br />
		${inst.name}</p>
	{/literal}
</script>
<script id="copiRender" type="text/x-jquery-tmpl"> 
	{literal}
		<p>${name} (${count})</p>
	{/literal}
</script>
<script id="propRender" type="text/x-jquery-tmpl"> 
	{literal}
		<p>Awards: ${awardcount}<br /><br />
		Date First: ${mindate}<br />
		Date Last: ${maxdate}<br /><br />
		Total Requested Funding: ${requestfunding}<br />
		Award Funding: ${awardfunding}<br />
		Award Avg.: ${avgawardfunding}<br />
		</p>
	{/literal}
</script>


{* html *}
<table class="topics-table-wrap">
  <tr valign="top">
    <td class="topics-table-cell">
	<h1> Query results: </h1>
	<h3> Selecting items below will update the Selection Summary sidebar. Use the Copy/Export functions to export your selection. </h3>
	{* JQuery UI - tabs *}
	<div id="tabs">
		<ul>
			<li><a href="#tabs-1">Researchers</a></li>
		</ul>
		<div id="tabs-1"><div id="pi"></div> </div>

	</div>
   </td>
   <td><div class="topic-selection-summary-wrap">
<!--	 <h3>Filter Results</h3>
	 <form id="filter_results">
	 </form>
	 <br /><br /> -->
     <h3 style="font-size: 18px; font-weight: bold; color: #336699; margin-top: 10px; margin-right: 0pt; margin-bottom: 10px; margin-left: 0pt; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">Quick Selection Summary</h3>
       <p>The below reflects a summary of the items you 
         selected on the left.</p>

       <table id="grant-selection-summary-table" class="topic-selection-summary-table">
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


var mTable; //this is the people table

function renderJSON(query, tab) 
{
	if (tab == null)
		tab = "pi";
	query = query.substr(0, query.length-1);

	$.getJSON(apiurl+'topic?' + query + '&page=' + tab + '&jsoncallback=?', function(data) {
		createTable(tab, data);		
	});

}

function createTable(tab, data)
{
	if (data["Error"] != undefined){
		validateMsg(data["Error"]);
		$("#loader").hide();
	}
	else {
		if (tab == "pi") {			
			{* BEGIN PI SECTION *}
			/* Render PI DataTable - add in more detail for each PI*/
			$("#pi").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable_pi'></table>");
			


			//data["data"] = $.grep(data["data"], function(v) { return (v.inst != null); }); //removes the double not available
			aaData = _.map(data["data"], function(v) { 
				return [
					'<img src="images/details_open.png">',
					v["nsf_id"], 
					keyExists("name", v, "Not Available"), 
					keyExists("inst.name", v, "Not Available"),
					keyExists("inst.dept", v, "Not Available"),
					v["count"],
					v["prop"].join(", "),
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
					{ "bSortable": false, "aTargets": [ 0 ] },
					{ "sWidth": "5%", "sTitle": "PI ID", "aTargets": [ 1 ] },
					{ "sWidth": "20%", "sTitle": "Name", "aTargets": [ 2 ] }, 
					{ "sWidth": "30%", "sTitle": "Institution", "aTargets": [ 3 ] }, 
					{ "sWidth": "30%", "sTitle": "Department", "aTargets": [ 4 ] },  
					{ "sWidth": "5%", "sTitle": "Number of Grants", "aTargets": [ 5 ] },  
					{ 
						"fnRender": function ( oObj ) {
							//wrap each prop id in a link
							var formatted = [];
							if (oObj.aData[6]) {
								var tmp = oObj.aData[6].split(',');
								for (var i in tmp)	formatted.push('<a href="https://www.ejacket.nsf.gov/ej/showProposal.do?optimize=Y&ID='+tmp[i]+'&docid='+tmp[i]+'" title="Open in e-Jacket" target="_blank">'+tmp[i]+'</a>');
							}
							if (oObj.aData[6] && oObj.aData[6].split(',').length>3) {
//console.log(oObj.aData[6].split(',').slice(0,3	));								
								//only show first 3, put rest in more
								var html = formatted.slice(0,3).join(',')+' <a class="moregrantids" href="#">More</a>';
								html += '<div id="grants_more_'+oObj.aData[1]+'" style="display: none;">'+formatted.slice(3).join(',')+'</div>';
								return html;
							}
							else return formatted.join(',');
						},
						"bUseRendered": false,
						"sWidth": "20%", 
						"sTitle": "Grants IDs", 
						"aTargets": [ 6 ] 
					}
				],
				"aaData": aaData,
				"aaSorting": [[5, 'desc']],
				"oLanguage": {
					"sLengthMenu:": "Display _MENU_ records per page",
					"sSearch": "Keyword Filter:"
				}
				//"sDom": 'T<"clear">lfrtip',
			});
			 {* END OF PI SECTION *}
		}  
	}
	$("#loader").hide();
}
</script>	


