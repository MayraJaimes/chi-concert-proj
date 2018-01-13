
var searchWord = "Beyonce"
var apiKey = "&apikey=cIgACKZRbxIQlLyV2ryAtnvXKA4NAthE";
var rootURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=";
var queryURL = rootURL + searchWord + apiKey;

https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&apikey=cIgACKZRbxIQlLyV2ryAtnvXKA4NAthE
// $.ajax({
//   type:"GET",
//   url:"https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=kanye&apikey=" +apikey,
//   async:true,
//   dataType: "json",
//   success: function(json) {
//               console.log(json);
//               // Parse the response.
//               // Do other things.
//            },
//   error: function(xhr, status, err) {
//               // This time, we do not end up here!
//            }
// });

    console.log("linked");
$.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
          var dates = response._embedded.events[1].dates;
          console.log(dates);
          $(".apiInfo").text(dates);
        });