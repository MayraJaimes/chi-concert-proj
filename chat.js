// ARIANNA: This is Mayra. I added the config and initialize in the firebase.js and 
//linked it in the venues.html so that we arent initializing 
//it multiple times since that was giving me errors.

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

  if (userName != null) {


  $("#comment-display").prepend("<div></div>" + "User Name:" + " " + userName + "<div></div>" + message + "<div></div>");

  }});

