//Initialize answers array with corresponding hints array. Important to note that the answer should be in all caps and that any spaces should be represented with a hyphen.
var answerArray = ["JAMES-HOLDEN", "NAOMI-NAGATA", "AMOS-BURTON", "ALEX-KAMAL", "ROCINANTE", "CHRISJEN-AVASARALA", "SADAVIR-ERRINWRIGHT", "OUTER-PLANETS-ALLIANCE", "STAR-HELIX-SECURITY", "JOSEPHUS-MILLER", "PROTOMOLECULE"];
var hintArray = ["Former XO of the ice hauler Canterbury.", "Former chief engineer of the ice hauler Canterbury.", "Raised as a street urchin in Baltimore.", "Former pilot with the MCRN, honorably discharged after 20 years.", "Corvette-class light frigate seized as legitimate salvage from the MCRN.", "Served as the United Nations Deputy Undersecretary of Executive Administration.", "Earth-born co-conspirator of Jules-Pierre Mao during the Eros incident.", "Separatist organization representing the various peoples of the asteroid belt and gas-giant moons.", "Private security force contracted to Ceres Station.", "Ceres-born detective rarely seen without his porkpie hat.", "Infectious agent of extra-terrestrial origin first discovered on Phoebe."];
var incorrect = "";



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
    spaces: 0,
    initialize: function() {
        //Generates a random number to pull out an answer and hint
        var r = Math.floor(Math.random() * answerArray.length);
        guessGame.currentAnswer = answerArray[r];
        guessGame.hint = hintArray[r];
        guessGame.currentAnswer = this.currentAnswer;

        //Using an onload event handler to initialize some HTML content
        window.onload = function(){
            var disp = 
            "<p>Hint: " + guessGame.hint + "</p>" + 
            "<p>Wins: " + guessGame.wins + "</p>" + 
            "<p>Number of Guesses Remaining: " + guessGame.guessesLeft + "</p>" + 
            "<p>Incorrect Guesses: " + incorrect + "</p>"
            document.getElementById("disp").innerHTML = disp;
            document.getElementById("answer").innerHTML = "<h2>" + (guessGame.hiddenAnswer.join(" ")) + "</h2>";
        }

        //Calculates the number of spaces for the win condition logic
            for (var i = 0; i < guessGame.currentAnswer.length; i++){
                var character = guessGame.currentAnswer[i];
                if(character === "-"){
                    guessGame.spaces++;
                }
        }


        //Split the array item into individual letters to allow indexing based on user input
        guessGame.hiddenAnswer = new Array (guessGame.currentAnswer.length);
        guessGame.hiddenAnswer = guessGame.hiddenAnswer.fill("_");

        //Sort through the array to format the display of spaces in the HTML page
        for (i = 0; i < guessGame.currentAnswer.length; i++){
            if (guessGame.currentAnswer[i] === "-"){
                guessGame.hiddenAnswer[i] = "-";
            }
        }

        console.log("Length of 'hiddenAnswer' array: " + guessGame.hiddenAnswer.length);
        
        // Splits the answer array?
        guessGame.splitAnswer = guessGame.currentAnswer.split("");
        document.getElementById("answer").innerHTML = (guessGame.hiddenAnswer);
        for (var i = 0; i < guessGame.splitAnswer.length; i++){
            if (guessGame.splitAnswer[i]==="-"){
                guessGame.splitAnswer.splice(i,0);
            }
        }
    },

    //Resets the game after running out of guesses or completing the word
    reset: function (){
        guessGame.victoryCounter = 0;
        guessGame.hiddenAnswer = "";
        guessGame.spaces = 0;
        guessGame.lettersUsed = "";
        guessGame.splitAnswer = "";
        guessGame.guessesLeft = 10;
        incorrect = "";
        userGuess="";
        guessGame.initialize();
        guessGame.update();
    
    //Updates the HTML window 
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
}
//End of guessGame object


//Initialize the game with some console logs for debugging
guessGame.initialize();
console.log("Current Answer: " + guessGame.currentAnswer);
console.log("Current Hint: " + guessGame.hint);
console.log("Split Answer: " + guessGame.splitAnswer);
console.log("Split Answer Length: " + guessGame.splitAnswer.length);
console.log("Number of Spaces: " + guessGame.spaces);

//Primary logic for game
document.onkeyup = function(event) {
    var counter = 0; //index counter, if it returns -1, letter does not exist 
    var userGuess = String.fromCharCode(event.keyCode).toUpperCase(); //Takes keyboard input from user, capitalizes it

    //Begin primary if statement
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
                console.log("Victory counter : " + guessGame.victoryCounter);
                if (guessGame.victoryCounter === (guessGame.splitAnswer.length - guessGame.spaces)){
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

