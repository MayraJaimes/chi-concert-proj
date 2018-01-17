  //var topic = $(this).attr("data-name");
var venueSongKickId = 1284;
var queryURL = "http://api.songkick.com/api/3.0/venues/" + venueSongKickId + "/calendar.json?apikey=awz1NrZkcMbHwia9";

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
  var response = response.resultsPage.results.event;

  for (let i=0; i<response.length; i++) { 
  concertHTML += `<tr id="${response[i].id}"><td class="eventArtist"> ${response[i].displayName}</td>
                   <td class="eventDate">${response[i].start.date}</td>
                   <td class="eventPrice">${response[i].id}</td>
                   <td class="eventLikes"><a href="#" data-type="concert" data-liked=false data-apinumber="${response[i].id}" class="likeButton" data-number=0><img src="assets/images/likeButton.png"> <span class="displayLikes"></span> </a></td></tr>`;

    db.ref("likes/concerts/" + response[i].id).on("value", function(snapshot) {
      concertLikeCounter = snapshot.val() && snapshot.val().concertLikeCount ? snapshot.val().concertLikeCount : 0;
      $('#' + response[i].id + ' .likeButton').data('number', concertLikeCounter)
      $('#' + response[i].id + ' .displayLikes').html(concertLikeCounter + ' likes')
      }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    $("#concertTable").html(concertHTML);

}     
  });




//Your key is: awz1NrZkcMbHwia9

var config = {
    apiKey: "AIzaSyCXjft2kReyOPJVDnJci8SvwLzS9DjsOL0",
    authDomain: "class-concert-project.firebaseapp.com",
    databaseURL: "https://class-concert-project.firebaseio.com",
    projectId: "class-concert-project",
    storageBucket: "class-concert-project.appspot.com",
    messagingSenderId: "623152189871"
};
 
firebase.initializeApp(config);
 
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

// function getParameterByName(name, url) {
//     if (!url) url = window.location.href;
//     name = name.replace(/[\[\]]/g, "\\$&");
//     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, " "));
//   }

// let venuefromURL = getParameterByName("displayName");
// $("#venueName").text(venuefromURL);

// console.log(venuefromURL);
 
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