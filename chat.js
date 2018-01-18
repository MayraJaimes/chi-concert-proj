var config = {
    apiKey: "AIzaSyCXjft2kReyOPJVDnJci8SvwLzS9DjsOL0",
    authDomain: "class-concert-project.firebaseapp.com",
    databaseURL: "https://class-concert-project.firebaseio.com",
    projectId: "class-concert-project",
    storageBucket: "class-concert-project.appspot.com",
    messagingSenderId: "623152189871"
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

  if (userName != null) {


  $("#comment-display").prepend('<div id="newdiv">' + "<b>" + userName + ":" + "</b>" + " " + message + '</div>');

  }});

