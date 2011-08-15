{* style *}
	<style>
	#menu p { margin-top: 10px; margin-bottom: 5px; }
	</style>

{* templates *}
	<script id=topicList type="text/x-jquery-tmpl">
		{literal}
		<option value="${t1}">${count} granted, (t${t1}) ${words}</option>
		{/literal}
	</script>


{* html *}
	<h1> Topic and Grant Query: </h1>
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
					<input type="checkbox" id = "primary_topic" name = "primary_topic" value = true checked> Select by primary topic
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
				<p><input type="checkbox" checked id = "prop_status" name = "prop_status" value = "granted"> Show grants </p>
				<p><input type="checkbox" id = "prop_status" name = "prop_status" value = "proposed"> Show proposals (coming soon!) </p>
				</div>
				<div class="clear"></div>
				<!-- Keyword search: <input type="text" name="q"/> -->
				<div id="leftOption4" class="grid_4 alpha omega">
					<input type="button" value="Submit" onclick="submitMenu()" /><br />
					<img id="loader" style="display:none" src="images/ajax-loader.gif" />
					<div id="message"></div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="clear"></div>
		</form>
	</div>

{* script *}
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

			{if $smarty.get.alert=="amy"}
				alert(JSON.stringify(input));
			{/if}
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
				{if $smarty.get.alert=="amy"}
					alert('py/api.py/topic?' + query);
				{/if}
				renderJSON(query, tab);
				{*
				$.getJSON('py/api.py/topic?' + query, function(data) {
					if (data["Error"] != undefined){
						validateMsg(data["Error"]);
						$("#loader").hide();
					}
					else{
						renderJSON(data);
						$("#loader").hide();
					}
				});
				*}
			
			}
		}
	</script>
