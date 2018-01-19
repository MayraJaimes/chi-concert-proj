//var venueId = $(this).attr("data-id");
let $d = $(document);
var db = firebase.database();
var venueId = getParameterByName("venue");
var venueImage = getParameterByName('imgsrc');

function getVenue(id) {
  $.ajax({
    url: `http://api.songkick.com/api/3.0/venues/${id}.json?apikey=awz1NrZkcMbHwia9`,
    method: "GET"
  }).done(function(response) {
    $d.trigger("venue:loaded", response.resultsPage.results.venue);
  });
}

function getConcerts(id) {
  $.ajax({
    url:
      "http://api.songkick.com/api/3.0/venues/" +
      id +
      "/calendar.json?apikey=awz1NrZkcMbHwia9",
    method: "GET"
  }).done(function(response) {
    $d.trigger("concerts:loaded", response.resultsPage.results);
  });
}

function buildVenueHTML(e, data) {
  const $venueHeader = $("#venueInformation h1");
  const $venueCapacity = $("#venueCapacity span");
  const $venueDescription = $("#venueDescription");
  const $venueImage = $("#venueImage");

  $venueHeader.text(data.displayName);
  $venueCapacity.text(data.capacity);
  $venueDescription.text(data.description);
  $venueImage.html(`<img src="assets/images/${venueImage}.jpg" alt="${venueImage}"/>`);

  setVenueLikes(data.id);
  getConcerts(data.id);
}

function buildConcertsHTML(e, data) {
  let $concertTable = $("#concertTable");
  let concertHTML = "";
  let events = data.event;
  for (let i = 0; i < events.length; i++) {
    concertHTML = `<tr id="${events[i].id}">
                      <td class="eventArtist"> ${events[i].displayName}</td>
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

function setVenueLikes(id) {
  db.ref("likes/venues/" + id).on(
    "value",
    function(snapshot) {
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

function setConcertLikes(id) {
  db.ref("likes/concerts/" + id).on(
    "value",
    function(snapshot) {
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

$d.on("venue:loaded", buildVenueHTML);
$d.on("concerts:loaded", buildConcertsHTML);

$("#venuePage").on("click", ".likeButton", function(event) {
  event.preventDefault();
  let $this = $(this);
  let currentNum = 0;
  let likes = 0;
  let liked = $this.data("liked");

  if (!liked) {
    currentNum = $this.data("number");
    currentNum++;
    $this.data("number", currentNum);
    $this.data("liked", true);
    $this.html(
      "<img src='assets/images/likeButton.png'>" + currentNum + " likes"
    );
  } else {
    currentNum = $this.data("number");
    currentNum--;
    $this.data("number", currentNum);
    $this.data("liked", false);
    $this.html(
      "<img src='assets/images/likeButton.png'>" + currentNum + " likes"
    );
  }

  if ($this.data("type") === "venue") {
    likes = $this.data("number");
    db.ref("likes/venues/" + venueId).set({
      venueLikeCount: likes
    });
  } else {
    let concertId = $this.data("id");
    likes = $this.data("number");
    db.ref("likes/concerts/" + concertId).set({
      concertLikeCount: likes
    });
  }
});

getVenue(venueId);
