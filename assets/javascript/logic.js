// Initialize Firebase

var config = {
  apiKey: "AIzaSyAl20DI6-xv1bTEWRjL47vhgCJK1JtLXCs",
  authDomain: "train-schedule-89051.firebaseapp.com",
  databaseURL: "https://train-schedule-89051.firebaseio.com",
  projectId: "train-schedule-89051",
  storageBucket: "train-schedule-89051.appspot.com",
  messagingSenderId: "549884753231"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

//Code to capture the data on the submit button
$("#submit-train").on("click", function(event) {
    event.preventDefault();

// ------------------------------------
// Initial Values from form
var train = $("#train-name").val().trim();
var dest = $("#destination").val().trim();
var fTrain = $("#first-train").val().trim();
var frequency = $("#frequency").val().trim();

//Setting up firebase database
var empObj = {
    train: train,
    dest: dest,
    firstTrain: fTrain,
    freq: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
};

//Create the database with a subcategory of trains
database.ref("trains").push(empObj);

//Emptying form of values to prepare for next entry
$("#train-name").val("");
$("#destination").val("");
$("#first-train").val("");
$("#frequency").val("");

});


//Setting up children of the trains database
database.ref("trains").on("child_added", function (snapshot) {
     
   //Creating variable to convert time
    var firstTimeConverted = moment(snapshot.val().firstTrain, "HH:mm").subtract(1, "years");
    
    //Creating variable to capture current time
    var currentTime = moment();

    //Variable to calculate the difference in times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    //Variable to calculate remainder/modulus
    var tRemainder = diffTime % snapshot.val().freq;
    
    //Variable to take remainder add it to frequency to calculate minutes until next train
    var tMinutesTillTrain = snapshot.val().freq - tRemainder;
    
    //Minutes to calculate until next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
    //Display values
    $("#train-list").append("<div class='row'><div class='col-md-3'>" + snapshot.val().train + "</div>" +
    "<div class='col-md-3'>" + snapshot.val().dest + "</div>" +
    "<div class='col-md-2'>" + snapshot.val().freq + "</div>" +
    "<div class='col-md-2' >" + moment(nextTrain).format("hh:mm") + "</div>" +
    "<div class='col-md-2'>" + tMinutesTillTrain + "</div>" + "</div>");

})


