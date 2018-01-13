
This is the javascript for the venues html and was saved as chat.js

var config = {
   apiKey: "AIzaSyD6CYwGfDAf5Tlo7QRyxSdo6V6ctbOXFpM",
   authDomain: "concert-forum.firebaseapp.com",
   databaseURL: "https://concert-forum.firebaseio.com",
   projectId: "concert-forum",
   storageBucket: "concert-forum.appspot.com",
   messagingSenderId: "429361418902"
 };
 
 firebase.initializeApp(config);

 var database = firebase.database();

 var userName = "";

 var message = "";

 //button for adding new user info
 $("#sendMessage").on("click", function(event){
     event.preventDefault();

   //grabs user input
     userName = $("#userName-input").val().trim();

     message = $("#userMessage-input").val().trim();

     //Creates local "temporary" object for holding new messages
   var newEmp = {

         userName: userName,

         message: message,

     dateAdded: firebase.database.ServerValue.TIMESTAMP

     };

   //Uploads new messages into the database
   database.ref().push(newEmp);

 //Clear input boxes
 $("#userName-input").val("");
 $("#userMessage-input").val("");
     
 });


//Create Firebase event for adding messages
 database.ref().on("child_added", function(snapshot) {

 userName = snapshot.val().userName;

 message = snapshot.val().message;

 console.log(userName);
 console.log(message);


 $("#comment-display").prepend("<div></div>" + "User Name:" + " " + userName + "<div></div>" + message + "<div></div>");

 });