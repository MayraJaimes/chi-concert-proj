console.log(firebase);

const venueName = 'united_center';

var database = firebase.database();
var venueData = database.ref('venues/' + venueName);
var initialClickCount = venueData.child('liked');

var clickCounter = "";
var buttonClicked = false;

var venueButtonClicked = false;
var venueClickCounter= "";

let likeType = 'venue';
let liked = '';
let likeId = '1234';
let thisButton = '';

// look up if its okay to have multiple listeners for value
// how to access the data children

venueData.on("value", function(snapshot) {
	console.log('snapshot.val')
  	console.log(snapshot.val());
  	let likeCounter = 0;

  	// if (likeType === 'venue') {
  	// 	likeCounter = snapshot.val().liked || 0;
  	// } else {
  	// 	likeCount = snapshot.val().events['1234'].liked || 0;
  	// }


  	// thisButton.find('.displayLikes').text(likeCounter + " likes") ;

  	// clickCounter = snapshot.val() || 0;
  	// venueClickCounter = snapshot.val() || 0;

  	// console.log(clickCounter);

  	// $(".displayLikes").text(clickCounter + " likes");
  	// $(".displayVenueLikes").text(venueClickCounter + " likes");


}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

$("#venuePage").on("click", ".likeButton", function(e) {
	console.log(this);
	e.preventDefault();
	console.log($(this));
	console.log($(this).data('likeType'));
	console.log($(this).data('likeId'));
	
	const $button = $(e.currentTarget);
	thisButton = $button;
	likeType = $(e.currentTarget).data('likeType');
	liked = $(e.currentTarget).data('liked')

	if (!liked) {
  		clickCounter++;
  		$button.data('liked', true);
  	} else {
  		clickCounter--
  		$button.data('liked', false);
  	}

	if (likeType === 'venue') {
		venueData.set({
			liked: clickCounter
		});
	} else {
		likeId = $(e.currentTarget).data('likeId');
		venueData.child('events/' + likeId).set({
			liked: clickCounter
		})
	}
});
