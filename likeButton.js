console.log(firebase);

const venueName = 'united_center';

var database = firebase.database();
var venueData ;
var initialClickCount = venueData.child('liked');

var clickCounter = 0;
var buttonClicked = false;

var venueButtonClicked = false;
var venueClickCounter= "";

var likeType = '';
var liked = '';
var likeId = '';
var thisButton = '';

var initialVenueLiked = 0;
var initialConcertLiked = 0;
var venueLiked = initialVenueLiked;
var concertLiked = initialConcertLiked;

var currentNum = "";
var newNum = "";

// look up if its okay to have multiple listeners for value
// how to access the data children

database.ref('/venues-' + venueName).on("value", function(snapshot) {
  if (snapshot.child("venueLiked").exists() && snapshot.child("concertLiked").exists()) {
		venueLiked = snapshot.val().venueLiked;
    	concertLiked = snapshot.val().concertLiked;

    // Change the HTML to reflect the initial value
    $(".displayVenueLikes").text(snapshot.val().venueLiked);
    $(".displayLikes").text(snapshot.val().concertLiked);

}

else {

	$(".displayVenueLikes").text(venueLiked);
    $(".displayLikes").text(concertLiked);

}

  	// if (likeType === 'venue') {
  	// 	likeCounter = snapshot.val().liked || 0;
  	// } else {
  	// 	likeCount = snapshot.val().events['1234'].liked || 0;
  	// }
  	// thisButton.find('.displayLikes').text(likeCounter + " likes") ;

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

$("#venuePage").on("click", ".likeButton", function(e) {
	e.preventDefault();
	
	var $button = $(this);
	thisButton = $button;
	likeType = $(this).data('likeType');
	liked = $(this).data('liked')

	if (!liked) {

		currentNum = $button.data("likes");
		currentNum = parseInt(currentNum);

		currentNum ++

		$button.data("likes", currentNum)

		$button.val()
  		$button.data('liked', true);
  		$button.text(currentNum);
  	} else {
  		clickCounter--
  		$button.data('liked', false);
  		$button.text(clickCounter);
  	}

	if (likeType === 'venue') {
		database.ref('venues/' + venueName).set({
			venueLiked: clickCounter;
		});
	} else {
		likeId = $(this).data('likeId');
		database.ref('venues/' + venueName).child('events/' + likeId).set({
			concertLiked: clickCounter;
		})
	}
});
