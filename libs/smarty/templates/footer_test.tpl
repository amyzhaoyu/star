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
	<script src="js/funcs.js"></script>
	<script src="js/functions.js"></script>

	{* TEMPLATES *}

	<script>
	var selTab = "grant";
	var query_nsfDiv = "CHE";
	var query_yearFrom = 2010;
	var query_yearTo = 2010;
	var query_topics = "";
	var query_primtopic = true;
	
	//initialize the access status and api url
	{php}
	if (isProposalAccessAllowed()) {
		print 'var proposalaccessallowed = true;'."\n";
		print 'var apiurl = "http://128.150.10.70/py/api.py/";';
	} else {
		print 'var proposalaccessallowed = false;'."\n";
		print 'var apiurl = "http://readidata.nitrd.gov/star/py/api.py/";';		
	}
	{/php}

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

/*		
	$(document).ready(function() {

		// TableTools defaults
		//TableTools.DEFAULTS.aButtons = [ "copy", "csv", "pdf", "print" ];
		TableTools.DEFAULTS.sSwfPath = "js/tabletools/media/swf/copy_cvs_xls_pdf.swf";

		// Tabs

		$('#tabs').tabs({
			select: function(event, ui) {
				selTab = ["grant", "pi", "org"][ui.index];
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
	
		
		$.data($("body").get(0), "orgSelect", $("#orgs").html());
		$("#orgs").val("CHE");
		$("#orgs").change(_.throttle(function() { chgSelects("topic"); }, 400));
		$("#topics").change(_.throttle(function() { chgSelects("org"); }, 400));
		$("#primary_topic").change(_.throttle(function() { chgSelects("org"); }, 400));
		$("#leftOption3 select").change(_.throttle(function() { chgSelects("all"); }, 400)); // Make sure you don't overload Javascript!
		chgSelects("topic"); //NK - comment this out if you want to initialize the page showing the topics for some preselected items
		
		submitMenu(); //NK - comment this out if you want to initialize the page showing the topics for some preselected items
*/		
		/* Detail for Grant Details */
/*		
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
					$.getJSON('http://readidata.nitrd.gov/star/py/api.py/prop?id=' + aData[6], function(data) {
						$("#pid_" + aData[6]).hide()
						$("#pid_" + aData[6]).html($("#propRender").tmpl(data["data"]));
						$("#pid_" + aData[6]).slideDown()
					});
				}
			}
		});
*/
		/* Detail for PI Details */
/*
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
					$.getJSON(('http://readidata.nitrd.gov/star/py/api.py/prop?id=' + pData[6]).split(' ').join(''), function(data) {
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
*/
		/* Detail for org Details */
/*
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
					
					$.getJSON('http://readidata.nitrd.gov/star/py/api.py/org?id=' + orgData[1], function(data) {
						$("#oid_" + orgData[1]).hide()
						$("#oid_" + orgData[1]).html($("#orgRender").tmpl(data["data"]));
						$("#oid_" + orgData[1]).slideDown()
					});
				}
			}
		});
	});		
*/
	</script>

	
</body>
</html>
