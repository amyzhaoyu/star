{* style *}
<link rel="stylesheet" href="css/style_sass_rl.css">
<link rel="stylesheet" href="js/datatables/media/css/demo_page.css">
<link rel="stylesheet" href="js/datatables/media/css/demo_table_jui.css">
<link rel="stylesheet" href="js/tabletools/media/css/TableTools.css">
<link rel="stylesheet" href="js/tabletools/media/css/TableTools_JUI.css">

{* templates *}
<script id="orgSearch" type="text/x-jquery-tmpl"> 
	{literal}
		<p><b>${proposal.title}</b> (<a onclick="renderProp('id=${proposal.nsf_id}', '${proposal.nsf_id}');">${proposal.nsf_id}</a>)</p>
		<div id="div_${proposal.nsf_id}" style="display:none;"><div>
		</div>
			<a onclick="$('#div_${proposal.nsf_id}').slideUp();">Close!</a>
		</div>
	{/literal}
</script>
<script id="propRender" type="text/x-jquery-tmpl"> 
	{literal}
		<p><strong>Title: </strong>${title}</p>
		<p><strong>Abstract Text:</strong>${abstract}</p>
		<p><strong>NSF Division: </strong>${org.full} (${org.name})</p>
	{/literal}
</script>
<script id="propListRender" type="text/x-jquery-tmpl"> 
	{literal}
		<b>Grant ${nsf_id}:</b>
		<p>${title}</p>
		<p>NSF Division: ${org.full} (${org.name})</p>
		<p>Program Element: ${pge.full} (${pge.code})</p>
	{/literal}
</script>
<script id="personRender" type="text/x-jquery-tmpl"> 
	{literal}
		<h3><strong>${name}:</strong></h3>
		<p>${email}<br />
		${phone}</p>
		<p>${inst.dept}<br />
		${inst.name}</p>
	{/literal}
</script>
<script id="copiRender" type="text/x-jquery-tmpl"> 
	{literal}
		<p>${name} (${count})</p>
	{/literal}
</script>
<script id="propSummRender" type="text/x-jquery-tmpl"> 
	{literal}
		<p>Awards: ${awardcount}<br /><br />
		Date First: ${mindate}<br />
		Date Last: ${maxdate}<br /><br />
		Total Requested Funding: ${requestfunding}<br />
		Award Funding: ${awardfunding}<br />
		Award Avg.: ${avgawardfunding}<br />
		</p>
	{/literal}
</script>
<script id="orgRender" type="text/x-jquery-tmpl"> 
	{literal}
		<b>${name}</b>
		<p>${address.street}</p>
		<p>${address.city}, ${address.state} ${address.zip} ${address.country}</p>
		<p>Phone: ${phone}</p>

	{/literal}
</script>

{* html *}
<table class="topics-table-wrap">
  <tr valign="top">
    <td class="topics-table-cell">
	<h1> Proposal Portfolio: </h1>
	<h3> Selecting items below will update the Selection Summary sidebar. Use the Copy/Export functions to export your selection. </h3>
	{* JQuery UI - tabs *}
	<div id="tabs">
		<ul>
			<li id="tab-prop"><a href="#tabs-1">Proposals</a></li>
			<li id="tab-grant"><a href="#tabs-2">Awards</a></li>
			<li><a href="#tabs-3">Researchers</a></li>
			<li><a href="#tabs-4">Institutions</a></li>
	<!--		<li><a href="#tabs-4">Related Divisions</a></li>-->
			<li><a href="#tabs-5">Topics</a></li>
			<li><a href="#tabs-6">Patents</a></li>
			<li><a href="#tabs-7">Publications</a></li>
		</ul>
		<div id="tabs-1"><div id="props"></div> </div>
		<div id="tabs-2"><div id="grants"></div> </div>
		<div id="tabs-3"><div id="pi"></div> </div>
		<div id="tabs-4"><div id="org"></div></div>
	<!--	<div id="tabs-4"><div id="divs"></div></div>-->
		<div id="tabs-5"><div id = "topics_tab"></div></div>
		<div id="tabs-6"><div id = "patents">
			<table style="" class="topics-table" id="patents_table" width="100%">
			<thead>
			<tr>
			<th colspan="1" rowspan="1" class="ui-state-default"><div class="DataTables_sort_wrapper">Select<span class="DataTables_sort_icon"></span></div></th>
			<th colspan="1" rowspan="1" class="ui-state-default"><div class="DataTables_sort_wrapper">Award<span class="DataTables_sort_icon"></span></div></th>
			<th style="width: ;" colspan="1" rowspan="1" class="ui-state-default"><div class="DataTables_sort_wrapper">Topic<span class="DataTables_sort_icon css_right ui-icon ui-icon-triangle-1-s"></span></div></th>
			<th style="width: ;" colspan="1" rowspan="1" class="ui-state-default"><div class="DataTables_sort_wrapper">Researcher<span class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"></span></div></th>
			<th style="width: ;" colspan="1" rowspan="1" class="ui-state-default"><div class="DataTables_sort_wrapper">Patent<span class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"></span></div></th>
			<th style="width: ;" colspan="1" rowspan="1" class="ui-state-default"><div class="DataTables_sort_wrapper">Patent
			    Date<span class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"></span></div></th>
			<th style="width: ;" colspan="1" rowspan="1" class="ui-state-default"><div class="DataTables_sort_wrapper">Patent
			    Title<span class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"></span></div></th>
			<th style="width: ;" colspan="1" rowspan="1" class="ui-state-default"><div class="DataTables_sort_wrapper">Show</div></th>
			</tr>
			</thead>
			<tbody>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">94961</a></td><td>29</td><td><A href="#">SMITH, DOUG</a></td><td>7150101</td><td>12/15/03</td><td>Apparatus for fabricating comp</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">349034</a></td><td>29</td><td><A href="#">ISMAGILOV, </a></td><td>7774920</td><td>4/25/07</td><td>Fabrication of metallic micros</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">616505</a></td><td>29</td><td><A href="#">WHITE, HENR</a></td><td>7849581</td><td>5/3/07</td><td>Nanopore electrode, nanopore m</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">94961</a></td><td>52</td><td><A href="#">SMITH, DOUG</a></td><td>7210274</td><td>3/28/03</td><td>Door stile structure</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">94961</a></td><td>62</td><td><A href="#">SMITH, DOUG</a></td><td>6474100</td><td>4/25/01</td><td>Evacuated sorbent assembly and</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">94961</a></td><td>62</td><td><A href="#">SMITH, DOUG</a></td><td>6532762</td><td>6/26/02</td><td>Refrigeration cooling device w</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">243496</a></td><td>65</td><td><A href="#">ZHAO, YAN</a></td><td>7748237</td><td>5/27/04</td><td>Convection glass heating furna</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">9984282</a></td><td>73</td><td><A href="#">LI, JING</a></td><td>6450008</td><td>7/20/00</td><td>Food applications of artificia</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">94961</a></td><td>73</td><td><A href="#">SMITH, DOUG</a></td><td>6745622</td><td>10/31/02</td><td>Apparatus and method for inspe</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">9984282</a></td><td>73</td><td><A href="#">LI, JING</a></td><td>6895338</td><td>3/9/01</td><td>Measuring and analyzing multi-</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">9984282</a></td><td>73</td><td><A href="#">LI, JING</a></td><td>7426848</td><td>8/5/05</td><td>Gas composition sensing using </td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">9983205</a></td><td>75</td><td><A href="#">KROENKE, WI</a></td><td>6689192</td><td>12/13/01</td><td>Method for producing metallic </td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">9983205</a></td><td>75</td><td><A href="#">KROENKE, WI</a></td><td>6755886</td><td>4/18/02</td><td>Method for producing metallic </td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">110960</a></td><td>75</td><td><A href="#">WINTER, CHA</a></td><td>6887297</td><td>11/8/02</td><td>Copper nanocrystals and method</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">71885</a></td><td>75</td><td><A href="#">MIRKIN, CHA</a></td><td>7033415</td><td>4/2/04</td><td>Methods of controlling nanopar</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">71885</a></td><td>75</td><td><A href="#">MIRKIN, CHA</a></td><td>7135054</td><td>9/26/02</td><td>Nanoprisms and method of makin</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">71885</a></td><td>75</td><td><A href="#">MIRKIN, CHA</a></td><td>7252698</td><td>3/15/04</td><td>Triangular nanoframes and meth</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">349040</a></td><td>75</td><td><A href="#">ZHONG, CHUA</a></td><td>7335245</td><td>9/17/04</td><td>Metal and alloy nanoparticles </td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">349040</a></td><td>75</td><td><A href="#">ZHONG, CHUA</a></td><td>7524354</td><td>7/7/05</td><td>Controlled synthesis of highly</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">447674</a></td><td>75</td><td><A href="#">MIRKIN, CHA</a></td><td>7588624</td><td>3/10/06</td><td>Method of producing gold nanop</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">447674</a></td><td>75</td><td><A href="#">MIRKIN, CHA</a></td><td>7611562</td><td>4/11/07</td><td>Triangular nanoframes and meth</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">447674</a></td><td>75</td><td><A href="#">MIRKIN, CHA</a></td><td>7776130</td><td>6/18/07</td><td>pH-controlled photosynthesis o</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">447674</a></td><td>75</td><td><A href="#">MIRKIN, CHA</a></td><td>7824467</td><td>6/29/05</td><td>Method of making metal nanopri</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">449634</a></td><td>95</td><td><A href="#">ZHOU, HONG </a></td><td>7789943</td><td>2/4/08</td><td>Mesh-adjustable molecular siev</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">639076</a></td><td>95</td><td><A href="#">HUPP, JOSEP</a></td><td>7824473</td><td>7/25/08</td><td>Metal-organic framework materi</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">749614</a></td><td>95</td><td><A href="#">MIRKIN, CHA</a></td><td>7824473</td><td>7/25/08</td><td>Metal-organic framework materi</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">71885</a></td><td>101</td><td><A href="#">MIRKIN, CHA</a></td><td>7223438</td><td>9/17/03</td><td>Patterning magnetic nanostruct</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">315129</a></td><td>106</td><td><A href="#">BRIGHT, FRA</a></td><td>7244295</td><td>1/7/04</td><td>Hybrid anti-fouling coating co</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">91726</a></td><td>106</td><td><A href="#">SCHLENOFF, </a></td><td>7261771</td><td>1/9/02</td><td>Method of controlling the visc</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">243575</a></td><td>106</td><td><A href="#">BARRON, AND</a></td><td>7736430</td><td>3/16/06</td><td>Compositions and methods for c</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">210918</a></td><td>110</td><td><A href="#">TAYLOR, RIC</a></td><td>7331298</td><td>9/3/04</td><td>Coke oven rotary wedge door la</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">9985574</a></td><td>117</td><td><A href="#">GODDARD III</a></td><td>6685772</td><td>3/28/02</td><td>De novo processing of electron</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">209898</a></td><td>117</td><td><A href="#">BAWENDI, MO</a></td><td>6821337</td><td>6/6/03</td><td>Preparation of nanocrystallite</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">101178</a></td><td>117</td><td><A href="#">PENG, XIAOG</a></td><td>6872249</td><td>10/4/01</td><td>Synthesis of colloidal nanocry</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">49090</a></td><td>117</td><td><A href="#">SWAIN, GREG</a></td><td>6884290</td><td>1/8/03</td><td>Electrically conductive polycr</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">9985574</a></td><td>117</td><td><A href="#">GODDARD III</a></td><td>7074270</td><td>4/2/03</td><td>Method for predicting the beha</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">91726</a></td><td>117</td><td><A href="#">SCHLENOFF, </a></td><td>7105052</td><td>3/12/04</td><td>Ordered array of magnetized na</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">209898</a></td><td>117</td><td><A href="#">STOTT, NATH</a></td><td>7229497</td><td>8/19/04</td><td>Method of preparing nanocrysta</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">49090</a></td><td>117</td><td><A href="#">SWAIN, GREG</a></td><td>7534296</td><td>3/17/06</td><td>Electrically conductive diamon</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">94961</a></td><td>118</td><td><A href="#">SMITH, DOUG</a></td><td>6610145</td><td>9/19/01</td><td>Deposition of nanoporous silic</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">135109</a></td><td>128</td><td><A href="#">ALLEN, PETE</a></td><td>7819120</td><td>12/30/03</td><td>Respiratory component mounting</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">120613</a></td><td>134</td><td><A href="#">CARBONELL, </a></td><td>6500273</td><td>2/6/02</td><td>Spin cleaning methods</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">9988142</a></td><td>136</td><td><A href="#">LINDSEY, JO</a></td><td>6407330</td><td>7/21/00</td><td>Solar cells incorporating ligh</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">9988142</a></td><td>136</td><td><A href="#">LINDSEY, JO</a></td><td>6420648</td><td>7/21/00</td><td>Light harvesting arrays</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">9988142</a></td><td>136</td><td><A href="#">LINDSEY, JO</a></td><td>6559374</td><td>5/10/01</td><td>Trans beta substituted chlorin</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">9988142</a></td><td>136</td><td><A href="#">LINDSEY, JO</a></td><td>6596935</td><td>5/8/02</td><td>Solar cells incorporating ligh</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">9988142</a></td><td>136</td><td><A href="#">LINDSEY, JO</a></td><td>6603070</td><td>8/24/01</td><td>Convergent synthesis of multip</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">9988142</a></td><td>136</td><td><A href="#">LINDSEY, JO</a></td><td>7633007</td><td>7/24/07</td><td>Self-assembled photosynthesis-</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">415369</a></td><td>136</td><td><A href="#">SHEINA, ELE</a></td><td>7790979</td><td>9/26/05</td><td>Heteroatomic regioregular poly</td><td><a href="#">More</a></td></tr>
			<tr valign=top class="odd selected"><td><input name=" value=" type="checkbox"></td><td><a href="#">415407</a></td><td>136</td><td><A href="#">MARKS, TOBI</a></td><td>7799990</td><td>3/12/08</td><td>Electron-blocking layer / hole</td><td><a href="#">More</a></td></tr>
			</tbody></table>
		</div></div>
		<div id="tabs-7"><div id = "publications"><p>Coming Soon</p></div></div>
   </div>
   </td>
   <td><div id="prop-selection-summary" class="topic-selection-summary-wrap">

	 <h3>Filter Results</h3>
	 <form id="filter_results">
	 </form>
	 <br /><br />

     <h3>Selection Summary</h3>
       <p>The below reflects a summary of the items you 
         selected on the left.</p>

		<table id="prop-selection-summary-table" class="topic-selection-summary-table">
		  <tr class="heading">
		    <td class="label"><strong>Proposals Selected</strong></td>
		    <td><div class="header-row-wrap"><strong><span id="summary_props">0</span></strong></div></td>
		  </tr>
		  <tr>
		    <td class="label">Date first</td>
		    <td class="value" id="summary_prop_datefirst"></td>
		  </tr>
		  <tr>
		    <td class="label">Date last</td>
		    <td class="value" id="summary_prop_datelast"></td>
		  </tr>
		  <tr>
		    <td class="label">&nbsp;</td>
		    <td>&nbsp;</td>
		  </tr>
		  <tr>
		    <td class="label">Total Selection Request</td>
		    <td class="value" id="summary_prop_funding_total">0</td>
		  </tr>
		  <tr>
		    <td class="label">&nbsp;</td>
		    <td>&nbsp;</td>
		  </tr>
		  <tr>
		    <td class="label">Top Request ($)</td>
		    <td class="value" id="summary_rankedprops_byfunding_1"></td>
		  </tr>
		  <tr>
		    <td class="label">2nd</td>
		    <td class="value" id="summary_rankedprops_byfunding_2"></td>
		  </tr>
		  <tr>
		    <td class="label">3rd</td>
		    <td class="value" id="summary_rankedprops_byfunding_3"></td>
		  </tr>
		  <tr>
		    <td class="label">4th</td>
		    <td class="value" id="summary_rankedprops_byfunding_4"></td>
		  </tr>
		  <tr>
		    <td class="label">&nbsp;</td>
		    <td>&nbsp;</td>
		  </tr>
		  <tr>
		    <td class="label">Smallest Request</td>
		    <td class="value" id="summary_prop_funding_min"></td>
		  </tr>
		  <tr>
		    <td class="label">&nbsp;</td>
		    <td>&nbsp;</td>
		  </tr>
		</table>
	</div>
	<div id="grant-selection-summary" class="topic-selection-summary-wrap">

	     <h3>Selection Summary</h3>
	       <p>The below reflects a summary of the items you 
	         selected on the left.</p>

       <table id="grant-selection-summary-table" class="topic-selection-summary-table">
         <tr class="heading">
           <td class="label"><strong>Grants Selected</strong></td>
           <td><div class="header-row-wrap"><strong><span id="summary_grants">0</span></strong></div></td>
         </tr>
         <tr>
           <td class="label">Date first</td>
           <td class="value" id="summary_datefirst"></td>
         </tr>
         <tr>
           <td class="label">Date last</td>
           <td class="value" id="summary_datelast"></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
         <tr>
           <td class="label">Total Selection Award</td>
           <td class="value" id="summary_funding_total">0</td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
         <tr>
           <td class="label">Top Award ($)</td>
           <td class="value" id="summary_rankedgrants_byfunding_1"></td>
         </tr>
         <tr>
           <td class="label">2nd</td>
           <td class="value" id="summary_rankedgrants_byfunding_2"></td>
         </tr>
         <tr>
           <td class="label">3rd</td>
           <td class="value" id="summary_rankedgrants_byfunding_3"></td>
         </tr>
         <tr>
           <td class="label">4th</td>
           <td class="value" id="summary_rankedgrants_byfunding_4"></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
         <tr>
           <td class="label">Smallest Award</td>
           <td class="value" id="summary_funding_min"></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
       </table>
	</div>
	<div id="pi-selection-summary" class="topic-selection-summary-wrap">

	     <h3>Selection Summary</h3>
	       <p>The below reflects a summary of the items you 
	         selected on the left.</p>

      <table id="pi-selection-summary-table" class="topic-selection-summary-table">
         <tr class="heading">
           <td class="label"><strong>Researchers Selected</strong></td>
           <td><div class="header-row-wrap"><strong><span id="summary_pis">0</span></strong></div></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
         <tr>
           <td class="label" colspan="2"><strong>Total Proposals Submitted by Researcher</strong></td>
         </tr>
         <tr>
           <td class="label">1st</td>
           <td class="value" id="summary_rankedpis_bypropcount_1"></td>
         </tr>
         <tr>
           <td class="label">2nd</td>
           <td class="value" id="summary_rankedpis_bypropcount_2"></td>
         </tr>
         <tr>
           <td class="label">3rd</td>
           <td class="value" id="summary_rankedpis_bypropcount_3"></td>
         </tr>
         <tr>
           <td class="label">4th</td>
           <td class="value" id="summary_rankedpis_bypropcount_4"></td>
         </tr>
         <tr>
           <td class="label">5th</td>
           <td class="value" id="summary_rankedpis_bypropcount_5"></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
         <tr>
           <td class="label" colspan="2"><strong>Proposals Awarded (qty.) by Researcher</strong></td>
         </tr>
         <tr>
           <td class="label">1st</td>
           <td class="value" id="summary_rankedpis_byawardcount_1"></td>
         </tr>
         <tr>
           <td class="label">2nd</td>
           <td class="value" id="summary_rankedpis_byawardcount_2"></td>
         </tr>
         <tr>
           <td class="label">3rd</td>
           <td class="value" id="summary_rankedpis_byawardcount_3"></td>
         </tr>
         <tr>
           <td class="label">4th</td>
           <td class="value" id="summary_rankedpis_byawardcount_4"></td>
         </tr>
         <tr>
           <td class="label">5th</td>
           <td class="value" id="summary_rankedpis_byawardcount_5"></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
         <tr>
           <td class="label" colspan="2"><strong>Proposals Awarded ($) by Researcher</strong></td>
         </tr>
         <tr>
           <td class="label">1st</td>
           <td class="value" id="summary_rankedpis_byawardfunding_1"></td>
         </tr>
         <tr>
           <td class="label">2nd</td>
           <td class="value" id="summary_rankedpis_byawardfunding_2"></td>
         </tr>
         <tr>
           <td class="label">3rd</td>
           <td class="value" id="summary_rankedpis_byawardfunding_3"></td>
         </tr>
         <tr>
           <td class="label">4th</td>
           <td class="value" id="summary_rankedpis_byawardfunding_4"></td>
         </tr>
         <tr>
           <td class="label">5th</td>
           <td class="value" id="summary_rankedpis_byawardfunding_5"></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
         <tr>
           <td class="label" colspan="2"><strong>Avg. Award/Grant by Researcher</strong></td>
         </tr>
         <tr>
           <td class="label">1st</td>
           <td class="value" id="summary_rankedpis_byavgawardfunding_1"></td>
         </tr>
         <tr>
           <td class="label">2nd</td>
           <td class="value" id="summary_rankedpis_byavgawardfunding_2"></td>
         </tr>
         <tr>
           <td class="label">3rd</td>
           <td class="value" id="summary_rankedpis_byavgawardfunding_3"></td>
         </tr>
         <tr>
           <td class="label">4th</td>
           <td class="value" id="summary_rankedpis_byavgawardfunding_4"></td>
         </tr>
         <tr>
           <td class="label">5th</td>
           <td class="value" id="summary_rankedpis_byavgawardfunding_5"></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
       </table>
	</div>
	<div id="org-selection-summary" class="topic-selection-summary-wrap">

	     <h3>Selection Summary</h3>
	       <p>The below reflects a summary of the items you 
	         selected on the left.</p>

       <table id="org-selection-summary-table" class="topic-selection-summary-table">
         <tr class="heading">
           <td class="label"><strong>Institutions Selected</strong></td>
           <td><div class="header-row-wrap"><strong><span id="summary_orgs">0</span></strong></div></td>
         </tr>
         <tr>
           <td class="label">&nbsp;</td>
           <td>&nbsp;</td>
         </tr>
		<tr>
		  <td class="label" colspan="2"><strong>Total Proposals Submitted by Institute</strong></td>
		</tr>
		<tr>
		  <td class="label">1st</td>
		  <td class="value" id="summary_rankedorgs_bypropcount_1"></td>
		</tr>
		<tr>
		  <td class="label">2nd</td>
		  <td class="value" id="summary_rankedorgs_bypropcount_2"></td>
		</tr>
		<tr>
		  <td class="label">3rd</td>
		  <td class="value" id="summary_rankedorgs_bypropcount_3"></td>
		</tr>
		<tr>
		  <td class="label">4th</td>
		  <td class="value" id="summary_rankedorgs_bypropcount_4"></td>
		</tr>
		<tr>
		  <td class="label">5th</td>
		  <td class="value" id="summary_rankedorgs_bypropcount_5"></td>
		</tr>
		<tr>
		  <td class="label">&nbsp;</td>
		  <td>&nbsp;</td>
		</tr>
		<tr>
		  <td class="label" colspan="2"><strong>Proposals Awarded (qty.) by Institute</strong></td>
		</tr>
		<tr>
		  <td class="label">1st</td>
		  <td class="value" id="summary_rankedorgs_byawardcount_1"></td>
		</tr>
		<tr>
		  <td class="label">2nd</td>
		  <td class="value" id="summary_rankedorgs_byawardcount_2"></td>
		</tr>
		<tr>
		  <td class="label">3rd</td>
		  <td class="value" id="summary_rankedorgs_byawardcount_3"></td>
		</tr>
		<tr>
		  <td class="label">4th</td>
		  <td class="value" id="summary_rankedorgs_byawardcount_4"></td>
		</tr>
		<tr>
		  <td class="label">5th</td>
		  <td class="value" id="summary_rankedorgs_byawardcount_5"></td>
		</tr>
		<tr>
		  <td class="label">&nbsp;</td>
		  <td>&nbsp;</td>
		</tr>
		<tr>
		  <td class="label" colspan="2"><strong>Proposals Awarded ($) by Institute</strong></td>
		</tr>
		<tr>
		  <td class="label">1st</td>
		  <td class="value" id="summary_rankedorgs_byawardfunding_1"></td>
		</tr>
		<tr>
		  <td class="label">2nd</td>
		  <td class="value" id="summary_rankedorgs_byawardfunding_2"></td>
		</tr>
		<tr>
		  <td class="label">3rd</td>
		  <td class="value" id="summary_rankedorgs_byawardfunding_3"></td>
		</tr>
		<tr>
		  <td class="label">4th</td>
		  <td class="value" id="summary_rankedorgs_byawardfunding_4"></td>
		</tr>
		<tr>
		  <td class="label">5th</td>
		  <td class="value" id="summary_rankedorgs_byawardfunding_5"></td>
		</tr>
		<tr>
		  <td class="label">&nbsp;</td>
		  <td>&nbsp;</td>
		</tr>
		<tr>
		  <td class="label" colspan="2"><strong>Avg. Award/Grant by Institute</strong></td>
		</tr>
		<tr>
		  <td class="label">1st</td>
		  <td class="value" id="summary_rankedorgs_byavgawardfunding_1"></td>
		</tr>
		<tr>
		  <td class="label">2nd</td>
		  <td class="value" id="summary_rankedorgs_byavgawardfunding_2"></td>
		</tr>
		<tr>
		  <td class="label">3rd</td>
		  <td class="value" id="summary_rankedorgs_byavgawardfunding_3"></td>
		</tr>
		<tr>
		  <td class="label">4th</td>
		  <td class="value" id="summary_rankedorgs_byavgawardfunding_4"></td>
		</tr>
		<tr>
		  <td class="label">5th</td>
		  <td class="value" id="summary_rankedorgs_byavgawardfunding_5"></td>
		</tr>
		<tr>
		  <td class="label">&nbsp;</td>
		  <td>&nbsp;</td>
		</tr>
       </table>
       </div><!-- /topic-selection-summary-wrap -->
     </td>
  </tr>
</table>
	
{* scripts *}
<script>
//Check to see if the data exists or is null 
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

var oTable; //this is the grants table
var mTable; //this is the people table
var iTable; //this is the institutions table
var tTable; //this is the topics table
function renderJSON(query, tab) 
{
	if (tab == null)
		tab = "grant";
	query = query.substr(0, query.length-1);

	if(tab == "topics_tab"){
		$.getJSON(apiurl+'topic?' + query + '&summ=full&jsoncallback=?', function(data){
			createTable(tab, data);		
		});
	}
	// example: topic?year=2010-2010&t1=341,123&summ=full
	else if (tab == "divs"){
		//alert(apiurl+'topic?' + query + '&summ=full&jsoncallback=?')
	}
	else{
//console.log(query);
//console.log(tab);	
		//do some checking here for tab
		if (tab=="prop") var page = "grant";
		else var page = tab;		
		$.getJSON(apiurl+'topic?' + query + '&page=' + page + '&jsoncallback=?', function(data) {
			createTable(tab, data);		
		});
	}
}

function createTable(tab, data)
{
	if (data["Error"] != undefined){
		validateMsg(data["Error"]);
		$("#loader").hide();
	}
	else {
		if (tab == "prop") {
			{* BEGIN PROPOSALS TABLE *}
			{* Render Proposal DataTable *}
			$("#props").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable_props'></table>");

			aaData = _.map(data["data"], function(v) { 
				return [
					v["proposal"]["nsf_id"],
					v["request"]["dollar"],
					v["request"]["date"],
					v["pge"]["code"], 
					v["org"]["name"],
					v["topic"]["id"].join(", "), 
					//v["status"]["name"],
				]; 
			});

			oTable = $('#props table').dataTable({
				//TableTools - copy, csv, print, pdf
				"bJQueryUI": true,
				"sPaginationType": "full_numbers",
				//"sDom": 'T<"clear">lfrtip',
				"sDom": 'T<"clear"><"H"lfr>t<"F"ip>',
				"bDestroy": true,
				"bProcessing": true,
				"iDisplayLength": 50,
				"aoColumnDefs": [
					{
						"fnRender": function ( oObj ) {
							return '<a href="https://www.ejacket.nsf.gov/ej/showProposal.do?optimize=Y&ID='+oObj.aData[0]+'&docid='+oObj.aData[0]+'" title="Open in e-Jacket" target="_blank">'+oObj.aData[0]+'</a>'; //'<input type="checkbox" name="grant[]" value="'+oObj.aData[0]+'"> '+oObj.aData[0];
						},
						"bUseRendered": false,
						"sTitle": "Prop ID",
						"aTargets": [ 0 ]
					},
					{ 
						"fnRender": function ( oObj ) {
							return addCommas(oObj.aData[1]);
							//return '<span class="funding" id="funding_'+oObj.aData[0]+'">'+addCommas(oObj.aData[1])+'</span>';
						},
						"bUseRendered": false,
						"sTitle": "Requested Amount",
						"aTargets": [ 1 ]
					},
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<span class="date" id="date_'+oObj.aData[0]+'">'+oObj.aData[2]+'</span>';
						//},
						//"bUseRendered": false,
						"sTitle": "Request Date",
						"aTargets": [ 2 ] 
					}, 
					{ "sTitle": "Prg. Elem. Code", "aTargets": [ 3 ] }, 
					{ "sTitle": "Division", "aTargets": [ 4 ] }, 
					{ "sTitle": "Topics", "aTargets": [ 5 ] }
					//{ "sTitle": "Status", "aTargets": [ 6 ] } - ADD COMMA ABOVE IF UNCOMMENTING THIS
				],
				"aaData": aaData,
				"aaSorting": [[2, 'desc'], [0, 'desc']],
				"oLanguage": {
					"sLengthMenu:": "Display _MENU_ records per page",
					"sSearch": "Keyword Filter:"
				}
			});
			{* END PROPOSALS SECTION *}
		} else if (tab == "grant") {
			{* BEGIN GRANTS TABLE *}
			{* Render Grant DataTable *}
			$("#grants").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable_grants'></table>");

			aaData = _.map(data["data"], function(v) { 
				return [
					v["proposal"]["nsf_id"],
					v["awarded"]["dollar"],
					v["awarded"]["date"],
					keyExists("request.date", v, null),
					v["pge"]["code"], 
					v["org"]["name"],
					v["topic"]["id"].join(", "), 
					v["proposal"]["title"],
				]; 
			});

			oTable = $('#grants table').dataTable({
				//TableTools - copy, csv, print, pdf
				"bJQueryUI": true,
				"sPaginationType": "full_numbers",
				//"sDom": 'T<"clear">lfrtip',
				"sDom": 'T<"clear"><"H"lfr>t<"F"ip>',
				"bDestroy": true,
				"bProcessing": true,
				"iDisplayLength": 50,
				"aoColumnDefs": [
					{
						"fnRender": function ( oObj ) {
							return '<a href="https://www.ejacket.nsf.gov/ej/showProposal.do?optimize=Y&ID='+oObj.aData[0]+'&docid='+oObj.aData[0]+'" title="Open in e-Jacket" target="_blank">'+oObj.aData[0]+'</a>'; //'<input type="checkbox" name="grant[]" value="'+oObj.aData[0]+'"> '+oObj.aData[0];
						},
						"bUseRendered": false,
						"sTitle": "Prop ID",
						"aTargets": [ 0 ]
					},
					{ 
						"fnRender": function ( oObj ) {
							return addCommas(oObj.aData[1]);
							//return '<span class="funding" id="funding_'+oObj.aData[0]+'">'+addCommas(oObj.aData[1])+'</span>';
						},
						"bUseRendered": false,
						"sTitle": "Awarded Amount",
						"aTargets": [ 1 ]
					},
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<span class="date" id="date_'+oObj.aData[0]+'">'+oObj.aData[2]+'</span>';
						//},
						//"bUseRendered": false,
						"sTitle": "Award Date",
						"aTargets": [ 2 ] 
					}, 
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<span class="date" id="date_'+oObj.aData[0]+'">'+oObj.aData[2]+'</span>';
						//},
						//"bUseRendered": false,
						"sTitle": "Request Date",
						"aTargets": [ 3 ] 
					}, 
					{ "sTitle": "Prg. Elem. Code", "aTargets": [ 4 ] }, 
					{ "sTitle": "Division", "aTargets": [ 5 ] }, 
					{ "sTitle": "Topics", "aTargets": [ 6 ] },
					{ 
						"fnRender": function ( oObj ) {
							return '<a class="details" title="'+oObj.aData[7]+'">Show</a>';
						},
						"bSortable": false,						
						"sTitle": "Details",
						"aTargets": [ 7 ]
					}
				],
				"aaData": aaData,
				"aaSorting": [[1, 'desc']], //, [0, 'desc']
				"oLanguage": {
					"sLengthMenu:": "Display _MENU_ records per page",
					"sSearch": "Keyword Filter:"
				}
			});
			{* END GRANTS SECTION *}
		} else if (tab == "pi") {			
			{* BEGIN PI SECTION *}
			/* Render PI DataTable - add in more detail for each PI*/
			$("#pi").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable_pi'></table>");
			


			//data["data"] = $.grep(data["data"], function(v) { return (v.inst != null); }); //removes the double not available
			aaData = _.map(data["data"], function(v) { 
				return [
					v["nsf_id"], 
					keyExists("name", v, "Not Available"), 
					keyExists("inst.name", v, "Not Available"),
					keyExists("inst.dept", v, "Not Available"),
					v["count"],
					v["prop"].join(", "),
					'Show',
				]; 
			});

			mTable = $('#pi table').dataTable({
				//TableTools - copy, csv, print, pdf
				"bJQueryUI": true,
				"sPaginationType": "full_numbers",					
				//"sDom": 'T<"clear">lfrtip',
				"sDom": 'T<"clear"><"H"lfr>t<"F"ip>',
				//"bDestroy": true,
				"bProcessing": true,

				"iDisplayLength": 50,
				"aoColumnDefs": [
					{
						//"fnRender": function ( oObj ) {
						//	return '<input type="checkbox" name="pi[]" value="'+oObj.aData[0]+'"> '+oObj.aData[0];
						//},
						//"bUseRendered": false,
						"sTitle": "PI ID",
						"aTargets": [ 0 ]
					},
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<span id="pi_name_'+oObj.aData[0]+'">'+oObj.aData[1]+'</span>';
						//},
						//"bUseRendered": false,
						"sTitle": "Name", 
						"aTargets": [ 1 ] 
					}, 
					{ "sTitle": "Institution", "aTargets": [ 2 ] }, 
					{ "sTitle": "Department", "aTargets": [ 3 ] },  
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<span id="pi_propcount_'+oObj.aData[0]+'">'+oObj.aData[4]+'</span>';
						//},
						//"bUseRendered": false,
						"sTitle": "Number of Grants", 
						"aTargets": [ 4 ] 
					},  
					{ 
						"fnRender": function ( oObj ) {
							//wrap each prop id in a link
							var formatted = [];
							if (oObj.aData[5]) {
								var tmp = oObj.aData[5].split(',');
								for (var i in tmp) formatted.push('<a href="https://www.ejacket.nsf.gov/ej/showProposal.do?optimize=Y&ID='+tmp[i]+'&docid='+tmp[i]+'" title="Open in e-Jacket" target="_blank">'+tmp[i]+'</a>');
									
							}
							return formatted.join(',');
						},
						"bUseRendered": false,
						"sTitle": "Grants IDs", 
						"aTargets": [ 5 ] 
					},
					{ 
						"fnRender": function ( oObj ) {
							return '<a class="pi_details" title="'+oObj.aData[6]+'">Show</a>';
						},
						"bSearchable": false,
						"bSortable": false,						
						"sTitle": "Details",
						"aTargets": [ 6 ]
					}
				],
				"aaData": aaData,
				"aaSorting": [[4, 'desc']],
				"oLanguage": {
					"sLengthMenu:": "Display _MENU_ records per page",
					"sSearch": "Keyword Filter:"
				}
				//"sDom": 'T<"clear">lfrtip',
			});
			 {* END OF PI SECTION *}
		}  else if (tab == "org") {			
			{* BEGIN INSTITUTIONS SECTION *}
			/* Render institutions DataTable */
			$("#org").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable_org'></table>");
			//data["data"] = $.grep(data["data"], function(v) { return (v.inst != null); }); //removes the double not available
			aaData = _.map(data["data"], function(v) { 
				return [
					keyExists("nsf_id", v, "Not Available"), 
					keyExists("name", v, "Not Available"),
					v["count"],
					v["pi"].length,
					v["prop"],
					'Show',
				]; 
			});


			iTable = $('#org table').dataTable({
				"bJQueryUI": true,
				"sPaginationType": "full_numbers",
				//"sDom": 'T<"clear">lfrtip',
				"sDom": 'T<"clear"><"H"lfr>t<"F"ip>',
				"bDestroy": true,
				"bProcessing": true,

				"iDisplayLength": 50,
				"aoColumnDefs": [
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<input type="checkbox" name="org[]" value="'+oObj.aData[0]+'"> '+oObj.aData[0];
						//},
						//"bUseRendered": false,
						"sTitle": "Institution ID",
						"aTargets": [ 0 ]
					},
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<span id="org_name_'+oObj.aData[0]+'">'+oObj.aData[1]+'</span>';
						//},
						//"bUseRendered": false,
						"sTitle": "Name", 
						"aTargets": [ 1 ] 
					}, 
					{ 
						//"fnRender": function ( oObj ) {
						//	return '<span id="org_propcount_'+oObj.aData[0]+'">'+oObj.aData[2]+'</span>';
						//},
						//"bUseRendered": false,						
						"sTitle": "Number of Proposals", 
						"aTargets": [ 2 ] 
					}, 
					{ "sTitle": "Number of PIs", "aTargets": [ 3 ] },
					{ 
						"fnRender": function ( oObj ) {
							//wrap each prop id in a link
							var formatted = [];
							if (oObj.aData[4]) {
								for (var i in oObj.aData[4]) formatted.push('<a href="https://www.ejacket.nsf.gov/ej/showProposal.do?optimize=Y&ID='+oObj.aData[4][i]+'&docid='+oObj.aData[4][i]+'" title="Open in e-Jacket" target="_blank">'+oObj.aData[4][i]+'</a>');
									
							}
							return formatted.join(',');
						},
						"bUseRendered": false,
						"bVisible": false, 
						"sTitle": "Grant IDs", 
						"aTargets": [ 4 ] 
					},
					{ 
						"fnRender": function ( oObj ) {
							return '<a class="org_details" title="'+oObj.aData[5]+'">Show</a>';
						},
						"bSearchable": false,
						"bSortable": false,						
						"sTitle": "Details",
						"aTargets": [ 5 ]
					}					
				],
				"aaData": aaData,
				"aaSorting": [[2, 'desc']]
			});
			 {* END OF INSTITUTIONS SECTION *}
		} else if (tab == "topics_tab"){
			$("#topics_tab").html("<table class='display' cellpadding='0' cellspacing='0' border='0' id='dtable_topics'></table>");
			// API change needed: display topic text for summ when t1 is specified
			aaData = _.map(data["data"], function(v) { 
				return [
					keyExists("t1", v, "Not Available"), 
					keyExists("words", v, "Not Available"),
					keyExists("count", v, "Not Available")
				]; 
			});

			tTable = $('#topics_tab table').dataTable({
				//TableTools - copy, csv, print, pdf
				"bJQueryUI": true,
				"sPaginationType": "full_numbers",
				//"sDom": '<"clear">lfrtip',
				"sDom": 'T<"clear"><"H"lfr>t<"F"ip>',
				"bDestroy": true,
				"bProcessing": true,
				"iDisplayLength": 50,
				"aoColumnDefs": [
					{ "sWidth": "15%", "sTitle": "Topic ID", "aTargets": [ 0 ] },
					{ "sWidth": "70%", "sTitle": "Topic Description", "aTargets": [ 1 ] }, 
					{ "sWidth": "15%", "sTitle": "Total Grants", "aTargets": [ 2 ] }
				],
				"aaData": aaData,
				"aaSorting": [[2, 'desc']],
				"oLanguage": {
					"sLengthMenu:": "Display _MENU_ records per page",
					"sSearch": "Keyword Filter:"
				}
			});
		}
		//now show hide the appropriate summaries
		$('div[id$="-selection-summary"]').hide();
//console.log('id="'+tab+'-selection-summary-table"');		
		$('div[id="'+tab+'-selection-summary"]').show();
	}
	$("#loader").hide();
}
</script>	


