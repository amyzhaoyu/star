<?php /* Smarty version Smarty-3.0.8, created on 2011-07-06 11:17:25
         compiled from "libs/smarty/templates/people.tpl" */ ?>
<?php /*%%SmartyHeaderCode:9566100844e147c852220a4-49304272%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'd0ada542da285280afcc3c81081bb150efa2a8b6' => 
    array (
      0 => 'libs/smarty/templates/people.tpl',
      1 => 1309879933,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '9566100844e147c852220a4-49304272',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	
	<title></title>
	<meta name="description" content="">
	<meta name="author" content="">
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="shortcut icon" href="/favicon.ico">
	<link rel="apple-touch-icon" href="/apple-touch-icon.png">
	<link rel="stylesheet" href="css/style.css?v=2">
	<link rel="stylesheet" href="css/960.css">
	<link rel="stylesheet" href="css/style_sass.css">

	<script src="js/libs/modernizr-1.7.min.js"></script>
</head>
<body>
	<div id="header">
		<div class="wrapper">
			Explorer
		</div>
	</div>
	<div id="container">
		<div id="main" role="main">
			<table id="output">
			</table>
		</div>

		<footer>
		</footer>
	</div>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
	<script>!window.jQuery && document.write(unescape('%3Cscript src="js/libs/jquery-1.5.1.min.js"%3E%3C/script%3E'))</script>
	<script src="js/plugins.js"></script>
	<script src="js/script.js"></script>
	<!--[if lt IE 7 ]>
	<script src="js/libs/dd_belatedpng.js"></script>
	<script> DD_belatedPNG.fix('img, .png_bg');</script>
	<![endif]-->
	<script>
		var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']]; // Change UA-XXXXX-X to be your site's ID
		(function(d,t) { var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
		g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
		s.parentNode.insertBefore(g,s) } (document,'script'));
	</script>
	<script>
	$(document).ready(function() {
		$.getJSON('py/api.py/prop?page=search&q=<?php echo $_GET['q'];?>
', function(data) {
			$(data["data"]).each(function(index) {
				$("#output").append("<p>"+this["title"]+" (<a href='py/api.py/prop?id="+this["nsf_id"]+"'>"+this["nsf_id"]+"</a>)</p>");
			});
		});
	});		
	</script>
</body>
</html>
