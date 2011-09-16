{* style *}
<link rel="stylesheet" href="css/style_sass_rl.css">
<link rel="stylesheet" href="js/datatables/media/css/demo_page.css">
<link rel="stylesheet" href="js/datatables/media/css/demo_table_jui.css">
<link rel="stylesheet" href="js/tabletools/media/css/TableTools.css">
<link rel="stylesheet" href="js/tabletools/media/css/TableTools_JUI.css">

{* templates *}
<script id="personRender" type="text/x-jquery-tmpl"> 
	{literal}
		<b>Grant ${nsf_id}:</b>
		<p>${title}</p>
		<p>NSF Division: ${org.full} (${org.name})</p>
		<p>Program Element: ${pge.full} (${pge.code})</p>
	{/literal}
</script>


{* html *}
<h1> Query results: </h1>
<h3> Click on individual rows to select data. Drill down into each line item by clicking on the "+" button. </h3>
{* JQuery UI - tabs *}
<div id="tabs">
	<ul>
		<li><a href="#tabs-2">Researchers</a></li>
	</ul>
	<div id="tabs-2"><div id="pi"></div> </div>

</div>

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

	$.getJSON('http://readidata.nitrd.gov/star/py/api.py/topic?' + query + '&page=' + tab + '&jsoncallback=?', function(data) {
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
					{ "sWidth": "20%", "sTitle": "Grants IDs", "aTargets": [ 6 ] }
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


