/* global moment firebase */

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

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

// -----------------------------
$("#submit-train").on("click", function(event) {
    event.preventDefault();

// ------------------------------------
// Initial Values from
var train = $("#train-name").val().trim();
var dest = $("#destination").val().trim();
var fTrain = $("#first-train").val().trim();
var frequency = $("#frequency").val().trim();


var empObj = {
    train: train,
    dest: dest,
    firstTrain: fTrain,
    freq: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
};

database.ref("trains").push(empObj);

$("#train-name").val("");
$("#destination").val("");
$("#first-train").val("");
$("#frequency").val("");

});



database.ref("trains").on("child_added", function (snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().train);
    console.log(snapshot.val().dest);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().freq);
 
    var firstTimeConverted = moment(snapshot.val().firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % snapshot.val().freq;
    console.log(tRemainder);

    var tMinutesTillTrain = snapshot.val().freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $("#train-list").append("<div class='row'><div class='col-md-3'>" + snapshot.val().train + "</div>" +
    "<div class='col-md-3'>" + snapshot.val().dest + "</div>" +
    "<div class='col-md-2'>" + snapshot.val().freq + "</div>" +
    "<div class='col-md-2' >" + moment(nextTrain).format("hh:mm") + "</div>" +
    "<div class='col-md-2'>" + tMinutesTillTrain + "</div>" + "</div>");

})


