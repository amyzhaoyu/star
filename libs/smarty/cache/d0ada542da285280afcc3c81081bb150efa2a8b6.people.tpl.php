<?php /*%%SmartyHeaderCode:6161677384e53cc0f5d5238-37214801%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'd0ada542da285280afcc3c81081bb150efa2a8b6' => 
    array (
      0 => 'libs/smarty/templates/people.tpl',
      1 => 1313343449,
      2 => 'file',
    ),
    'f77024a61bbba2f871a51a33df510d9971c15a5f' => 
    array (
      0 => 'libs/smarty/templates/people_leftside.tpl',
      1 => 1312138943,
      2 => 'file',
    ),
    '8f6f1d88aedd20a5a8292a519027ae6e05c1d09c' => 
    array (
      0 => 'libs/smarty/templates/people_main.tpl',
      1 => 1312138952,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '6161677384e53cc0f5d5238-37214801',
  'has_nocache_code' => false,
  'cache_lifetime' => 120,
)); /*/%%SmartyHeaderCode%%*/?>
<?php if (!$no_render) {?><!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	
	<title>Star Metrics | National Science Foundation</title>
	<meta name="description" content="">
	<meta name="author" content="">
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="stylesheet" href="css/style.css?v=2">
	<link rel="stylesheet" href="css/960.css">
	<link rel="stylesheet" href="css/style_sass.css">
	<link rel="stylesheet" href="js/jquery-ui/smoothness/jquery-ui-1.8.14.custom.css" rel="stylesheet" />	
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
</head>
<body>
	<div style="height: 10px"></div>
	<div id="header"></div>
	<div id="container">
		<div id="main" role="main" style="padding: 5px 0px;">
			<div class="grid_16 alpha omega">
				
	<style>
	#menu p { margin-top: 10px; margin-bottom: 5px; }
	</style>
	<script id=topicList type="text/x-jquery-tmpl">
		
		<option value="${t1}">${count} granted, (t${t1}) ${words}</option>
		
	</script>
	<h1> Topic and Grant search: </h1>
	<div id="menu">
		<form action = "" method = "post">
			<div id="leftOption1" class="grid_6 alpha">
				<p>
					NSF Division(s): 
					<input type="button" onclick='$("#orgs").html($.data($("body").get(0), "orgSelect"));' value="Reset Selections" />
				</p>	
				<select id="orgs" multiple="multiple" name="org" class="sel">
					<optgroup label="Directorate for Mathematical & Physical Sciences " value="AST,CHE,DMR,DMS,PHY">
						<option value="AST">Division of Astronomical Sciences</option>
						<option value="CHE">Division of Chemistry</option>
						<option value="DMR">Division of Materials Research</option>
						<option value="DMS">Division of Mathematical Sciences</option>
						<option value="PHY">Division of Physics</option>
					</optgroup>
					<optgroup label="Directorate for Biological Sciences " value="BIO,MCB,DBI,IOS,DEB,EF">
						<option value="MCB">Division of Molecular & Cellular Biosciences</option>
						<option value="DBI">Division of Biological Infrastructure</option>
						<option value="IOS">Division of Integrative Organismal Systems</option>
						<option value="DEB">Division of Environmental Biology</option>
						<option value="EF">Emerging Frontiers Office</option>
					</optgroup>
					<optgroup label="Directorate for Computer & Information Science & Engineering " value="CISE,CCF,CNS,IIS">
						<option value="CCF">Division of Computing and Communication Foundations</option>
						<option value="CNS">Division of Computer and Network Systems</option>
						<option value="IIS">Division of Information and Intelligent Systems</option>
					</optgroup>
					<optgroup label="Directorate for Education & Human Resources " value="EHR,DRL,DGE,HRD,DUE">
						<option value="DRL">Division of Research on Learning in Formal and Informal Settings</option>
						<option value="DGE">Division of Graduate Education</option>
						<option value="HRD">Division of Human Resource Development</option>
						<option value="DUE">Division of Undergraduate Education</option>
					</optgroup>
					<optgroup label="Directorate for Engineering " value="ENG,CBET,CMMI,ECCS,EEC,EFRI,IIP">
						<option value="CBET">Division of Chemical, Bioengineering, Environmental, and Transport Systems</option>
						<option value="CMMI">Division of Civil, Mechanical & Manufacturing Innovation</option>
						<option value="ECCS">Division of Electrical, Communications & Cyber Systems</option>
						<option value="EEC">Division of Engineering Education & Centers</option>
						<option value="EFRI">Office of Emerging Frontiers in Research & Innovation</option>
						<option value="IIP">Division of Industrial Innovation & Partnerships</option>
					</optgroup>
					<optgroup label="Directorate for Geosciences " value="GEO,AGS,EAR,OCE">
						<option value="AGS">Division of Atmospheric and Geospace Sciences</option>
						<option value="EAR">Division of Earth Sciences</option>
						<option value="OCE">Division of Ocean Sciences</option>
					</optgroup>
					<optgroup label="Directorate for Social, Behavioral & Economic Sciences " value="SBE,SES,BCS,NCSE,SMA">
						<option value="SES">Division of Social and Economic Sciences</option>
						<option value="BCS">Division of Behavioral and Cognitive Sciences</option>
						<option value="NCSE">National Center for Science and Engineering Statistics</option>
						<option value="SMA">SBE Office of Multidisciplinary Activities</option>
					</optgroup>
					<optgroup label="Office of Budget, Finance, and Award Management" value="BFA,BD,DACS,DFM,DGA,DIAS">
						<option value="BD">Budget Division</option>
						<option value="DACS">Division of Acquisition and Cooperative Support</option>
						<option value="DFM">Division of Financial Management</option>
						<option value="DGA">Division of Grants & Agreements</option>
						<option value="DIAS">Division of Institution and Award Support</option>
					</optgroup>
					<optgroup label="Office of Information & Resource Management " value="OIRM,HRM,DIS,DAS">
						<option value="HRM">Division of Human Resource Management</option>
						<option value="DIS">Division of Information Systems</option>
						<option value="DAS">Division of Administrative Services</option>
					</optgroup>
				</select>
				<span id="orgs_selected"></span>
			</div>
			<div id="leftOption2" class="grid_6">
				<p>
					Topic(s): 	
					<input type="checkbox" id = "primary_topic" name = "primary_topic" value = true checked> Search by primary topic
				</p>	
				<select id="topics" multiple = "multiple" name="topic" class="sel">
				</select>
				<span id="topics_selected"></span>
			</div>

			<div class="grid_4 omega">
				<div id="leftOption3" class="grid_4 alpha omega">
				<p>Year range: </p>
				from
				<select name="year_from">
					<option value="2000">2000</option>
					<option value="2001">2001</option>
					<option value="2002">2002</option>
					<option value="2003">2003</option>
					<option value="2004">2004</option>
					<option value="2005">2005</option>
					<option value="2006">2006</option>
					<option value="2007">2007</option>
					<option value="2008">2008</option>
					<option value="2009">2009</option>
					<option value="2010" selected="selected">2010</option>
				</select> 
				to
				<select name="year_to">
					<option value="2000">2000</option>
					<option value="2001">2001</option>
					<option value="2002">2002</option>
					<option value="2003">2003</option>
					<option value="2004">2004</option>
					<option value="2005">2005</option>
					<option value="2006">2006</option>
					<option value="2007">2007</option>
					<option value="2008">2008</option>
					<option value="2009">2009</option>
					<option value="2010" selected="selected">2010</option>
				</select> 
				</div>
				<div class="clear"></div>
				<!-- Keyword search: <input type="text" name="q"/> -->
				<div id="leftOption4" class="grid_4 alpha omega">
					<input type="button" value="Search" onclick="submitMenu()" /><br />
					<img id="loader" style="display:none" src="images/ajax-loader.gif" />
					<div id="message"></div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="clear"></div>
		</form>
	</div>
	<script>
		function setSelects() {
			selValues = $("#topics").val();
			$("#topics_selected").html((selValues==null)?"":("Selected: " + selValues));
			selValues = $("#orgs").val();
			$("#orgs_selected").html((selValues==null)?"":("Selected: " + selValues)); 
		}		
		function chgSelects(selector) {
			if (selector == "topic" || selector == "all") {
				selTopics = $("#topics").val(); //PREVIOUSLY SELECTED
				if ($("#orgs").val() != null) {
					params = "org=" + $("#orgs").val() + "&" + "year=" + $("#leftOption3 select[name=year_from]").val() + "-" + $("#leftOption3 select[name=year_to]").val()
					$.getJSON('py/api.py/topic?' + params + '&summ', function(data) {
						$("#topics").empty();
						$("#topics").html( $('#topicList').tmpl(data["data"]));
						$("#topics option").each(function(i, v) { //SELECT ITEMS THAT WERE PREVIOUSLY SELECTED
							if ($.inArray($(v).val(), selTopics) > -1) {
								$(v).attr("selected", "selected");
							}
						});
						// QTip to show all of topic text!!
						$('#topics option').each(function(){
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

						setSelects();
					}); 
				}
			}
			if (selector == "org" || selector == "all") {
				if ($("#topics").val() != null) {
					topicStr = "t" + ($("#primary_topic").attr("checked")?"1":"") + "=" + $("#topics").val() + "&";
				}
				params = topicStr + "year=" + $("#leftOption3 select[name=year_from]").val() + "-" + $("#leftOption3 select[name=year_to]").val()
				prevSelOrgs = $("#orgs").val(); //PREVIOUSLY SELECTED 
				$.getJSON('py/api.py/topic?' + params + '&summ', function(data) {
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
	
		function validateMsg(text) {
			$("#message").html(text)
			$("#message").show();
			setTimeout('$("#message").slideUp()', 2500);
		}
	
		function submitMenu() {
			tab = selTab;
				
			var input = $("#menu form").serializeObject();
			query_nsfDiv = input.org;
			query_yearFrom = input.year_from;
			query_yearTo = input.year_to;
			query_topics = input.topic;
			query_primtopic = input.primary_topic;

						renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, tab);
			//renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, "grant");
			//renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, "pi");
			//renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, "org");
		}
		function renderIt(org, year_from, year_to, topic, prim, tab) {
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

			if(query == ""){
				$("#loader").hide();
				validateMsg("Please enter a search query!");
				return;
			}
			else
			{
								renderJSON(query, tab);
			
			}
		}
	</script>
			</div>
			<div class="clear"></div>
		
			<div class="grid_16 alpha omega">
				
	<link rel="stylesheet" href="css/style_sass_rl.css">
	<link rel="stylesheet" href="js/datatables/media/css/demo_page.css">
	<link rel="stylesheet" href="js/datatables/media/css/demo_table_jui.css">
	<link rel="stylesheet" href="js/tabletools/media/css/TableTools.css">
	<link rel="stylesheet" href="js/tabletools/media/css/TableTools_JUI.css">

	<style>
	</style>
	<script id="orgSearch" type="text/x-jquery-tmpl"> 
		
			<p><b>${proposal.title}</b> (<a onclick="renderProp('id=${proposal.nsf_id}', '${proposal.nsf_id}');">${proposal.nsf_id}</a>)</p>
			<div id="div_${proposal.nsf_id}" style="display:none;"><div>
			</div>
				<a onclick="$('#div_${proposal.nsf_id}').slideUp();">Close!</a>
			</div>
		
	</script>
	<script id="propRender" type="text/x-jquery-tmpl"> 
		
			<b>Abstract Text:</b>
			<p>${abstract}</p>
			<b>NSF Division:</b>
			<p>${org.full} (${org.name})</p>
		
	</script>
	<script id="personRender" type="text/x-jquery-tmpl"> 
		
			<b>Grant ${nsf_id}:</b>
			<p>${title}</p>
			<p>NSF Division: ${org.full} (${org.name})</p>
			<p>Program Element: ${pge.full} (${pge.code})</p>
		
	</script>
	<script id="orgRender" type="text/x-jquery-tmpl"> 
		
			<b>${name}</b>
			<p>${address.street}</p>
			<p>${address.city}, ${address.state} ${address.zip} ${address.country}</p>
			<p>Phone: ${phone}</p>

		
	</script>
	<h1> Query results: </h1>
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
						
						$("#grants").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable' style='width: 894px;'></table>");

						aaData = _.map(data["data"], function(v) { 
							return [
								'<img src="details_open.png">',
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
							"sDom": '<"H"Tfr>t<"F"ip>',
							"bDestroy": true,
							"bProcessing": true,

							/*"oTableTools": {
								"sSwfPath": "js/tabletools/media/swf/copy_cvs_xls_pdf.swf",
								"aButtons": [
									"copy", "csv", "xls", "pdf", "print",
								]
							},*/

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
							"aaSorting": [[4, 'desc'], [6, 'desc']]
						});
					} else if (tab == "pi") {			
						
						/* Render PI DataTable - add in more detail for each PI*/
						$("#pi").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable' style='width: 894px;'></table>");


						data["data"] = $.grep(data["data"], function(v) { return (v.inst != null); }); //removes the double not available
						aaData = _.map(data["data"], function(v) { 
							return [
								'<img src="details_open.png">',
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
							"sDom": '<"H"fr>t<"F"ip>',
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
					}  else if (tab == "org") {			
						
						/* Render institutions DataTable */
						$("#org").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable' style='width: 894px;'></table>");
						//data["data"] = $.grep(data["data"], function(v) { return (v.inst != null); }); //removes the double not available
						aaData = _.map(data["data"], function(v) { 
							return [
								'<img src="details_open.png">',
								keyExists("nsf_id", v, "Not Available"), 
								keyExists("name", v, "Not Available"),
								v["count"],
							]; 
						});

	
						iTable = $('#org table').dataTable({
							//TableTools - copy, csv, print, pdf
							"bJQueryUI": true,
							"sPaginationType": "full_numbers",
							//"sDom": 'T<"clear">lfrtip',
							"sDom": '<"H"fr>t<"F"ip>',
							"bDestroy": true,
							"bProcessing": true,

							"iDisplayLength": 50,
							"aoColumnDefs": [
								{ "bSortable": false, "aTargets": [ 0 ] },
								{ "sWidth": "15%", "sTitle": "Institution ID", "aTargets": [ 1 ] },
								{ "sWidth": "60%", "sTitle": "Name", "aTargets": [ 2 ] }, 
								{ "sWidth": "10%", "sTitle": "Total PIs", "aTargets": [ 3 ] },  
							],
							"aaData": aaData,
							"aaSorting": [[2, 'asc']]
						});
					}
				}
				$("#loader").hide();
			});
		}

	</script>	


			</div>
			<div class="clear"></div>
		</div>
		

	</div>
	<div id="footer"></div>

	<script src="js/libs/modernizr-1.7.min.js"></script>
	<script>!window.jQuery && document.write(unescape('%3Cscript src="js/libs/jquery-1.5.1.min.js"%3E%3C/script%3E'))</script>
	<script src="http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"></script>
	<script src="js/plugins.js"></script>
	<script src="js/script.js"></script>
	<script src="js/star.js"></script>
	<script src="js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script src="js/tabletools/media/js/TableTools.min.js"></script>
	<script src="js/tabletools/media/js/ZeroClipboard.js"></script>
	<script src="js/underscore.js"></script>
	<script src="js/jquery-ui/jquery-ui-1.8.14.custom.min.js"></script>
	<script src="js/jquery.tools.min.js"></script>
	<script src="js/jquery.sparkline.min.js"></script>
	<script src="js/jquery.qtip-1.0.0-rc3.min.js"></script>

	<script>
	var selTab = "grant";
	var query_nsfDiv = "CHE";
	var query_yearFrom = 2010;
	var query_yearTo = 2010;
	var query_topics = "";
	var query_primtopic = true;

	$.fn.serializeObject = function()
	{
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
		});
		return o;
	};
		
	$(document).ready(function() {

		// TableTools defaults
		TableTools.DEFAULTS.aButtons = [ "copy", "csv", "pdf", "print" ];
		TableTools.DEFAULTS.sSwfPath = "js/tabletools/media/swf/copy_cvs_xls_pdf.swf";

		// Tabs

		$('#tabs').tabs({
			select: function(event, ui) {
				selTab = ["grant", "pi", "org"][ui.index];
				renderIt(query_nsfDiv, query_yearFrom, query_yearTo, query_topics, query_primtopic, selTab);
			}
		});

		//$('#tabs').tabs();	
	
		
		$.data($("body").get(0), "orgSelect", $("#orgs").html());
		$("#orgs").val("CHE");
		$("#orgs").change(_.throttle(function() { chgSelects("topic"); }, 400));
		$("#topics").change(_.throttle(function() { chgSelects("org"); }, 400));
		$("#primary_topic").change(_.throttle(function() { chgSelects("org"); }, 400));
		$("#leftOption3 select").change(_.throttle(function() { chgSelects("all"); }, 400)); // Make sure you don't overload Javascript!
		chgSelects("topic");
		
		submitMenu();
		
		/* Detail for Grant Details */
		$('#grants #dtable tbody td img').live('click', function () {
			var nTr = $(this).parent().parent().get(0);
			if (nTr != null) {
				var aData = oTable.fnGetData(nTr);
				if ( this.src.match('details_close') )
				{
					this.src = "details_open.png";
					$("#pid_" + aData[6]).slideUp(function() {
						oTable.fnClose(nTr);
					});
				}
				else
				{
					this.src = "details_close.png";
					oTable.fnOpen(nTr, "<div class='dataInnerts' id='pid_" + aData[6] + "'></div>", 'details' );
					$.getJSON('py/api.py/prop?id=' + aData[6], function(data) {
						$("#pid_" + aData[6]).hide()
						$("#pid_" + aData[6]).html($("#propRender").tmpl(data["data"]));
						$("#pid_" + aData[6]).slideDown()
					});
				}
			}
		});

		/* Detail for PI Details */
		$('#pi #dtable tbody td img').live('click', function () {
			var pi_node = $(this).parent().parent().get(0);
			if (pi_node != null) {
				var pData = mTable.fnGetData(pi_node);
				if ( this.src.match('details_close') )
				{
					this.src = "details_open.png";
					$("#pid_" + pData[1]).slideUp(function() {
						mTable.fnClose(pi_node);
					});
				}
				else
				{
					this.src = "details_close.png";
					mTable.fnOpen(pi_node, "<div class='dataInnerts' id='pid_" + pData[1] + "'></div>", 'details' );
					$.getJSON(('py/api.py/prop?id=' + pData[6]).split(' ').join(''), function(data) {
						$("#pid_" + pData[1]).hide()
						// Use $.each() to get all grant details for each PI
						$.each(data["data"], function(i, item){
							$($("#personRender").tmpl(item)).appendTo("#pid_" + pData[1]);
						});
						$("#pid_" + pData[1]).slideDown()
					});
				}
			}
		});

		/* Detail for org Details */
		$('#org #dtable tbody td img').live('click', function () {
			var org_node = $(this).parent().parent().get(0);
			if (org_node != null) {
				var orgData = iTable.fnGetData(org_node);
				if ( this.src.match('details_close') )
				{
					this.src = "details_open.png";
					$("#oid_" + orgData[1]).slideUp(function() {
						iTable.fnClose(org_node);
					});
				}
				else
				{
					this.src = "details_close.png";
					iTable.fnOpen(org_node, "<div class='dataInnerts' id='oid_" + orgData[1] + "'></div>", 'details' );
					
					$.getJSON('py/api.py/org?id=' + orgData[1], function(data) {
						$("#oid_" + orgData[1]).hide()
						$("#oid_" + orgData[1]).html($("#orgRender").tmpl(data["data"]));
						$("#oid_" + orgData[1]).slideDown()
					});
				}
			}
		});
	});		
	</script>

	
</body>
</html>
<?php } ?>