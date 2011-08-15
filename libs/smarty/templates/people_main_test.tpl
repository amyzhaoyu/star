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
			<b>Abstract Text:</b>
			<p>${abstract}</p>
			<b>NSF Division:</b>
			<p>${org.full} (${org.name})</p>
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
	<h1> Query results: </h1>

	{* JQuery UI - tabs *}
	<div id="tabs">
		<ul>
			<li><a href="#tabs-1">Grants</a></li>
			<li><a href="#tabs-2">People</a></li>
			<li><a href="#tabs-3">Institutions</a></li>
		</ul>
		<div id="tabs-1"><div id="grants"></div> </div>
		<div id="tabs-2"><div id="pi"></div> </div>
		<div id="tabs-3"><div id="org"></div></div>
	</div>

{* scripts *}
	<script>
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
	</script>
	<script>
		var oTable; //this is the grants table
		var mTable; //this is the people table
		var iTable; //this is the institutions table
		function renderJSON(query, tab) 
		{
			if (tab == null)
				tab = "grant";
			query = query.substr(0, query.length-1);

			$.getJSON('py/api.py/topic?' + query + '&page=' + tab, function(data) {
				if (data["Error"] != undefined){
					validateMsg(data["Error"]);
					$("#loader").hide();
				}
				else {
					if (tab == "grant") {
						{* BEGIN GRANTS TABLE *}
						{* Render Grant DataTable *}
						$("#grants").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable' style='width: 894px;'></table>");

						aaData = _.map(data["data"], function(v) { 
							return [
								'<img src="images/details_open.png">',
								v["topic"]["id"].join(", "), 
								v["org"]["name"],
								v["pge"]["code"], 
								v["awarded"]["date"],
								v["awarded"]["dollar"],
								v["proposal"]["nsf_id"],
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

							"oTableTools": {
								"sRowSelect": "multi",
								"aButtons": [
									{
										"sExtends": "copy",
										"sButtonText": "Copy to Clipboard",
										"bSelectedOnly": true,
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
												"bSelectedOnly": true,
											},
											{
												"sExtends": "pdf",
												"bSelectedOnly": true,
											}	
										]
									},
									"select_all", "select_none"
								]
							},

							"iDisplayLength": 50,
							"aoColumnDefs": [
								{ "bSortable": false, "aTargets": [ 0 ] },
								{ "sWidth": "15%", "sTitle": "Topics", "aTargets": [ 1 ] },
								{ "sWidth": "8%", "sTitle": "Division", "aTargets": [ 2 ] }, 
								{ "sWidth": "5%", "sTitle": "Program Element Code", "aTargets": [ 3 ] }, 
								{ "sWidth": "8%", "sTitle": "Date", "aTargets": [ 4 ] }, 
								{ "sWidth": "8%", "sTitle": "Amount", "aTargets": [ 5 ] }, 
								{ "sWidth": "8%", "sTitle": "Prop ID", "aTargets": [ 6 ] }, 
								{ "sTitle": "Proposal Title", "aTargets": [ 7 ] }, 
							],
							"aaData": aaData,
							"aaSorting": [[4, 'desc'], [6, 'desc']],
							"oLanguage": {
								"sLengthMenu:": "Display _MENU_ records per page",
								"sSearch": "Keyword Filter:"
							}
						});
						{* END GRANTS SECTION *}
					} else if (tab == "pi") {			
						{* BEGIN PI SECTION *}
						/* Render PI DataTable - add in more detail for each PI*/
						$("#pi").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable' style='width: 894px;'></table>");


						data["data"] = $.grep(data["data"], function(v) { return (v.inst != null); }); //removes the double not available
						aaData = _.map(data["data"], function(v) { 
							return [
								'<img src="images/details_open.png">',
								v["nsf_id"], 
								v["name"], 
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
							"sDom": '<"H"lfr>t<"F"ip>',
							"bDestroy": true,
							"bProcessing": true,

							"iDisplayLength": 50,
							"aoColumnDefs": [
								{ "bSortable": false, "aTargets": [ 0 ] },
								{ "sWidth": "5%", "sTitle": "PI ID", "aTargets": [ 1 ] },
								{ "sWidth": "20%", "sTitle": "Name", "aTargets": [ 2 ] }, 
								{ "sWidth": "30%", "sTitle": "Institution", "aTargets": [ 3 ] }, 
								{ "sWidth": "30%", "sTitle": "Department", "aTargets": [ 4 ] },  
								{ "sWidth": "5%", "sTitle": "Number of Grants", "aTargets": [ 5 ] },  
								{ "sWidth": "20%", "sTitle": "Grants IDs", "aTargets": [ 6 ] },  
							],
							"aaData": aaData,
							"aaSorting": [[5, 'desc']]
						});
						 {* END OF PI SECTION *}
					}  else if (tab == "org") {			
						{* BEGIN INSTITUTIONS SECTION *}
						/* Render institutions DataTable */
						$("#org").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable' style='width: 894px;'></table>");
						//data["data"] = $.grep(data["data"], function(v) { return (v.inst != null); }); //removes the double not available
						aaData = _.map(data["data"], function(v) { 
							return [
								'<img src="images/details_open.png">',
								keyExists("nsf_id", v, "Not Available"), 
								keyExists("name", v, "Not Available"),
								v["count"],
								v["pi"].length,
							]; 
						});

	
						iTable = $('#org table').dataTable({
							//TableTools - copy, csv, print, pdf
							"bJQueryUI": true,
							"sPaginationType": "full_numbers",
							//"sDom": 'T<"clear">lfrtip',
							"sDom": '<"H"lfr>t<"F"ip>',
							"bDestroy": true,
							"bProcessing": true,

							"iDisplayLength": 50,
							"aoColumnDefs": [
								{ "bSortable": false, "aTargets": [ 0 ] },
								{ "sWidth": "15%", "sTitle": "Institution ID", "aTargets": [ 1 ] },
								{ "sWidth": "60%", "sTitle": "Name", "aTargets": [ 2 ] }, 
								{ "sWidth": "10%", "sTitle": "Number of Proposals", "aTargets": [ 3 ] }, 
								{ "sWidth": "10%", "sTitle": "Number of PIs", "aTargets": [ 4 ] }, 
							],
							"aaData": aaData,
							"aaSorting": [[2, 'asc']]
						});
						 {* END OF INSTITUTIONS SECTION *}
					}
				}
				$("#loader").hide();
			});
		}

	</script>	


