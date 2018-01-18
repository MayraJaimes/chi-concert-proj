// Initialize Firebase
var config = {
apiKey: "AIzaSyDIlnbkpqY2Eg-QNtpjUBcse4t5kpX8ICU",
authDomain: "chicago-concert-project.firebaseapp.com",
databaseURL: "https://chicago-concert-project.firebaseio.com",
projectId: "chicago-concert-project",
storageBucket: "chicago-concert-project.appspot.com",
messagingSenderId: "655657671055"
};
firebase.initializeApp(config);

var database = firebase.database();

//venue variables/ info that we want to add to each object;
var name;
var address;
var website;
var image;

// constructor object for new venues
function Venue(name, address, website, image, apiname)
{
	this.name = name;
	
	this.address = address;
	this.website = website;
	this.image = image;
	this.apiname = apiname;
	//addd new properties here
}

var icons = ["assets/images/unitedCenter.jpg", "assets/images/AragonBallroom.jpg"]

var uc = new Venue("United Center", "1901 W Madison St, Chicago, IL 60612", 
					"www.unitedcenter.com", icons[0], "unitedcenter")

var aragon = new Venue("Aragon Ballroom"," 1106 W Lawrence Ave, Chicago, IL 60640",
					 "www.thearagonballroom.com", icons[1], "aragonballroom");

var metro = new  Venue("Metro","3730 N Clark St, Chicago, IL 60613","metrochicago.com","placeholder", "metro");

var riviera = new  Venue("Riviera"," 4746 N Racine Ave, Chicago, IL 60640","rivieratheatre.com","placeholder", "riviera");

var hob = new Venue("House of Blues", "329 N Dearborn St, Chicago, IL 60654","houseofblues.com/chicago","placeholder", "houseofblues");

var chicagoTheater = new Venue("Chicago Theater", "175 N State St, Chicago, IL 60601", "chicago-theater.com", "placeholder", "chicagotheater")

// added more venues
var bottomLounge = new Venue("Bottom Lounge"," 1375 W Lake St, Chicago, IL 60607",
							"https://bottomlounge.com/","", "");
var tinleyPark = new Venue("Hollywood Casino Amphitheatre","19100 Ridgeland Ave, Tinley Park, IL 60477",
							"www.tinleyparkamphitheater.com/","", "");
var hideout = new Venue("Hideout Chicago","1354 W Wabansia Ave, Chicago, IL 60642",
						"https://www.hideoutchicago.com/","", "");
var greenMill = new Venue("Green Mill Cocktail Lounge",
						"4802 N Broadway St, Chicago, IL 60640","greenmilljazz.com/","", "");
var schubas = new Venue("Schubas Tavern","3159 N Southport Ave, Chicago, IL 60657",
						"www.lh-st.com/","", "");
var buddyGuys = new Venue("Buddy Guy's Legends","700 S Wabash Ave, Chicago, IL 60605",
							"buddyguy.com/","", "");
var reggies = new Venue("Reggies Rock Club","2109 S State St, Chicago, IL 60616",
						"https://www.reggieslive.com","", "");
var emptyBottle = new Venue("The Empty Bottle","1035 N Western Ave, Chicago, IL 60622",
							"emptybottle.com/","", "");
var oldTown = new Venue("Old Town School of Folk Music",
						"4544 N Lincoln Ave","https://www.oldtownschool.org/",
							"", "");
var lincolnHall = new Venue("Lincoln Hall","2424 N Lincoln Ave, Chicago, IL 60614",
							"www.lh-st.com/","", "");
var doubleDoor = new Venue("Double Door","1551 N Damen Ave, Chicago, IL 60622",
							"doubledoor.com/","");
var parkWest = new Venue("Park West","322 W Armitage Ave, Chicago, IL 60614",
						"https://www.parkwestchicago.com/","", "");
var vic = new Venue("The Vic","3145 N Sheffield Ave, Chicago, IL 60657",
					"https://www.victheatre.com/","", "");
var milleniumPark = new Venue("Pritzker Pavillion","201 E Randolph St, Chicago, IL 60601",
							"https://www.grantparkmusicfestival.com/the-music/2018season","", "");

//  new venues go here;

// add new venue object names to the end of venueArray
var venueArray = [uc, aragon, metro, riviera, hob, chicagoTheater, bottomLounge, tinleyPark, 
					hideout, buddyGuys, reggies, emptyBottle, oldTown, lincolnHall, doubleDoor,
					parkWest, vic, milleniumPark
					];
//add new venue object properties to the end of attrArray
var attrArray = [name, address, website, image];
//array for selectors generated in getSelectors function.
var selectArray = [];
//function to get selector names from length of venue array
function getSelectors() {
	for (var i = 0; i < attrArray.length; i++) {
		
		var name = "$('"+"#" + "name"+[i] + "')";	
		var address ="$('"+"#" + "address"+[i] + "')";
		var website = "$('"+"#" + "website"+[i] + "')";
		var image = "$('" + "#" + "image"+[i] + "')";
		
		selectArray.push(name);
		selectArray.push(address);
		selectArray.push(website);
		selectArray.push(image);
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
		
		var newVenueDiv = `<a href="venues.html?venue=${event.apiname}&displayName=${event.name}"><div class="row col-md-6 col-sm-6 col-xs-6 venue">`+
							`<div class="panel panel-default">`+
							`<div class="panel-heading">`+
								`<h3 class="panel-title" id= "name${i}">${event.name}</h3></div>`+
							`<div class="panel-body">`+
								`<div class="row">`+
									`<div class="col-md-6">`+
										`<div class="row">`+
											`<div class="col-md-12 address" id="address${i}">${event.address}</div></div>`+
										`<div class="row">`+
										`<div class="col-md-6 website" id="website${i}">${event.website}</div></div></div>`+



									`<div class="col-md-6 image" <img src=“assets/images/unitedCenter.jpg” alt=“unitedCenter”>${event.image}</div></a>`;




		//append new containers to .top(large html container)				
		$(".top").append(newVenueDiv);
	}
}

addInfo();
