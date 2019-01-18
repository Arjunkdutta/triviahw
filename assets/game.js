$(document).ready(function() {

//all questions and answer information
var questions = {
    zero: {
        question: "WICH ONE OF THESE CARS IS MANUFACTURED IN GERMANY",
        answers: ["MASERATI", "BMW", "NISSAN", "JAGUAR"],
        correct: "BMW"
    },
    one: {
     	question: "WHICH CAR IS KNOWN FOR ITS HORSE LOGO",
        answers: ["FERRARI", "VALVO", "MECEDES BENZ", "BENTLEY"],
        correct: "FERRARI"
    },

      three: {
     	question: "WHICH OF THESE CARS IS CONSIDERED A HYBRID/ELECTRIC?",
        answers: ["BMW M3", "TESLA MODEL 3", "LAMBORGHINI AVENTADOR", "MERCEDES S63 AMG"],
        correct: "TESLA MODEL 3"
    },

      four: {
     	question: "WHICH CAR ENGINE HAS THE MOST CYLINDERS?",
        answers: ["2015 BMW 750LI", "2015 MERCEDES G65", " 2015 NISSAN GTR", "2015 JAGUAR XE"],
        correct: "2015 MERCEDES G65"
    },

      five: {
     	question: "How much horse power did the first Porsche 911 have?",
        answers: ["35", "90", "130", "290"],
        correct: "130"
    },

      six: {
     	question: "WHICH CAR IS MANUFACTURED IN ITALY",
        answers: ["PORSCHE", "NISSAN", "TOYOTA", "MASERATI"],
        correct: "MASERATI"
    },

      seven: {
     	question: "WHICH COMPANY MANUFACTURES MUSTANGS",
        answers: ["BMW", "CADILLAC", "CHEVY", "FORD"],
        correct: "FORD"
    },

      eight: {
     	question: "WHAT CAR BRAND DOES JAMES BOND DRIVE?",
        answers: ["FERRARI", "BUGATTI", "ASTON MARTIN", "PORSCHE"],
        correct: "ASTON MARTIN"
    },

      nine: {
     	question: "WHEN WAS THE FIRST SPEEDING TICKET ISSUED?",
        answers: ["2013", "1902", "2002", "1999"],
        correct: "1902"
    },

      ten: {
     	question: "WHICH CAR BRAND IS MANUFACTURED IN ENGLAND?",
        answers: ["RANGE ROVER", "PORSCHE", "AUDI", "MERCEDES"],
        correct: "RANGE ROVER"
    },
};

var rightDiv = $("<div class='rightAns'></div>");
var timerDiv = $("<div class='countdown'><h3></h3></div>");
var questionDiv = $("<div class='question'><h3></h3></div>");
var answerDiv = $("<div class='answers'></div>");

var keys = Object.keys(questions);
var key = keys[n];
var time = 30;
var n = 0;

function setup() {
    $(".start").css("display", "none");

	var correct = 0;
	var incorrect = 0;
    var timeout = 0;
    n = 0;
    key = keys[n];

    var reset = function() {
        time = 30;
        $(".rightAns").empty();
        $(".rightAns").remove();
        $(".main").append(timerDiv);
        $(".countdown h3").html("TIME REMAINING: " + time);
        $(".main").append(questionDiv);
        $(".main").append(answerDiv);
    }

reset();

function showQA() {
    $(".question h3").html(questions[key].question);
        
    for (var i = 0; i < questions[key].answers.length; i++) {
       	$(".answers").append("<p class='answer'>" + questions[key].answers[i] + "<p>");
    }
            
    $(".answers p").on("click", function() {
        var selected = $(this).text();

            if (selected === questions[key].correct) {
                clearInterval(counter);
                $(timerDiv).remove();
                $(questionDiv).remove();
                $(".answers p").remove();
                $(answerDiv).remove();
               	$(".main").append(rightDiv);
                $(".rightAns").text("YOURE RIGHT");
                correct++;
            } else {
                clearInterval(counter);
                $(timerDiv).remove();
                $(questionDiv).remove();
                $(".answers p").remove();
                $(answerDiv).remove();
                $(".main").append(rightDiv);
                $(".rightAns").text("YOURE WRONG ITS : " + questions[key].correct);
                incorrect++;
            }
            n++;
            key = keys[n];

                if (checkIfLast()) {
                	displayFinalScore();

                } else {
                    setTimeout(countReset, 3000);
                    setTimeout(reset, 3000);
                    setTimeout(showQA, 3000);
                }
    });
}

showQA();

var counter = setInterval(count, 500);

function count() {
    time--
    $(".countdown h3").html("TIME REMAINING: " + time);
     
    if (time < 1) {
    clearInterval(counter);
    $(timerDiv).remove();
    $(questionDiv).remove();
    $(".answers p").remove();
    $(answerDiv).remove();
    $(".main").append(rightDiv);
    $(".rightAns").html("OUT OF TIME! ITS: " + questions[key].correct);
    timeout++;
    n++;
    key = keys[n];
    
    	if (checkIfLast()) {
    	displayFinalScore();
    	} else {
    	setTimeout(countReset, 3000);
    	setTimeout(reset, 3000);
    	setTimeout(showQA, 3000);
    	}
    }
}

function checkIfLast() {
    if (key === undefined) {
    return true;
    }
    return false;
    }

 function countReset() {
    counter = setInterval(count, 500);
}


function displayFinalScore() {
    $(".rightAns").remove();
    $(".start").css("margin-top", "30px");
    $(".start").css("display", "inline");
    $(".main").prepend("<h2>UNANSWERED: " + timeout + "</h2>");
    $(".main").prepend("<h2>INCORRECT: " + incorrect + "</h2>");
    $(".main").prepend("<h2>CORRECT: " + correct + "</h2>");
	}
};

$(document).on("click", ".start", setup);

});