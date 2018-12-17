//Initialize answers array with corresponding hints array
var answerArray = ["JAMES-HOLDEN", "NAOMI-NAGATA", "AMOS-BURTON", "ALEX-KAMAL", "ROCINANTE", "CHRISJEN-AVASARALA", "SADAVIR-ERRINWRIGHT", "OUTER-PLANETS-ALLIANCE", "STAR-HELIX-SECURITY", "JOSEPHUS-MILLER", "PROTOMOLECULE"];
var hintArray = ["Former XO of the ice hauler Canterbury.", "Former chief engineer of the ice hauler Canterbury.", "Raised as a street urchin in Baltimore.", "Former pilot with the MCRN, honorably discharged after 20 years.", "Corvette-class light frigate seized as legitimate salvage from the MCRN.", "Served as the United Nations Deputy Undersecretary of Executive Administration.", "Earth-born co-conspirator of Jules-Pierre Mao during the Eros incident.", "Separatist organization representing the various peoples of the asteroid belt and gas-giant moons.", "Private security force contracted to Ceres Station.", "Ceres-born detective rarely seen without his porkpie hat.", "Infectious agent of extra-terrestrial origin first discovered on Phoebe."];
var incorrect = "";

//Output the arrays above to the console for debugging, comment out at later version
// console.log(answerArray);
// console.log(hintArray);

//Attempting to create game as object, as specified in readme
var guessGame = {
    hint: "",
    currentAnswer: "",
    wins: 0,
    guessesLeft: 10,
    lettersUsed: "",
    answerDiv: "",
    victoryCounter: 0,
    splitAnswer: "",
    hiddenAnswer: "",
    initialize: function() {
        //Generates a random number to pull out an answer and hint
        var r = Math.floor(Math.random() * answerArray.length);
        guessGame.currentAnswer = answerArray[r];
        guessGame.hint = hintArray[r];
        guessGame.currentAnswer = this.currentAnswer;
        //Split the array item into individual letters to allow indexing based on user input
        guessGame.hiddenAnswer = new Array (guessGame.currentAnswer.length);
        guessGame.hiddenAnswer = guessGame.hiddenAnswer.fill("_");
        for (i = 0; i < guessGame.currentAnswer.length; i++){
            if (guessGame.currentAnswer[i] === "-"){
                guessGame.hiddenAnswer[i] = "-";
            }
        }
        console.log("Length of 'hiddenAnswer' array: " + guessGame.hiddenAnswer.length);
        guessGame.splitAnswer = guessGame.currentAnswer.split("");
        document.getElementById("answer").innerHTML = (guessGame.hiddenAnswer);
        for (var i = 0; i < guessGame.splitAnswer.length; i++){
            if (guessGame.splitAnswer[i]==="-"){
                guessGame.splitAnswer.splice(i,0);
            }
        }
      },
    reset: function (){
        guessGame.victoryCounter = 0;
        guessGame.lettersUsed = "";
        guessGame.splitAnswer = "";
        guessGame.guessesLeft = 10;
        guessGame.initialize();
        guessGame.update();
    },
    update: function (){
        var disp = 
        "<p>Hint: " + guessGame.hint + "</p>" + 
        "<p>Wins: " + guessGame.wins + "</p>" + 
        "<p>Number of Guesses Remaining: " + guessGame.guessesLeft + "</p>" + 
        "<p>Incorrect Guesses: " + incorrect + "</p>"
        document.getElementById("disp").innerHTML = disp;
        document.getElementById("answer").innerHTML = "<h3>" + (guessGame.hiddenAnswer.join(" ")) + "</h3>";
        console.log(guessGame.hiddenAnswer);
    },
    // reveal: function(userGuess){
    //     for (var i = 0; i < guessGame.currentAnswer.length; i++){
    //         if (guessGame.currentAnswer[i] === userGuess){
    //             guessGame.hiddenAnswer[i] = guess;
    //             console.log("Answer Progress: " + guessGame.hiddenAnswer);
    //         }    
    //     }
    // }   
}

guessGame.initialize();
console.log("Current Answer: " + guessGame.currentAnswer);
console.log("Current Hint: " + guessGame.hint);
console.log("Split Answer: " + guessGame.splitAnswer);
//Initialize guess variable and capture key pressed
window.onload = function(){
    var disp = 
    "<p>Hint: " + guessGame.hint + "</p>" + 
    "<p>Wins: " + guessGame.wins + "</p>" + 
    "<p>Number of Guesses Remaining: " + guessGame.guessesLeft + "</p>" + 
    "<p>Incorrect Guesses: " + incorrect + "</p>"
    document.getElementById("disp").innerHTML = disp;
    document.getElementById("answer").innerHTML = "<h2>" + (guessGame.hiddenAnswer.join(" ")) + "</h2>";
}

document.onkeyup = function(event) {
    var counter = 0;
    var userGuess = String.fromCharCode(event.keyCode).toUpperCase();

    if (guessGame.lettersUsed.indexOf(userGuess) < 0){
        for (var i = 0; i < guessGame.splitAnswer.length; i++){
            if (userGuess === guessGame.splitAnswer[i]){
                console.log(guessGame.splitAnswer[i] + " Match!");
                guessGame.hiddenAnswer[i] = userGuess;
                console.log("Answer Progress: " + guessGame.hiddenAnswer);
                guessGame.victoryCounter++;
                console.log("Victory Counter: " + guessGame.victoryCounter);
                counter++;
                guessGame.lettersUsed += userGuess;
                console.log(guessGame.lettersUsed);
                if (guessGame.victoryCounter === (guessGame.splitAnswer.length - spaces)){
                    guessGame.wins++;
                    alert ("Your score is: " + guessGame.wins + " wins");
                    guessGame.reset();
                }
            }
        }
        if (counter === 0){
            guessGame.guessesLeft = guessGame.guessesLeft - 1;
            guessGame.lettersUsed += userGuess;
            incorrect += userGuess;
            guessGame.update();
        }
        counter = 0;

        guessGame.update();
        if (guessGame.guessesLeft === 0){
            alert("You are out of guesses, please try again.")
            guessGame.reset();
        }
    }
}

//Counts the number of spaces in each answer, used to assist in victory condition logic.
var spaces = 0;
for (var i = 0; i < guessGame.splitAnswer.length; i++){
    var character = guessGame.splitAnswer[i];
    if(character === "-"){
        spaces++;
    }
}

console.log("Number of Spaces: " + spaces);