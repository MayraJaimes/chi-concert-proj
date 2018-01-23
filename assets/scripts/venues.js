let $d = $(document);
var db = firebase.database();
//I run the getParameterByName in this page to use the Query Strings
var venueId = getParameterByName("venue");
var venueImg = getParameterByName('imgsrc');

//getting venue information from API. Ajax call.
function getVenue(id) {
  $.ajax({
    url: `http://api.songkick.com/api/3.0/venues/${id}.json?apikey=awz1NrZkcMbHwia9`,
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
      "/calendar.json?apikey=awz1NrZkcMbHwia9",
    method: "GET"
  }).done(function(response) {
    $d.trigger("concerts:loaded", response.resultsPage.results);
        console.log(response.resultsPage.results);
  });
}

//Dynamically building the HTML that displays the different venues
function buildVenueHTML(e, data) {
  const $venueHeader = $("#venueName");
  const $venueCapacity = $("#venueCapacity");
  const $venueDescription = $("#venueDescription");
  const $venueImage = $("#venueImage");
  var venueDataDescription = data.description ? data.description : "Venue description coming soon!"

  if (venueId === 521) {
    venueDataDescription = `PARAGRAPHS !!!!!!!!!! In 1988, William Wirtz, owner of the Chicago Blackhawks, and Jerry Reinsdorf, majority owner and Team Chairman of the Chicago Bulls, formed a new partnership to create an arena that would take sports and entertainment into the 21st century.
    The United Center, home to the Chicago Blackhawks and Chicago Bulls, is the largest arena in the United States. Construction was begun in April of 1992, with the ribbon cutting ceremony being held on August 18, 1994.
    Since opening, the United Center has hosted over 200 events each year. Some of the events the United Center has been proud to host include the 1996 Democratic National Convention, The Rolling Stones, Eric Clapton, Bruce Springsteen and the E Street Band, Paul McCartney, U2, The Who, The 3 Tenors, Ringling Brothers and Barnum & Bailey Circus, Disney on Ice, the Big Ten Men's Basketball Tournament, the Men's NCAA Basketball Tournament, the Great Eight Classic, Illinois College Basketball, and Champions on Ice.
    The United Center has hosted over forty million guests since its opening in 1994.`

  } else if (venueId === 837) {
    venueDataDescription = "With its extraordinary architectural design and aesthetics, the Aragon Ballroom is one of Chicago’s premier live entertainment venues. The Aragon Ballroom Chicago was built in 1926, and at a cost of $2 million, was one of the most elaborate venues of its time. Indeed, soon after its opening, the Aragon Ballroom was called 'the most beautiful ballroom in the world.' Crystal chandeliers, mosaic tiles, beautiful arches, extravagant balconies and terra-cotta ceilings combine to create a truly magnificent and unique venue in the Aragon Ballroom Chicago."

  } else if (venueId = 17091) {
    venueDataDescription = "BOTTOM LOUNGE BOTTOM LOUNGE"

  } else if (venueId === 259) {
    venueDataDescription = "HIDEOUT HIDEOUT HIDEOUT HIDEOUT"

  } else if (venueId === 251) {
    venueDataDescription = "EMPTY BOTTLE EMPTY BOTTLE"

  } else if (venueId === 540136) {
    venueDataDescription = "REGGIES REGGIES REGGIES"

  } else if (venueId === 2176) {
    venueDataDescription = "BUDDY GUY BUDDY GUY"

  } else if (venueId === 513326) {
    venueDataDescription = "LINCOLN HALL LINCOLN HALL"

  } else if (venueId === 6540) {
    venueDataDescription = "DOUBLE DOOR DOUBLE DOOR"

  } else if (venueId === 1406) {
    venueDataDescription = "PARK WEST PARK WEST"
  
  } else {
    venueDataDescription = data.description
  } 

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
                        console.log(events[i].uri);
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
