var name;
var address;
var website;
var id;

// const venues = [
// 	{
// 		name: "United Center",
// 		address: "1901 W Madison St, Chicago, IL 60612",
// 		website: "https:www.unitedcenter.com",
// 		id: ""
// 	},
// 	{
// 		name: "Chicago Theater",
// 		address: ""
// 	},
// ];

// constructor object for new venues
function Venue(name, address, website, id)
{
	this.name = name;
	this.address = address;
	this.website = website;
	this.id = id;
	//addd new properties here
}

var directions = "https://www.google.com/maps/place/";

var uc = new Venue("United Center", 
	directions+"United+Center", 
	"http://www.unitedcenter.com", 
	"521");

var aragon = new Venue("Aragon Ballroom",
	directions+"Aragon+Ballroom",
	"http://www.thearagonballroom.com", 
	"837"); 

var metro = new  Venue("Metro",
	directions+"Metro",
	"http://metrochicago.com",
	"1070" ); 

var rivieraTheatre = new  Venue("Riviera Theatre",
	directions+"Riviera+Theatre",
	"http://rivieratheatre.com",
	"1284" );

var hob = new Venue("House of Blues", 
	directions+"House+of+Blues",
	"http://houseofblues.com/chicago",
	"621" ); 

var chicagoTheater = new Venue("Chicago Theatre", 
	directions+"The+Chicago+Theatre+175 N State St, Chicago, IL 60601", 
	"http://www.msg.com/the-chicago-theatre", 
	"1021" );

// added more venues
var bottomLounge = new Venue("Bottom Lounge",
	directions+"Bottom+Lounge",
	"http://bottomlounge.com",
	"17091" );

var tinleyPark = new Venue("Hollywood Casino Amphitheatre",
	directions+"Hollywood+Casion+Amphitheatre",
	"http://www.tinleyparkamphitheater.com/",
	"533");

var hideout = new Venue("Hideout Chicago",
	directions+"Hideout+Chicago",
	"http//www.hideoutchicago.com/",
	"259");

var greenMill = new Venue("Green Mill Cocktail Lounge",
	directions+"Green+Mill+Cocktail+Lounge",
	"http://greenmilljazz.com/",
	"1153196");

var schubas = new Venue("Schubas Tavern",
	directions+"Schubas+Tavern",
	"http://www.lh-st.com/",
	"2133");

var buddyGuys = new Venue("Buddy Guy's Legends",
	directions+"Buddy+Guys+Legends",
	"http://buddyguy.com/",
	"2176");

var reggies = new Venue("Reggies Rock Club",
	directions+"Reggies+ 2109 S State St, Chicago, IL 60616",
	"http://www.reggieslive.com",
	"540136");

var emptyBottle = new Venue("The Empty Bottle",
	directions+"The+Empty+Bottle",
	"http://emptybottle.com/",
	"251");

var oldTown = new Venue("Old Town School of Folk Music",
	directions+"Old+Town+school+of+Folk+Music",
	"http://www.oldtownschool.org/",
	"361");

var lincolnHall = new Venue("Lincoln Hall",
	directions+"Lincoln+Hall",
	"http://www.lh-st.com/",
	"513326");

var doubleDoor = new Venue("Double Door",
	directions+"Double+Door",
	"http://doubledoor.com/",
	"6540");

var parkWest = new Venue("Park West",
	directions+"Park+West",
	"http://www.parkwestchicago.com/",
	"1406");

var vic = new Venue("Vic Theatre",
	directions+"Vic+Theatre",
	"http://www.victheatre.com/",
	"32409");

var milleniumPark = new Venue("Pritzker Pavillion",
	directions+"Pritzker+Pavillion",
	"http://www.grantparkmusicfestival.com/the-music/2018season",
	"2887023");

//  new venues go here;

// add new venue object names to the end of venueArray
var venueArray = [uc, aragon, metro, rivieraTheatre, hob, chicagoTheater, bottomLounge, tinleyPark, 
					hideout, buddyGuys, reggies, emptyBottle, oldTown, lincolnHall, doubleDoor,
					parkWest, vic, milleniumPark
					];
//add new venue object properties to the end of attrArray
var attrArray = [name, address, website, id];
//array for selectors generated in getSelectors function.
var selectArray = [];
//function to get selector names from length of venue array
function getSelectors() {
	for (var i = 0; i < attrArray.length; i++) {
		
		var name = "$('"+"#" + "name"+[i] + "')";	
		var address ="$('"+"#" + "address"+[i] + "')";
		var website = "$('"+"#" + "website"+[i] + "')";
		// var image = "$('" + "#" + "image"+[i] + "')";
		
		selectArray.push(name);
		selectArray.push(address);
		selectArray.push(website);
		// selectArray.push(image);
		//console to see function returns;
		// console.log(name);
		// console.log(selectArray);
	}

}
//run function to add any new selectors to the selectArray
getSelectors();

function addInfo() {
	//iterate over the length of venues and add html into every venue
	// also creates ids that correspond to array location
	let newVenueDiv = '';
	for (var i = 0; i < venueArray.length; i++) {
		var event = venueArray[i];

		newVenueDiv += `<div class="col-xs-12 col-sm-6 col-md-4"><div class="card">
		 <a href="venues.html?venue=${event.id}&imgsrc=${event.id}"> <div class="card-img-top homepageIMG" style="background-image: url(assets/images/${event.id}.jpg)"></div></a>
		  <div class="card-body">
		    <h5 class="card-title venueName">${event.name}</h5>
		    <a href="${event.address}" class="btn btn-primary directionsButton btn-lg" target="_blank">Directions</a>
		    <a href="venues.html?venue=${event.id}&imgsrc=${event.id}" class="btn btn-primary venueButton btn-lg">Check Concerts</a>
		  </div>
		</div></div>`;

		//append new containers to .top(large html container)
	}
	$(".top").html(newVenueDiv);
}

addInfo();
