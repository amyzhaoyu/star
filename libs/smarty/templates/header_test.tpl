<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	
	<title>{$title|default:"Star Metrics"}</title>
	<meta name="description" content="">
	<meta name="author" content="">
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	

	<link rel="stylesheet" href="css/style.css?v=2">
	<link rel="stylesheet" href="css/960.css">
	<link rel="stylesheet" href="css/style_sass.css">
	<link rel="stylesheet" href="js/jquery-ui/smoothness/jquery-ui-1.8.14.custom.css" rel="stylesheet" />	
	<link rel="stylesheet" href="css/starMetrics-css.css" rel="stylesheet" />	
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>

	<script>

	/* 	var proposalaccessallowed = false;
		var apiurl = "http://readidata.nitrd.gov/py/api.py/";
		//initialize the access status and api url
		$.ajax({
			async: false,
	        url: 'http://readidata.nitrd.gov/star/fetch.html?jsonpcallback=?',
	        success: function(data) {
	console.log(data);	
	  //          var proposalaccessallowed = true;
	//			var apiurl = "http://128.150.10.70/py/api.py/";
	        }
	    });
	*/
	
	//initialize the access status and api url
	//inside the network
	var proposalaccessallowed = true;
	var apiurl = "http://128.150.10.70/py/api.py/";
	//outside the network
	//var proposalaccessallowed = false;
	//var apiurl = "http://readidata.nitrd.gov/star/py/api.py/";
	
	</script>

<!--        <div class="globalnav">
            <ul>
		<li class="active"><a href="/star/portfolio_viewer.php" title="Query & Download Data">Queries</a></li>
		<li><a href="#" title="Topic Analysis & Exploration">Topics</a></li>
		<li><a href="#" title="Data Visualization">Visuals</a></li>
		<li><a href="#" title="API Documentation">API</a></li>
		<li><a href="#" title="Frequently Asked Questions">FAQs</a></li>
		<li><a href="#" title="Contact Us">Contact Us</a></li>
	    </ul>    
        </div> -->

</head>
<body>

