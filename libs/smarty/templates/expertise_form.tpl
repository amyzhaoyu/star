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
  <h2>Select a time period to view relevant topics:</h2>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr valign="top">
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
            <td><div class="header-row-wrap"><strong><span id="topics_selected_right">0</span></strong></div></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="heading">
            <td class="label"><strong>Researchers</strong></td>
            <td><div class="header-row-wrap"><input class="buttonGreen button_view_results" type="button" value="Show Researchers" onclick="submitMenu('pi');" style="display: none;" /></div></td>
          </tr>
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

