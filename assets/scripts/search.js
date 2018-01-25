console.log("linked");

var city = $("#search").text();

 var upcoming = `http://api.songkick.com/api/3.0/metro_areas/{metro_area_id}/calendar.json?apikey={your_api_key}`

city ="aragon";

var citySearch = `http://api.songkick.com/api/3.0/search/venues.json?query=${city}&apikey=awz1NrZkcMbHwia9`;
var eventSearch = `http://api.songkick.com/api/3.0/events.json?apikey=awz1NrZkcMbHwia9`;
$.ajax({
    url: citySearch,
    method: "GET"
  }).done(function(response) {

  	console.log(response);

  });

