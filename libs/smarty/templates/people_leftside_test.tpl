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
<form id="queryform" name="queryform" method="post" action="">
<div id="navDivisions">
  <h2>Select one or more NSF Division(s):</h2>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr valign="top">
      <td align="left"><label>
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
      </label></td>
      <td align="left"><table border="0" cellspacing="1" cellpadding="5" class="select-options">
        <tr>
          <td><h3>Time</h3></td>
          <td>
				<select id="year_from" name="year_from">
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
				<select id="year_to" name="year_to">
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
          </td>
        </tr>
        <tr>
          <td><h3>Show</h3></td>
          <td>
         	<p><input type="checkbox" checked id = "prop_status" name = "prop_status" value = "granted"> Grants </p>
			<p><input type="checkbox" id = "prop_status" name = "prop_status" value = "proposed"> Proposals (coming soon!) </p>
          </td>
        </tr>
        <tr>
          <td><h3>Topics</h3></td>
          <td><input type="checkbox" id = "primary_topic" name = "primary_topic" value = true checked> Use primary topic</td>
        </tr>
      </table></td>
      <td align="left">
        <input class="buttonGreen" type="button" value="View Topics" onclick="getTopics();" />
        <br /><br />To begin: choose one or more divisions <br />
          and other search criteria. Then click <br />
          'View Topics' to  
        view applicable topics.<br /><br />
			<div id="message"></div>
		</td>
      </tr>
  </table>
</div>
<div id="navDivisions-sm" style="display: none;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr valign="middle">
      <td align="left"><h3>
        <label>Viewing:</label>
      </h3></td>
      <td align="left">Divisions: <span class="values" id="orgs_selected">[count] [values]</span></td>
      <td>Timing: <span class="values" id="year_selected">[dropdown value]</span></td>
      <td>Show: <span class="values" id="propstatus_selected">[dropdown value]</span></td>
      <td>Topics: <span class="values" id="primarytopic_selected">[dropdown value]</span></td>
      <td align="right"><input class="buttonGreen-sm" type="submit" value="Edit" onClick="editQuery();" /></td>
    </tr>
  </table>
</div>
<div id="navTopics" style="display: none;">
 <h3>Select Topics</h3>
  <table class="topics-table-wrap">
    <tr valign="top">
      <td class="topics-table-cell">
        <table class="topics-table" id="topics_table"></table>
	  </td>
      <td><div class="topic-selection-summary-wrap">

      <h3>Topic Selection Summary</h3>
        <p>The below reflects a summary of the Topics you 
          selected on the left. Click the links below to 
          analyze your Topic selection deeper.        </p>
          
        <table class="topic-selection-summary-table">
          <tr class="heading">
            <td class="label"><strong>Topic(s) Selected</strong></td>
            <td><div class="header-row-wrap"><strong><span id="topics_selected_right">0</span></strong><!--<input class="buttonGreen button_view_results" type="button" value="Analyze" onclick="submitMenu();" style="display: none;" />--></div></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="heading">
            <td class="label"><strong>Proposals</strong></td>
            <td><div class="header-row-wrap"><strong><span id="proposals_selected_right">0</span></strong><input class="buttonGreen button_view_results" type="button" value="Analyze" onclick="submitMenu('grant');" style="display: none;" /></div></td>
          </tr>
          <tr>
            <td class="label">Funded</td>
            <td class="value">[#]</td>
          </tr>
          <tr>
            <td class="label">Total Awards</td>
            <td class="value">[#]</td>
          </tr>
          <tr>
            <td class="label">Date first</td>
            <td class="value">[#]</td>
          </tr>
          <tr>
            <td class="label">Date last</td>
            <td class="value">[#]</td>
          </tr>
          <tr>
            <td class="label">&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="heading">
            <td class="label"><strong>Institutions</strong></td>
            <td><div class="header-row-wrap"><span class="num-lg">#</span><input class="buttonGreen button_view_results" type="button" value="Analyze" onclick="submitMenu('org');" style="display: none;" /></div></td>
          </tr>
          <tr>
            <td class="label">Total # of States</td>
            <td class="value">[#]</td>
          </tr>
          <tr>
            <td class="label">Top Region</td>
            <td class="value">[#]</td>
          </tr>
          <tr>
            <td class="label">Region 2</td>
            <td class="value">[#]</td>
          </tr>
          <tr>
            <td class="label">Region 3</td>
            <td class="value">[#]</td>
          </tr>
          <tr>
            <td class="label">Region 4</td>
            <td class="value">[#]</td>
          </tr>
          <tr>
            <td class="label">&nbsp;</td>
            <td>[#] more</td>
          </tr>
          <tr>
            <td class="label">&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="heading">
            <td class="label"><strong>Researchers</strong></td>
            <td><div class="header-row-wrap"><span class="num-lg">#</span><input class="buttonGreen button_view_results" type="button" value="Analyze" onclick="submitMenu('pi');" style="display: none;" /></div></td>
          </tr>
          <tr>
            <td class="label">Top Researcher</td>
            <td class="value">[#]</td>
          </tr>
          <tr>
            <td class="label">Researcher 2</td>
            <td class="value">[#]</td>
          </tr>
          <tr>
            <td class="label">Researcher 3</td>
            <td class="value">[#]</td>
          </tr>
          <tr>
            <td class="label">Researcher 4</td>
            <td class="value">[#]</td>
          </tr>
<!--          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td><strong>Patents</strong></td>
            <td><strong>(soon)</strong></td>
          </tr>
          <tr>
            <td class="label">&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td><strong>Publications</strong></td>
            <td><strong>(soon)</strong></td>
          </tr>
          <tr>
            <td class="label">&nbsp;</td>
            <td>&nbsp;</td>
          </tr>-->
        </table>
        </div><!-- /topic-selection-summary-wrap -->
        </td>
    </tr>
  </table>
  </div>
</form>
<div id="navTopics-sm" style="display: none;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr valign="middle">
      <td align="left"><h3>
        <font color="#C7D3DF">
        <label>Viewing:</label>
        </font></h3></td>
      <td align="left">Topics: <br />
        <span class="values" id="topics_selected">0</span>/<span class="values" id="topics_total">[count total]</span></td>
      <td>Proposals: <br />
        <span class="values" id="proposals_selected">0</span></td>
      <td>Funded Proposals: <br />
        <span class="values">[count]</span></td>
      <td>Institutions: <br />
        <span class="values">[count]</span></td>
      <td>Researchers: <br />
        <span class="values">[count]</span></td>
      <td><span class="values">Patents<br />
        (soon)</span></td>
      <td><span class="values">Publications<br />
(soon)</span></td>
      <td align="right"><input class="buttonGreen-sm" type="submit" value="Edit" onClick="editTopics();" /></td>
    </tr>
  </table>
</div>
<img id="loader" style="display:none" src="images/ajax-loader.gif" />

<!--
	<h1> Topic and Grant Query: </h1>
	<div id="menu">
		<form action = "" method = "post">
			<div id="leftOption1" class="grid_6 alpha">
				<p>
					Select NSF Division(s): 
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
					Select Topic(s):	
					<input type="checkbox" id = "primary_topic" name = "primary_topic" value = true checked> Use primary topic
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
				<div class="clear"></div>-->
				<!-- Keyword search: <input type="text" name="q"/> -->
<!--				<div id="leftOption4" class="grid_4 alpha omega">
					<input type="button" value="Submit" onclick="submitMenu()" /><br />
					<img id="loader" style="display:none" src="images/ajax-loader.gif" />
					<div id="message"></div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="clear"></div>
		</form>
	</div> -->