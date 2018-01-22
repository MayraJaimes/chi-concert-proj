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

 var id = getParameterByName("venue");

 var userName = "";

 var message = "";


//Check local storage for value
 window.onload = function checkLocal() {
    var local = localStorage.getItem("name") || " ";
    if (local === " ") {

    $("#displayName").text("");
      
    } else{

      $("#displayName").show();

    }
  };

//Function to log in
 $("#loginNameButton").on("click", function(event){
    event.preventDefault();


    var name = $("#loginName").val().trim();

    userName = $("#loginName").val().trim();

    localStorage.clear();

    localStorage.setItem("name", name);

    $("#displayName").show();
        
    $("#displayName").text("Logged In: " + localStorage.getItem("name"));
  
    $("#loginName").val("");


    });


    
    $("#displayName").append(" " + localStorage.getItem("name"));

 
//Function to log off
$("#logoffButton").on("click", function(event){
    event.preventDefault();


        localStorage.clear();
        
        $("#displayName").text("");

    });


 //button for adding new user info
 $("#sendMessage").on("click", function(event){
     event.preventDefault();

     userName = localStorage.getItem("name");


     message = $("#userMessage-input").val().trim();

     //Creates local "temporary" object for holding new messages
    var newEmp = {


        userName: userName,

        message: message,

        dateAdded: firebase.database.ServerValue.TIMESTAMP

      };

   //Uploads new messages into the database
   database.ref("chat/" + id).push(newEmp);

 //Clear input boxes
 $("#userName-input").val("");
 $("#userMessage-input").val("");
     
 });

//Create Firebase event for adding messages
  database.ref("chat/" + id).on("child_added", function(snapshot) {

  userName = snapshot.val().userName;

  message = snapshot.val().message;

  if (userName != null) {


  $("#comment-display").prepend('<div id="newdiv">' + "<b>" + userName + ":" + "</b>" + " " + message + '</div>');

  }});

