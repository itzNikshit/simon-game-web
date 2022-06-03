var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var lvl = 0;
var started = false;

function checkPattern(currLvl) {
  if(userClickedPattern[currLvl] === gamePattern[currLvl]) {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      },1000);
    }
  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    started = false;
    lvl = 0;
    gamePattern = [];
    console.log("wrong");
  }
}

function nextSequence() {
  userClickedPattern = [];
  lvl++;
  $("#level-title").text("Level " + lvl);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// $(".btn").click(function() {
//   var userChosenColor = $(this).attr("id");
//   userClickedPattern.push(userChosenColor);
//   playSound(userChosenColor);
//   animatePress(userChosenColor);
//   checkPattern(userClickedPattern.length - 1);
// });

$(document).on("click", function(event) {
  var userChosenColor = event.target.id;
  if(userChosenColor === "red" || userChosenColor === "blue" || userChosenColor === "green" || userChosenColor === "yellow") {
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    console.log(userClickedPattern);
    checkPattern(userClickedPattern.length - 1);
  }
});

$(document).on("keypress", function() {
  if(!started) {
    nextSequence();
    started = true;
  }
});

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
  },100);
}
// window.onload = function () {
//   setTimeout(function () {
//     nextSequence();
//   },2000);
// }
