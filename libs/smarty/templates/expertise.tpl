{include file="header_test.tpl"}

	<div style="height: 10px"></div>
	<div id="header">
		<div class="menu mainNav horizontal green">
			<ul>
				<li><span class="menu_r"><a href="home.html"><span class="menu_ar">Home</span></a></span></li>
				<li><span class="menu_r"><a href="index_test.php"><span class="menu_ar">Portfolio Viewer</span></a></span></li>
				<li class="highlight"><span class="menu_r"><a href="expertise.php"><span class="menu_ar">Expertise Locator</span></a></span></li>
				<li><span class="menu_r"><a href="#"><span class="menu_ar">People Locator</span></a></span></li>
				<li><span class="menu_r"><a href="http://rd-dashboard.nitrd.gov/investment.html" target="_blank"><span class="menu_ar">Institutions</span></a></span></li>
			</ul>
		</div>
	</div>
	<div id="container">
		<div id="main" role="main">
			<div class="grid_16 alpha omega">
				{include file="expertise_form.tpl"}
			</div>
			<div class="clear"></div>
		
			<div id="queryresults" style="display: none;" class="grid_16 alpha omega">
				{include file="expertise_results.tpl"}
			</div>
			<div class="clear"></div>
		</div>
		


		{* End of JQuery UI tabs *}

	</div>

{include file="footer-expertise.tpl"}

