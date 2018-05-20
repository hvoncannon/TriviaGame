var question1 = {
    Question: "Which 1997 film stars Nicolas Cage, John Cusack, and John Malkovich?",
    A1: "The Usual Suspects",
    A2: "Con Air",
    A3: "Falling Down",
    A4: "Air Force One",
    cA: "Con Air"
}

var question2 = {
    Question: "Which of the following is not a Wes Anderson Film?",
    A1: "The Life Aquatic",
    A2: "Moonrise Kindgom",
    A3: "Lost in Translation",
    A4: "Rushmore",
    cA: "Lost in Translation"
}

var question3 = {
    Question: "What actor appeared in American Graffiti before starring in Star Wars?",
    A1: "Harrison Ford",
    A2: "Carrie Fisher",
    A3: "Samuel L. Jackson",
    A4: "Michael Keaton",
    cA: "Harrison Ford"
}

var question4 = {
    Question: "What state does the film Dazed and Confused take place in?",
    A1: "California",
    A2: "North Carolina",
    A3: "Texas",
    A4: "Florida",
    cA: "Texas"
}

var question5 = {
    Question: "What was the name of the whale in Free Willy?",
    A1: "Whaley the Whale",
    A2: "Keiko",
    A3: "Finn",
    A4: "Ichi",
    cA: "Keiko"
}

var question6 = {
    Question: "Who played the titular role in the 1931 film Dracula?",
    A1: "Bela Lugosi",
    A2: "Boris Karloff",
    A3: "Humphrey Bogart",
    A4: "Johnny Depp",
    cA: "Bela Lugosi"
}

var question7 = {
    Question: "Which horror character kills people in their dreams?",
    A1: "Jason",
    A2: "Michael Myers",
    A3: "Freddy",
    A4: "Robocop",
    cA: "Freddy"
}

var question8 = {
    Question: "What is the name of the elf who joins the Fellowship of the Ring?",
    A1: "Gimli",
    A2: "Legolas",
    A3: "Aragorn",
    A4: "Bilbo",
    cA: "Legolas"
}

var question9 = {
    Question: "Who plays the drag queen character John 'Bunny' Breckinridge in the film Ed Wood?",
    A1: "Bill Murray",
    A2: "Will Ferrell",
    A3: "John Candy",
    A4: "Michael Fassbender",
    cA: "Bill Murray"
}

var question10 = {
    Question: "Which character from Jurassic Park is a paleobotanist?",
    A1: "Ian Malcolm",
    A2: "Alan Grant",
    A3: "John Hammond",
    A4: "Ellie Sattler",
    cA: "Ellie Sattler"
}



var questionsArray = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];
var questionsPosition = 0;
var questionsRemaining = 10;
var wrongAnswers = 0;
var rightAnwers = 0;
var qDiv = $("#questionDiv");
var aDiv = $("#answersDiv");
var tDiv = $("#timerDiv");
var time = 30;
//defining a global variable to hold our setInterval
var qTimer;

//this function starts a new timer, and ends the timer if the time runs out then pulls the new question
function newTimer() {
    time = 30;
    tDiv.html("<h5>" + time + "</h5>");
    qTimer = setInterval(timerFunction, 1000);
    function timerFunction() {
        time--;
        tDiv.html("<h5>" + time + "</h5>");
        if (time <= 0 && questionsPosition === 9) {
            clearInterval(qTimer);
            wrongAnswers++;
            questionsRemaining--;
            aDiv.html('You ran out of time! That counts as a wrong answer ¯\\_(ツ)_/¯' + "<div class='d-flex justify-content-center>The correct answer was: " + questionsArray[questionsPosition].cA + "</div>" + "<div class='d-flex justify-content-center'>Questions Remaining: " + questionsRemaining + "</div>")
            setTimeout(showResult, 4000);
        }
        else if (time <= 0) {
            clearInterval(qTimer);
            wrongAnswers++;
            questionsRemaining--;
            aDiv.html('You ran out of time! That counts as a wrong answer ¯\\_(ツ)_/¯' + "<div class='d-flex justify-content-center'>The correct answer was: " + questionsArray[questionsPosition].cA + "</div>" + "<div class='d-flex justify-content-center'>Questions Remaining: " + questionsRemaining + "</div>")
            questionsPosition++;
            setTimeout(function () {
                showQuestion(questionsPosition)
            }, 4000
            )
        }
    }
}

// event listener for user selecting an answer, on correct will show next question, on wrong will show correct answer then move to next question, at final question it shows results in either case
$("body").on("click", "button", function () {
    if ($(this).text() === questionsArray[questionsPosition].cA && questionsPosition === 9) {
        rightAnwers++;
        questionsRemaining--;
        clearInterval(qTimer);
        aDiv.html("<div class='d-flex justify-content-center'>Correct, you have finished the game!</div>");
        setTimeout(showResult, 4000);
    }

    else if ($(this).text() !== questionsArray[questionsPosition].cA && questionsPosition === 9) {
        wrongAnswers++;
        questionsRemaining--;
        clearInterval(qTimer);
        aDiv.html("Wrong Answer!" + "<div class='d-flex justify-content-center'>The correct answer was: " + questionsArray[questionsPosition].cA + "</div>" + "<div class='d-flex justify-content-center'>Questions Remaining: " + questionsRemaining + "</div>");
        setTimeout(showResult, 4000);
    }

    else if ($(this).text() === questionsArray[questionsPosition].cA) {
        aDiv.html("<div class='d-flex justify-content-center'>Correct!</div>" + "<div class='d-flex justify-content-center'>Questions Remaining: " + questionsRemaining + "</div>");
        questionsPosition++;
        rightAnwers++;
        questionsRemaining--;
        clearInterval(qTimer);
        setTimeout(function () {
            showQuestion(questionsPosition);
        }, 4000);
    }

    else if ($(this).text() !== questionsArray[questionsPosition].cA && $(this).text() !== "Play Now") {
        aDiv.html("<div class='d-flex justify-content-center'>Wrong Answer!</div>" + "<div class='d-flex justify-content-center'>The correct answer was: " + questionsArray[questionsPosition].cA + "</div>" + "<div class='d-flex justify-content-center'>Questions Remaining: " + questionsRemaining + "</div>");
        questionsPosition++;
        wrongAnswers++;
        questionsRemaining--;
        clearInterval(qTimer);
        setTimeout(function () {
            showQuestion(questionsPosition)
        }, 4000)
    }

    else {
        showQuestion(questionsPosition);
    }
})

//function displaying info at end of game
function showResult() {
    qDiv.html("Game Over");
    aDiv.html("<div class='d-flex justify-content-center'>You got " + rightAnwers + " correct & " + wrongAnswers + " wrong.</div>" + "<div class='d-flex justify-content-center'> <button class='btn btn-secondary btn-sm m-2 btn-block' onclick='window.location.reload()'>Play Again</div>");
}

//this renders the questions and answer choice on the screen
var showQuestion = function (i) {
    newTimer();
    qDiv.html("<h4>" + questionsArray[i].Question + "</h4>");
    aDiv.html(["<div> <button class='btn btn-secondary btn-sm m-2 btn-block'>" + questionsArray[i].A1 + "</div> </button>", "<div> <button class='btn btn-secondary btn-sm m-2 btn-block'>" + questionsArray[i].A2 + "</div> </button>", "<div> <button class='btn btn-secondary btn-sm m-2 btn-block'>" + questionsArray[i].A3 + "</div> </button>", "<div> <button class='btn btn-secondary btn-sm m-2 btn-block'>" + questionsArray[i].A4 + "</div> </button>"])
}

//shows the instructions and a play now button
function gameLoad() {
    qDiv.html("<div class='d-flex justify-content-center text-align-center'>You will have 30 seconds to answer each question. There are 10 questions, and your score will be shown at the end.</div> <div class='d-flex justify-content-center mt-1'>Press the button below to play and have fun!</div>")
    aDiv.html("<button class='btn btn-secondary btn-sm m-2 btn-block'>Play Now</button>");
}

gameLoad();