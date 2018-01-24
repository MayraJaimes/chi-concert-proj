//API VenueSearch is by id, not name or other parameters.
var venueID = {"521":"", "837":"",
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
};
var receivedID = 0;
var apiKey = config.MY_KEY;
// function to call api and store parameters for homepage.
function populate(id) {
  $.ajax({
    url: `http://api.songkick.com/api/3.0/venues/${id}.json?apikey=${apiKey}`,
    method: "GET"
  }).done(function(response) {
  	//assign varibales to correspond to api results
  	results = response.resultsPage.results.venue;
  	receivedID++;
  	// set new object to next available spot in venue
	venueID[id] = new Venue(name, address, website, uri, id);
	venueID[id].name = results.displayName;
	venueID[id].address = results.street;
	venueID[id].website = results.website;
	venueID[id].uri = results.uri;
	venueID[id].id = results.id;
	venueID[id].directions = `https://www.google.com/maps/place/${results.street}`;

	if(receivedID >= Object.keys(venueID).length){
		addVenues();
		updateDropdown();
	}
  });
}
// using each key loop through venueID
for (property in venueID){
	populate(property);
};
function addVenues() {
	//iterate over the length of venues and add html into every venue
	// also creates ids that correspond to array location
	let newVenueDiv = '';
	for (venue in venueID){
		var event = venueID[venue];		
		newVenueDiv += `<div class="col-xs-12 col-sm-6 col-md-4"><div class="card">
		 <a href="venues.html?venue=${event.id}&imgsrc=${event.id}"> <div class="card-img-top homepageIMG" style="background-image: url(assets/images/${event.id}.jpg)"></div></a>
		  <div class="card-body">
		    <h5 class="card-title venueName">${event.name}</h5>
		    <hr class="venueLine">
		    <a href="${event.directions}" class="btn btn-primary directionsButton btn-lg btn-block" target="_blank">Directions</a>
		    <a href="venues.html?venue=${event.id}&imgsrc=${event.id}" class="btn btn-primary venueButton btn-lg btn-block">Check Concerts</a>
		  </div>
		</div></div>`;
		//append new containers to .top(large html container)
	};
	$(".top").html(newVenueDiv);

	}

function updateDropdown(){
			let newDropdown = '';	
		for (venue in venueID){
			var dEvent = venueID[venue];
			newDropdown += `<a class="dropdown-item" href="venues.html?venue=${dEvent.id}
								&imgsrc=${dEvent.id}">${dEvent.name}</a>`
		};
		$(".dropdown-item").append(newDropdown);

};


