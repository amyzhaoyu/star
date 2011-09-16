	<div id="footer"></div>

	<script src="js/libs/modernizr-1.7.min.js"></script>
	<script>!window.jQuery && document.write(unescape('%3Cscript src="js/libs/jquery-1.5.1.min.js"%3E%3C/script%3E'))</script>
	<script src="http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"></script>
	<script src="js/plugins.js"></script>
	<script src="js/script.js"></script>
	<script src="js/star.js"></script>
	<script src="js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script src="js/tabletools/media/js/TableTools.min.js"></script>
	<script src="js/tabletools/media/js/ZeroClipboard.js"></script>
	<script src="js/underscore.js"></script>
	<script src="js/jquery-ui/jquery-ui-1.8.14.custom.min.js"></script>
	<script src="js/jquery.tools.min.js"></script>
	<script src="js/jquery.sparkline.min.js"></script>
	<script src="js/jquery.qtip-1.0.0-rc3.min.js"></script>
	<script src="js/funcs.js"></script>
	<script src="js/functions.js"></script>

	{* TEMPLATES *}

	<script>
	var selTab = "grant";
	var query_nsfDiv = "CHE";
	var query_yearFrom = 2010;
	var query_yearTo = 2010;
	var query_topics = "";
	var query_primtopic = true;
	
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
	var proposalaccessallowed = true; //set to false for outside the network
	var apiurl = "http://128.150.10.70/py/api.py/"; //set to http://readidata.nitrd.gov/star/py/api.py/ for outside the network
	
	$.fn.serializeObject = function()
	{
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
		});
		return o;
	};
	</script>
	
</body>
</html>
