var config = {
    apiKey: "AIzaSyCXjft2kReyOPJVDnJci8SvwLzS9DjsOL0",
    authDomain: "class-concert-project.firebaseapp.com",
    databaseURL: "https://class-concert-project.firebaseio.com",
    projectId: "class-concert-project",
    storageBucket: "class-concert-project.appspot.com",
    messagingSenderId: "623152189871"
};

firebase.initializeApp(config);

var mockConcertData = [
		{artist: 'Dennis', date: 'february 20, 2017', price: '40.00', apinumber: "3456"}, 
		{artist: 'Mayra', date: 'january 5, 2017', price: '30.00', apinumber: "1234"}, 
		{artist: 'Madison', date: 'july 3, 2017', price: '500.00', apinumber: "5678"}, 
		{artist: 'Jayden', date: 'december 10, 2017', price: '80.00', apinumber: "9876"}]; 


var db = firebase.database();
var venueName = 'united_center';
var likeType = '';
var currentNum = "";
var initialVenueLiked = 0;
var initialConcertLiked = 0;
var concertLikeCounter = initialConcertLiked;
var venueLikeCounter = initialVenueLiked;
var apinumber = $(this).data('apinumber');
var concertHTML = '';
let currentLike = 0;

for (i=0; i<mockConcertData.length; i++) {
	console.log('mockConcertData[i].apinumber: ' + mockConcertData[i].apinumber);

	db.ref("likes/concerts/" + mockConcertData[i].apinumber).on("value", function(snapshot) {
		console.log('snapshot.val()')
		console.log(snapshot.val())
	  concertLikeCounter = snapshot.val() && snapshot.val().concertLikeCount ? snapshot.val().concertLikeCount : 0;
	  currentLike = snapshot.val() && snapshot.val().concertLikeCount ? snapshot.val().concertLikeCount : 0;

	  console.log('snapshot.val().concertLikeCount: ' + snapshot.val().concertLikeCount);
	  console.log('currentLike: ' + currentLike);

	  }, function(errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});


	concertHTML += `<tr><td class="eventArtist"> ${mockConcertData[i].artist}</td>
                     <td class="eventDate">${mockConcertData[i].date}</td>
                     <td class="eventPrice">${mockConcertData[i].price}</td>
                     <td class="eventLikes"><a href="#" data-type="concert" data-liked=false data-apinumber="${mockConcertData[i].apinumber}" class="likeButton" data-number="0"><img src="assets/images/likeButton.png"> <span class ="displayLikes">${currentLike} likes</span> </a></td></tr>`;
}

$("#concertTable").html(concertHTML);

db.ref("likes/venues/" + venueName).on('value', function (snapshot) {
  venueLikeCounter = snapshot.val().venueLikeCount;
  $(".displayVenueLikes").text(snapshot.val().venueLikeCount + " likes");
    
   }, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

  
// $("#venuePage").on("click", ".likeButton", function() {
//   event.preventDefault();
//   liked = $(this).data('liked')

//   if (!liked) {
//     	currentNum = $(this).data("number");
//     	currentNum ++;
//     	$(this).data("number", currentNum);
//     	$(this).data('liked', true);
//     	$(this).html("<img src='assets/images/likeButton.png'>" + currentNum + " likes");
    
//     } else {
//     	currentNum = $(this).data("number");
//     	currentNum --;
//     	$(this).data("number", currentNum);
//     	$(this).data('liked', false);
//     	$(this).html("<img src='assets/images/likeButton.png'>" + currentNum + " likes");
//     }

//   if ($(this).data('type') === 'venue') {
//     venueLikeCounter = $(this).data("number");
//     db.ref("likes/venues/" + venueName).set({
//       venueLikeCount: venueLikeCounter 
//     });
//   }
    
//   else {
//     apinumber = $(this).data('apinumber');
//     console.log(apinumber);
//     concertLikeCounter = $(this).data("number");
//     db.ref("likes/concerts/"+ apinumber).set({
//       concertLikeCount: concertLikeCounter
//     });
//   }
// });