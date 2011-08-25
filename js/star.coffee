###
Creating a js library for the NSF data API

Function 1: Testing out coffee - a simple function to eat lunch


lunch = ["grapes", "banana", "sandwich"]
eat = (x) -> alert(x)
amy = () ->
	eat food for food in lunch
	$(".wrapper").html "RON"


Reusable functions for the API front-end
###

# TODO: Define input variables
# Export button to csv
# Create and render output table
# Data drill-down

# 

# Here is one to render the proposal data

renderProp = (q, me) ->
	$.getJSON 'py/api.py/prop?' + q, (data) ->
		$("#div_"+me+" div").html $("#propRender").tmpl data["data"]
		$("#div_"+me).slideDown()

###
using the jQuery ready handler


$ -> 
	amy
	renderIt "fabrication"
###


