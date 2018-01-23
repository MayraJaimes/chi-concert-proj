//API VenueSearch is by id, not name or other parameters.
var venueIDs = {"521":"", "837":"",
			 	"1070":"", "1284":"", "621":"", "1021":"", "17091":"", "533":"", 
				"259":"", "2176":"", "540136":"", "251":"", "361":"", "513326":"",
				 "6540":"", "1406":"", "32409":"", "2887023":""};
//set variables for large scope
var results;
var name; 
var address;
var website;
var id;
var uri;
// constructor object for new venues
function Venue(name, address, website, id)
{
	this.name = name;
	this.address = address;
	this.website = website;
	this.id = id;
	//addd new properties here
}
var city = "chicago";
var citySearch = `http://api.songkick.com/api/3.0/search/locations.json?query=${city}&apikey=awz1NrZkcMbHwia9`;
var eventSearch = `http://api.songkick.com/api/3.0/events.json?apikey=awz1NrZkcMbHwia9`;
$.ajax({
    url: eventSearch,
    method: "GET"
  }).done(function(response) {

  	console.log(response);

  });
//   };
// var receivedIDs = 0;
// // function to call api and store parameters for homepage.
// function getVenue(id) {
//   $.ajax({
//     url: `http://api.songkick.com/api/3.0/venues/${id}.json?apikey=awz1NrZkcMbHwia9`,
//     method: "GET"
//   }).done(function(response) {
//   	//assign varibales to correspond to api results
//   	results = response.resultsPage.results.venue;
//   	receivedIDs++;
//   	/*name = results.displayName;
//   	address = results.street;
//   	website = results.website;
//   	uri = results.uri;
//   	id = results.id;*/
//   	// set new object to next available spot in venue
// 	venueIDs[id] = new Venue(name, address, website, uri, id);
// 	venueIDs[id].name = results.displayName;
// 	venueIDs[id].address = results.street;
// 	venueIDs[id].website = results.website;
// 	venueIDs[id].uri = results.uri;
// 	venueIDs[id].id = results.id;
// 	venueIDs[id].directions = `https://www.google.com/maps/place/${results.street}`;
// // need to get number of keys to 
// 	if(receivedIDs >= 18){
// 		for(var venue in venueIDs){

// 		console.log(venueIDs[venue].name);
// 		console.log(venueIDs[venue].address);
// 		console.log(venueIDs[venue].website);
// 		console.log(venueIDs[venue].name);

// 		// console.log(venueIDs[venue]["address"]);
// }
// 	}else{
// 		console.log(receivedIDs, 18)
// 	}

//   });
 
// }

// for (property in venueIDs){
// 	getVenue(property);
// }
// //run a for loop to get all the ID venues into an array.
//   //  	for ( var venue in venueIDs) {
// 		// console.log(venue);
//  	// }
	
// //  console.log(venueObjects);
// // console.log(venueObjects.length);


// 	//iterate over the length of venues and add html into every venue
// 	// also creates ids that correspond to array location
// 	/*let newVenueDiv = ''
// 	for (var i = 0; i < venueObjects.length; i++) {
// 		var event = venueObjects[i];
// 		newVenueDiv += `<div class="col-xs-12 col-sm-6 col-md-4"><div class="card">
// 		  <div class="card-img-top" style="background-image: url(assets/images/${event.id}.jpg)"></div>
// 		  <div class="card-body">
// 		    <h5 class="card-title">${event.name}</h5>
// 		    <p class="card-text"><a href="${event.address}" target="_blank">Directions</a></p>
// 		    <a href="venues.html?venue=${event.id}&imgsrc=${event.id}" class="btn btn-primary">Check Concerts</a>
// 		  </div>
// 		</div></div>`;
// 		//append new containers to .top(large html container)
// 	};
// 	$(".top").html(newVenueDiv);
// */