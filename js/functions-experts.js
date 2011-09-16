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
						"select_all", "select_none"
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



	/* Detail for PI Details */
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
				$.getJSON(('http://readidata.nitrd.gov/star/py/api.py/prop?id=' + pData[6]).split(' ').join('') + '&jsoncallback=?', function(data) {
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





});		
