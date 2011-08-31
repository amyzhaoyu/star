<?php /* Smarty version Smarty-3.0.8, created on 2011-08-31 13:28:35
         compiled from "libs/smarty/templates/people.tpl" */ ?>
<?php /*%%SmartyHeaderCode:8648648124e5e6f43f30ae8-18076518%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'd0ada542da285280afcc3c81081bb150efa2a8b6' => 
    array (
      0 => 'libs/smarty/templates/people.tpl',
      1 => 1314284955,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '8648648124e5e6f43f30ae8-18076518',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<!doctype html>
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
				<?php $sha = sha1("people_leftside.tpl" . $_smarty_tpl->cache_id . $_smarty_tpl->compile_id);
if (isset($_smarty_tpl->smarty->template_objects[$sha])) {
$_template = $_smarty_tpl->smarty->template_objects[$sha]; $_template->caching = 9999; $_template->cache_lifetime =  null;
} else {
$_template = new Smarty_Internal_Template("people_leftside.tpl", $_smarty_tpl->smarty, $_smarty_tpl, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 9999, null);
}
 echo $_template->getRenderedTemplate(); $_template->rendered_content = null;?><?php unset($_template);?>
			</div>
			<div class="clear"></div>
		
			<div class="grid_16 alpha omega">
				<?php $sha = sha1("people_main.tpl" . $_smarty_tpl->cache_id . $_smarty_tpl->compile_id);
if (isset($_smarty_tpl->smarty->template_objects[$sha])) {
$_template = $_smarty_tpl->smarty->template_objects[$sha]; $_template->caching = 9999; $_template->cache_lifetime =  null;
} else {
$_template = new Smarty_Internal_Template("people_main.tpl", $_smarty_tpl->smarty, $_smarty_tpl, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 9999, null);
}
 echo $_template->getRenderedTemplate(); $_template->rendered_content = null;?><?php unset($_template);?>
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
					this.src = "images/details_open.png";
					$("#pid_" + aData[6]).slideUp(function() {
						oTable.fnClose(nTr);
					});
				}
				else
				{
					this.src = "images/details_close.png";
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
					this.src = "images/details_open.png";
					$("#pid_" + pData[1]).slideUp(function() {
						mTable.fnClose(pi_node);
					});
				}
				else
				{
					this.src = "images/details_close.png";
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
					this.src = "images/details_open.png";
					$("#oid_" + orgData[1]).slideUp(function() {
						iTable.fnClose(org_node);
					});
				}
				else
				{
					this.src = "images/details_close.png";
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
