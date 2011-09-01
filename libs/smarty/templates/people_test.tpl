{include file="header_test.tpl"}
	<div style="height: 10px"></div>
	<div id="header">
		{include file="mainnav.tpl"}
	</div>
	<div id="container">
		<div id="main" role="main">
			<div class="grid_16 alpha omega">
				{include file="people_leftside_test.tpl"}
			</div>
			<div class="clear"></div>
		
			<div id="queryresults" style="display: none;" class="grid_16 alpha omega">
				{include file="people_main_test.tpl"}
			</div>
			<div class="clear"></div>
		</div>
		


		{* End of JQuery UI tabs *}

	</div>

{include file="footer_test.tpl"}
