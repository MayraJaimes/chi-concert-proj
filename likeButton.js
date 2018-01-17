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

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

let venuefromURL = getParameterByName("displayName");
$("#venueName").text(venuefromURL);

console.log(venuefromURL);
 
for (let i=0; i<mockConcertData.length; i++) { 
    concertHTML += `<tr id="${mockConcertData[i].apinumber}"><td class="eventArtist"> ${mockConcertData[i].artist}</td>
                     <td class="eventDate">${mockConcertData[i].date}</td>
                     <td class="eventPrice">${mockConcertData[i].price}</td>
                     <td class="eventLikes"><a href="#" data-type="concert" data-liked=false data-apinumber="${mockConcertData[i].apinumber}" class="likeButton" data-number=0><img src="assets/images/likeButton.png"> <span class="displayLikes"></span> </a></td></tr>`;
 
    db.ref("likes/concerts/" + mockConcertData[i].apinumber).on("value", function(snapshot) {
      concertLikeCounter = snapshot.val() && snapshot.val().concertLikeCount ? snapshot.val().concertLikeCount : 0;
  
    $('#' + mockConcertData[i].apinumber + ' .likeButton').data('number', concertLikeCounter)
    $('#' + mockConcertData[i].apinumber + ' .displayLikes').html(concertLikeCounter + ' likes')
      
      }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    })
}
 
$("#concertTable").html(concertHTML);
 
db.ref("likes/venues/" + venueName).on('value', function (snapshot) {
  venueLikeCounter = snapshot.val() && snapshot.val().venueLikeCount ? snapshot.val().venueLikeCount : 0;
  $(".displayVenueLikes").text(venueLikeCounter + " likes");
 
   }, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});
 
$("#venuePage").on("click", ".likeButton", function() {
  event.preventDefault();
  liked = $(this).data('liked')
  console.log('currentNum = $(this).data("number");')
  console.log(currentNum = $(this).data("number")) 
 
  if (!liked) {
    currentNum = $(this).data("number")
    currentNum ++;
    $(this).data("number", currentNum);
    $(this).data('liked', true);
    $(this).html("<img src='assets/images/likeButton.png'>" + currentNum + " likes");
  } else {
    currentNum = $(this).data("number");
    currentNum--;
    $(this).data("number", currentNum);
    $(this).data('liked', false);
    $(this).html("<img src='assets/images/likeButton.png'>" + currentNum + " likes");
  }
 
  if ($(this).data('type') === 'venue') {
    venueLikeCounter = $(this).data("number");
    db.ref("likes/venues/" + venueName).set({
      venueLikeCount: venueLikeCounter
    });

  } else {
    apinumber = $(this).data('apinumber');
    console.log(apinumber);
    concertLikeCounter = $(this).data("number");
    db.ref("likes/concerts/"+ apinumber).set({
      concertLikeCount: concertLikeCounter
    });
  }
});