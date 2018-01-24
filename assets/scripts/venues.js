let $d = $(document);
var db = firebase.database();
//I run the getParameterByName in this page to use the Query Strings
var venueId = getParameterByName("venue");
var venueImg = getParameterByName('imgsrc');
var myApi = 'awz1NrZkcMbHwia9';
//getting venue information from API. Ajax call.
function getVenue(id) {
  $.ajax({
    url: `http://api.songkick.com/api/3.0/venues/${id}.json?apikey=${myApi}`,
    method: "GET"
  }).done(function(response) {
    $d.trigger("venue:loaded", response.resultsPage.results.venue);
  });
}

//getting concert information from API. Ajax call.
function getConcerts(id) {
  $.ajax({
    url:
      "http://api.songkick.com/api/3.0/venues/" +
      id +
      `/calendar.json?apikey=${myApi}`,
    method: "GET"
  }).done(function(response) {
    $d.trigger("concerts:loaded", response.resultsPage.results);
  });
}

//Dynamically building the HTML that displays the different venues
function buildVenueHTML(e, data) {
  const $venueHeader = $("#venueName");
  const $venueCapacity = $("#venueCapacity");
  const $venueDescription = $("#venueDescription");
  const $venueImage = $("#venueImage");
  var venueDataDescription = data.description ? data.description : "Venue description coming soon!"

  

  $venueHeader.text(data.displayName);
  $venueCapacity.text(data.capacity);
  $venueDescription.text(venueDataDescription);
  $venueImage.css({backgroundImage: `url(assets/images/${venueImg}.jpg)`});

  setVenueLikes(data.id);
  //calling the function to get information about concerts from the API
  getConcerts(data.id);
}

//Dynamically building the HTML that displays the different concerts
function buildConcertsHTML(e, data) {
  let $concertTable = $("#concertTable");
  let concertHTML = "";
  let events = data.event;
  for (let i = 0; i < events.length; i++) {
    concertHTML = `<tr id="${events[i].id}">
                      <td class="eventArtist"><a href="${events[i].uri}" target="_blank"> ${events[i].displayName}</a></td>
                      <td class="eventLikes">
                        <a href="#" events-type="concert" data-liked=false data-id="${
                          events[i].id
                        }" class="likeButton" data-number=0>
                          <img src="assets/images/likeButton.png"> <span class="displayLikes"></span>
                        </a>
                      </td>
                    </tr>`;
    $concertTable.append(concertHTML);
    setConcertLikes(events[i].id);
  }
}

//this function tracks if there is a change in the venue Likes to save them and display correct information
function setVenueLikes(id) {
  db.ref("likes/venues/" + id).on("value",function(snapshot) {
      let likes =
        snapshot.val() && snapshot.val().venueLikeCount
          ? snapshot.val().venueLikeCount
          : 0;
      $(".venueLikeButton").data("number", likes);
      $(".venueLikeButton span").text(likes + " likes");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
}

//this function tracks if there is a change in the venue Likes to save them and display correct information
function setConcertLikes(id) {
  db.ref("likes/concerts/" + id).on("value", function(snapshot) {
      let likes =
        snapshot.val() && snapshot.val().concertLikeCount
          ? snapshot.val().concertLikeCount
          : 0;
      let thisRow = '#' + id;
      $(thisRow + " .likeButton").data("number", likes);
      $(thisRow + " .displayLikes").html(likes + " likes");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
}

//event listener that waits for the API information to be trieved before builting the HTML
$d.on("venue:loaded", buildVenueHTML);
$d.on("concerts:loaded", buildConcertsHTML);

$("#venuePage").on("click", ".likeButton", function(event) {
  event.preventDefault();
  let $this = $(this);
  let currentNum = 0;
  let likes = 0;
  let liked = $this.data("liked");


//once you click on the like button IF its not liked already (data-liked=false) it grabs the data-number value and adds one to it, then sets that number back as the data-number value, and changes the data-liked value to true.

  if (!liked) {
    currentNum = $this.data("number");
    currentNum++;
    $this.data("number", currentNum);
    $this.data("liked", true);
    $this.html(
      "<img src='assets/images/userLiked.png'>" + currentNum + " likes"
    );

//once you click on the like button IF it IS liked already (data-liked=true) it grabs the data-number value and subtracts one to it, then sets that number back as the data-number value, and changes the data-liked value to false.

  } else {
    currentNum = $this.data("number");
    currentNum--;
    $this.data("number", currentNum);
    $this.data("liked", false);
    $this.html(
      "<img src='assets/images/likeButton.png'>" + currentNum + " likes"
    );
  }

//if the data-type=venue then it will set the new information in the database under the venueID
//This way every concert will have their data stored separately from each other.
  if ($this.data("type") === "venue") {
    likes = $this.data("number");
    db.ref("likes/venues/" + venueId).set({
      venueLikeCount: likes
    });

//if the data-type=conert then it will set the new information in the database under the concertID. This way every concert will have their data stored separately from each other.
  } else {
    let concertId = $this.data("id");
    likes = $this.data("number");
    db.ref("likes/concerts/" + concertId).set({
      concertLikeCount: likes
    });
  }
});

getVenue(venueId);
