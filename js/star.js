/*
Creating a js library for the NSF data API

Function 1: Testing out coffee - a simple function to eat lunch


lunch = ["grapes", "banana", "sandwich"]
eat = (x) -> alert(x)
amy = () ->
	eat food for food in lunch
	$(".wrapper").html "RON"


Reusable functions for the API front-end
*/var renderProp;
renderProp = function(q, me) {
  return $.getJSON('py/api.py/prop?' + q, function(data) {
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