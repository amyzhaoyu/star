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
<div id="navTopics" style="display: none;">
 <h3>Select Topics</h3>
  <table class="topics-table-wrap">
    <tr valign="top">
      <td class="topics-table-cell">
        <table class="topics-table" id="topics_table"></table>
	  </td>
      <td><div class="topic-selection-summary-wrap">
	  <h3>Filter Topics</h3>
	  <strong>Select a time period to view relevant topics:</strong>
	  <table width="100%" border="0" cellspacing="0" cellpadding="0">
	    <tr valign="top">
	      <td align="left"><table border="0" cellspacing="1" cellpadding="5" class="select-options">
	        <tr>
	          <td><strong>Time</strong></td>
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
	          <td><strong>Show</strong></td>
	          <td>
	         	<p><input type="checkbox" checked id = "prop_status_award" name = "prop_status" value = "award"><label for="prop_status_award">Awarded</label></p>
	<script>
				if (proposalaccessallowed) {
					document.write('<p><input type="checkbox" checked id = "prop_status_propose" name = "prop_status" value = "propose"><label for="prop_status_propose">Proposed</label></p>');
					document.write('<p><input type="checkbox" checked id = "prop_status_decline" name = "prop_status" value = "decline"><label for="prop_status_decline">Declined</label></p>');
				}
	</script>			
	          </td>
	        </tr>
	        <tr>
	          <td><strong>Topics</strong></td>
	          <td><input type="checkbox" id = "primary_topic" name = "primary_topic" value = true checked> Use primary topic</td>
	        </tr>
	      </table></td>
	      <td align="left">
	        <input class="buttonGreen" type="button" value="Filter Topics" onclick="getTopics();" />
				<br /><br />
				<div id="message"></div>
			</td>
	      </tr>
	  </table>
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
			<td colspan="2">
				<ul id="topics_selected_list" style="list-style: none;"></li>
			</td>
		  </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="heading">
            <td class="label"><strong>Researchers</strong></td>
            <td><div class="header-row-wrap"><span class="num-lg" id="pi_selected_right">0</span><input class="buttonGreen button_view_results" type="button" value="Show" onclick="submitMenu('pi');" style="display: none;" /></div></td>
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
        <label>Filtered By:</label>
        </h3></td>
      <td>Timing: <span class="values" id="year_selected">[dropdown value]</span></td>
      <td>Show: <span class="values" id="propstatus_selected">[dropdown value]</span></td>
      <td>Topics: <span class="values" id="primarytopic_selected">[dropdown value]</span></td>
    </tr>
    <tr valign="middle">
      <td align="left"><h3>
        <label>Viewing:</label>
        </h3></td>
      <td align="left">Topics: <span class="values" id="topics_selected">0</span>/<span class="values" id="topics_total">[count total]</span></td>
      <td>Researchers: <span class="values" id="pi_selected">0</span></td>
      <td align="right"><input class="buttonGreen-sm" type="submit" value="Edit" onClick="editTopics();" /></td>
    </tr>
  </table>
</div>
<img id="loader" style="display:none" src="images/ajax-loader.gif" />
