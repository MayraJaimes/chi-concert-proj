console.log(firebase);

const venueName = 'united_center';

var database = firebase.database();
var venueData = database.ref('venues/' + venueName);
var initialClickCount = venueData.child('liked');

var clickCounter = '';

initialClickCount.on("value", function(snapshot) {
	console.log('snapshot.val')
  	console.log(snapshot.val());

  	clickCounter = snapshot.val() || 0;

  	console.log(clickCounter);

  	$(".displayLikes").text(clickCounter + " likes");

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});


$(".likeButton").on("click", function() {
 	event.preventDefault();
  	clickCounter++;
  	venueData.set({
    	liked: clickCounter
  	});
  	console.log(clickCounter);
});