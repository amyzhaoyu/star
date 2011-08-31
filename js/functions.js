$(document).ready(function() {

	// TableTools defaults
	TableTools.DEFAULTS.aButtons = [
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
					];
	TableTools.DEFAULTS.sSwfPath = "js/tabletools/media/swf/copy_cvs_xls_pdf.swf";
	TableTools.DEFAULTS.sRowSelect = "multi";

	$.data($("body").get(0), "orgSelect", $("#orgs").html());
	$("#orgs").val("CHE");
	$("#orgs").change(_.throttle(function() { chgSelects("topic"); }, 400));
	$("#topics").change(_.throttle(function() { chgSelects("org"); }, 400));
	$("#primary_topic").change(_.throttle(function() { chgSelects("org"); }, 400));
	$("#leftOption3 select").change(_.throttle(function() { chgSelects("all"); }, 400)); // Make sure you don't overload Javascript!
	chgSelects("topic");

	submitMenu();

	// Tabs

	$('#tabs').tabs({
		select: function(event, ui) {
			selTab = ["grant", "pi", "org", "divs", "topics_tab"][ui.index];
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
