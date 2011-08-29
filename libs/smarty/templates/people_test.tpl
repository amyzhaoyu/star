{include file="header_test.tpl"}
	<div style="height: 10px"></div>
	<div id="header">
        <div class="globalnav">
            <ul>
		<li class="active"><a href="/star/index_test.php" title="Query & Download Portfolio Data">Portfolios</a></li>
		<li><a href="#" title="Topic Analysis & Exploration">Topics</a></li>
		<li><a href="#" title="Find Reviewer Tool">Expertise Locator</a></li>
		<li><a href="#" title="Frequently Asked Questions">FAQs</a></li>
	    </ul>    
        </div></div>
	<div id="container">
		<div id="main" role="main" style="padding: 5px 0px;">
			<div class="grid_16 alpha omega">
				{include file="people_leftside_test.tpl"}
			</div>
			<div class="clear"></div>
		
			<div class="grid_16 alpha omega">
				{include file="people_main_test.tpl"}
			</div>
			<div class="clear"></div>
		</div>
		


		{* End of JQuery UI tabs *}

	</div>

{include file="footer_test.tpl"}
