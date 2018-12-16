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
// Initial Values
var train = $("#train-name").val().trim();
var dest = $("#destination").val().trim();
var fTrain = $("#first-train").val().trim();
var freq = $("#frequency").val().trim();

var empObj = {
    train: train,
    dest: dest,
    firstTrain: fTrain,
    freqMin: freq,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
}

database.ref("trains").push(trainObj);

});

database.ref("trains").on("child_added", function (snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().train);
    console.log(snapshot.val().dest);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().freqMin);

    var months = moment().diff(moment(snapshot.val().startDate),'months')

    var billed = months * snapshot.val().monthlyRate;

    //var monthsWorked = dateAdded - dt1;
    //console.log(dt1);

    $("#full-member-list").append("<div class='row'><div class='col-md-2'>" + snapshot.val().name + "</div>" +
    "<div class='col-md-2'>" + snapshot.val().role + "</div>" +
    "<div class='col-md-2' >" + snapshot.val().startDate + "</div>" +
    "<div class='col-md-2' >" + months + "</div>" +
    "<div class='col-md-2'>" + snapshot.val().monthlyRate + "</div>" +
    "<div class='col-md-2'>" + billed + "</div>" + "</div>");

   


})


