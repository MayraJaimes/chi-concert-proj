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

var uc = new Venue("United Center", "1901 W Madison St, Chicago, IL 60612", 
					"www.unitedcenter.com", "placeholder", "unitedcenter")

var aragon = new Venue("Aragon Ballroom"," 1106 W Lawrence Ave, Chicago, IL 60640",
					 "www.thearagonballroom.com", "placeholder", "aragonballroom");

var metro = new  Venue("Metro","3730 N Clark St, Chicago, IL 60613","metrochicago.com","placeholder", "metro");

var riviera = new  Venue("Riviera"," 4746 N Racine Ave, Chicago, IL 60640","rivieratheatre.com","placeholder", "riviera");

var hob = new Venue("House of Blues", "329 N Dearborn St, Chicago, IL 60654","houseofblues.com/chicago","placeholder", "houseofblues");

var chicagoTheater = new Venue("Chicago Theater", "175 N State St, Chicago, IL 60601", "chicago-theater.com", "placeholder", "chicagotheater")
//  new venues go here;

// add new venue object names to the end of venueArray
var venueArray = [uc, aragon, metro, riviera, hob, chicagoTheater];
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
