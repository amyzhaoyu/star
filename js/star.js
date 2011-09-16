/*
Creating a js library for the NSF data API

Function 1: Testing out coffee - a simple function to eat lunch


lunch = ["grapes", "banana", "sandwich"]
eat = (x) -> alert(x)
amy = () ->
	eat food for food in lunch
	$(".wrapper").html "RON"


Reusable functions for the API front-end
*/
var renderProp;
renderProp = function(q, me) {
  return $.getJSON(apiurl+'prop?' + q + '&jsoncallback=?', function(data) {
    $("#div_" + me + " div").html($("#propRender").tmpl(data["data"]));
    return $("#div_" + me).slideDown();
  });
};
/*
using the jQuery ready handler

$ ->
	amy
	renderIt "fabrication"
*/

//adding commas to a number to format it
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

//convert a formatted number string back to a pure number
function removeNumberFormatting(rawstring) {
	return rawstring.replace(/[^\d\.\-\ ]/g, '');	
}