var config = {
    apiKey: "AIzaSyCXjft2kReyOPJVDnJci8SvwLzS9DjsOL0",
    authDomain: "class-concert-project.firebaseapp.com",
    databaseURL: "https://class-concert-project.firebaseio.com",
    projectId: "class-concert-project",
    storageBucket: "class-concert-project.appspot.com",
    messagingSenderId: "623152189871"
};
 
firebase.initializeApp(config);


var database = firebase.database();

//venue variables/ info that we want to add to each object;
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

var uc = new Venue("United Center", 
	"1901 W Madison St, Chicago, IL 60612", 
	"http://www.unitedcenter.com", 
	"521");

var aragon = new Venue("Aragon Ballroom",
	" 1106 W Lawrence Ave, Chicago, IL 60640",
	"http://www.thearagonballroom.com", 
	"837"); 

var metro = new  Venue("Metro",
	"3730 N Clark St, Chicago, IL 60613",
	"http://metrochicago.com",
	"1070" ); 

var riviera = new  Venue("Riviera",
	" 4746 N Racine Ave, Chicago, IL 60640",
	"rivieratheatre.com",
	"1284" );

var hob = new Venue("House of Blues", 
	"329 N Dearborn St, Chicago, IL 60654",
	"http://houseofblues.com/chicago",
	"621" ); 

var chicagoTheater = new Venue("Chicago Theater", 
	"175 N State St, Chicago, IL 60601", 
	"http://chicago-theater.com", 
	"1021" );

// added more venues
var bottomLounge = new Venue("Bottom Lounge",
	"1375 W Lake St, Chicago, IL 60607",
	"http://bottomlounge.com",
	"17091" );

var tinleyPark = new Venue("Hollywood Casino Amphitheatre",
	"19100 Ridgeland Ave, Tinley Park, IL 60477",
	"http://www.tinleyparkamphitheater.com/",
	"533");

var hideout = new Venue("Hideout Chicago",
	"1354 W Wabansia Ave, Chicago, IL 60642",
	"http//www.hideoutchicago.com/",
	"259");

var greenMill = new Venue("Green Mill Cocktail Lounge",
	"4802 N Broadway St, Chicago, IL 60640",
	"http://greenmilljazz.com/",
	"1153196");

var schubas = new Venue("Schubas Tavern",
	"3159 N Southport Ave, Chicago, IL 60657",
	"http://www.lh-st.com/",
	"2133");

var buddyGuys = new Venue("Buddy Guy's Legends",
	"700 S Wabash Ave, Chicago, IL 60605",
	"http://buddyguy.com/",
	"2176");

var reggies = new Venue("Reggies Rock Club",
	"2109 S State St, Chicago, IL 60616",
	"http://www.reggieslive.com",
	"540136");

var emptyBottle = new Venue("The Empty Bottle",
	"1035 N Western Ave, Chicago, IL 60622",
	"http://emptybottle.com/",
	"251");

var oldTown = new Venue("Old Town School of Folk Music",
	"4544 N Lincoln Ave",
	"http://www.oldtownschool.org/",
	"361");

var lincolnHall = new Venue("Lincoln Hall",
	"2424 N Lincoln Ave, Chicago, IL 60614",
	"http://www.lh-st.com/",
	"513326");

var doubleDoor = new Venue("Double Door",
	"1551 N Damen Ave, Chicago, IL 60622",
	"http://doubledoor.com/",
	"6540");

var parkWest = new Venue("Park West",
	"322 W Armitage Ave, Chicago, IL 60614",
	"http://www.parkwestchicago.com/",
	"1406");

var vic = new Venue("Vic Theater",
	"3145 N Sheffield Ave, Chicago, IL 60657",
	"http://www.victheatre.com/",
	"32409");

var milleniumPark = new Venue("Pritzker Pavillion",
	"201 E Randolph St, Chicago, IL 60601",
	"http://www.grantparkmusicfestival.com/the-music/2018season",
	"2887023");

//  new venues go here;

// add new venue object names to the end of venueArray
var venueArray = [uc, aragon, metro, riviera, hob, chicagoTheater, bottomLounge, tinleyPark, 
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
	for (var i = 0; i < venueArray.length; i++) {
		var event = venueArray[i];
		// pu
		var refDiv = `<a href="venues.html?venue=${event.id}&imgsrc=${event.id}">`;
		var newVenueDiv = `${refDiv}<div class="row col-md-6 col-sm-6 col-xs-6 venue">`+
							`<div class="panel panel-default">`+
							`<div class="panel-heading">`+
								`<h3 class="panel-title" id= "name${i}">${event.name}</h3></div>`+
							`<div class="panel-body">`+
								`<div class="row">`+
									`<div class="col-md-6">`+
										`<div class="row">`+
											`<div class="col-md-12 address" id="address${i}">${event.address}</div></div>`+
										`<div class="row">`+
										`<div class="col-md-6 website" id="website${i}"><a href="${event.website}" target="_blank">Venue Website</a></div></div></div>`+
									`${refDiv}<div class="col-md-6"> <div class="concertImage"><img src='assets/images/${event.id}.jpg' alt="${event.id}"/></div> </div></a></a>`;

		//append new containers to .top(large html container)				
		$(".top").append(newVenueDiv);
	}
}

addInfo();
