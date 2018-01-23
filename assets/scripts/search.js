console.log("linked");

var city = $("#search");

 var upcoming = `http://api.songkick.com/api/3.0/metro_areas/{metro_area_id}/calendar.json?apikey={your_api_key}`

city.text("Hello");

var citySearch = `http://api.songkick.com/api/3.0/search/locations.json?query=${city}&apikey=awz1NrZkcMbHwia9`;
var eventSearch = `http://api.songkick.com/api/3.0/events.json?apikey=awz1NrZkcMbHwia9`;
$.ajax({
    url: eventSearch,
    method: "GET"
  }).done(function(response) {

  	console.log(response);

  });