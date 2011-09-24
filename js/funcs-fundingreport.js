//global variable that holds proposal data for selected topics
//when user first selects a topic read the data and store it in this array (indexed by topic id)
//then use it to add/remove from the summary instead of retrieving it each time
var topicsummarydata = {};

function setSelects() {
	var numSelected = $("#orgs :selected").length;
	var selValues = $("#orgs").val();
	$("#orgs_selected").html((selValues==null)?"":(selValues)); 
	selValues = $("#year_from").val()+' - '+$("#year_to").val();
	$("#year_selected").html((selValues==null)?"":(selValues)); 
	selValues = "";
	$('[id^="prop_status"]:checked').each(function() {
		if (selValues!="") selValues += ", ";
		selValues += $(this).next().text();
	});
	$("#propstatus_selected").html(selValues); 
	$("#primarytopic_selected").html($("#primary_topic").attr("checked")?"Primary Topic Only":"All Topics");
}		
function chgSelects(selector) {
	//first clear out the msg - this is important because we use to below in the submitMenu function to determine if an error occurred
	//it's not the cleanest way to do error checking but it's the quickest for now
	$("#message").html(null);
	
	var selTopics = $("#topics").val(); //PREVIOUSLY SELECTED
	if ($("#orgs").val() != null) {
		$("#topic_loader").show();	

		var status = [];
		$('input[name=prop_status]:checked').each(function() {
			status.push($(this).val());
		});
		//but we need a string
		status = status.join(',');
		var params = "org=AST,CHE,DMR,DMS,PHY,BIO,MCB,DBI,IOS,DEB,EF,CISE,CCF,CNS,IIS,EHR,DRL,DGE,HRD,DUE,ENG,CBET,CMMI,ECCS,EEC,EFRI,IIP,GEO,AGS,EAR,OCE,SBE,SES,BCS,NCSE,SMA,BFA,BD,DACS,DFM,DGA,DIAS,OIRM,HRM,DIS,DAS" + "&" + "year=r" + $("select[name=year_from]").val() + "-" + $("select[name=year_to]").val() + "&" + "status=" + status;
		$.getJSON(apiurl + 'topic?' + params + '&summ=full&jsoncallback=?', function(data) {
			//$('#fundingreport').hide();
			//populate table
			//what we get back is a list of topics per year, per org, per status
			//create the compiled data once for quick access
			var org_funding = {}; //"org: { "year":"funding", "year":"funding"}"
			var years = []; //list of years
			var maxAwardCountByYear = {};
			for (var i=0;i<data["data"].length;i++) {
				if ($.inArray(data["data"][i]["year"],years)==-1) years.push(data["data"][i]["year"]);
				//gather funding by org
				if (org_funding[data["data"][i]["org"]]) {
					var year_funding = org_funding[data["data"][i]["org"]];
				}
				else {
					var year_funding = {};
				}
				//gather funding by year
				if (year_funding[data["data"][i]["year"]]) year_funding[data["data"][i]["year"]] += parseInt(data["data"][i]["awarded_dollar"]);
				else year_funding[data["data"][i]["year"]] = parseInt(data["data"][i]["awarded_dollar"]);					
				//record max
				if (maxAwardCountByYear[data["data"][i]["year"]]) {
					if (maxAwardCountByYear[data["data"][i]["year"]]<year_funding[data["data"][i]["year"]])
					 maxAwardCountByYear[data["data"][i]["year"]] = year_funding[data["data"][i]["year"]];
				} else {
					maxAwardCountByYear[data["data"][i]["year"]] = year_funding[data["data"][i]["year"]];
				}
				//save it
				org_funding[data["data"][i]["org"]] = year_funding;
			}
//console.log(maxAwardCountByYear);			
//console.log(org_funding);
			//sort the years first
			years.sort();		 
			//now draw the table
			var html = '';
			html += '<tr>';
			html += '<td style="border: 1px solid; padding: 5px;">&nbsp;</td>';
			for (var i in years) {
				html += '<td align="center" style="border: 1px solid; padding: 5px;"><strong>'+years[i]+'</strong></td>';
			}
			html += '</tr>';
			for (var org in org_funding) {
				html += '<tr';
				if (org==$('#orgs').val()) html += ' style="background: #E4F1D8"';
				html += '>';
				html += '<td align="right" style="border: 1px solid; padding: 5px;"><strong>'+org+'</strong></td>';
				var year_funding = org_funding[org];
				for (var i in years) {
					html += '<td style="border: 1px solid;">';					
					if (year_funding[years[i]]) {
						//it is relative to the maxCount and the size of this column - 150px
						var numPixels = 0;
						var formattedAwarded_Dollar = (year_funding[years[i]]/1000000).toFixed(2);
						if (maxAwardCountByYear[years[i]]) {
							var maxAwardCount = maxAwardCountByYear[years[i]];
							if (maxAwardCount > 0) {
								numPixels = Math.ceil((150/maxAwardCount)*year_funding[years[i]]);
//console.log(years[i]+':'+maxAwardCount+' '+year_funding[years[i]]+' '+numPixels);							
							}
						}
						html += '<strong class="num-bar-wrap num-bar-amount"><span class="num-bar" style="width: '+numPixels+'px;"><span class="number">$ '+formattedAwarded_Dollar+'M</span></span></strong>';
					}
					else html += '&nbsp;';
					html += '</td>';
				}
				html += '</tr>';
			}
			$('#fundingreport').html(html);
			//$('#fundingreport').show();
			$("#topic_loader").hide();
			$("#navDivisions").slideUp();
			$("#navDivisions-sm").slideDown();
			$("#navTopics").slideDown();			
		}); 
	}
	setSelects();
}

function validateMsg(text) {
	$("#message").html(text)
	$("#message").show();
	//setTimeout('$("#message").slideUp()', 2500);
}

function getTopics() {
	$("#message").html("");
	
	var tab = selTab;
		
	var input = $("#queryform").serializeObject();
	var year_from = input.year_from;
	var year_to = input.year_to;

	if(year_from > year_to) {
		validateMsg("Please enter a valid date range!");
		return;
	}

	//check status
	if (!input.prop_status) {
		validateMsg("Please specify a status!");
		return;		
	};
	
	chgSelects('topic');
}

function editQuery() {
	$("#queryresults").slideUp();
	$("#navDivisions-sm").slideUp(); //this is the guy that shows a summary of the query params
	$("#navTopics-sm").slideUp(); //this is the guy that shows a summary of the query params
	$("#navTopics").slideUp();
	//show form
	$("#navDivisions").slideDown();
}

// left padding s with c to a total of n chars
function padding_left(s, c, n) {
    if (! s || ! c || s.length >= n) {
        return s;
    }

    var max = (n - s.length)/c.length;
    for (var i = 0; i < max; i++) {
        s = c + s;
    }

    return s;
}
