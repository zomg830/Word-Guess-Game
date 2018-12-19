//Initialize answers array with corresponding hints array. Important to note that the answer should be in all caps and that any spaces should be represented with a hyphen.
var answerArray = ["MARS-CONGRESSIONAL-REPUBLIC"];
// var answerArray = ["JAMES-HOLDEN", "NAOMI-NAGATA", "AMOS-BURTON", "ALEX-KAMAL", "ROCINANTE", "CHRISJEN-AVASARALA", "SADAVIR-ERRINWRIGHT", "OUTER-PLANETS-ALLIANCE", "STAR-HELIX-SECURITY", "JOSEPHUS-MILLER", "PROTOMOLECULE","CANTERBURY", "MARS-CONGRESSIONAL-REPUBLIC","ANDERSON-DAWES","TYCHO-STATION", "JULIETTE-ANDROMEDA-MAO","DONNAGER","ROBERTA-DRAPER","NAUVOO","SOLOMON-EPSTEIN","PRAXIDIKE-MENG"];
var hintArray = ["Former XO of the ice hauler Canterbury.", "Former chief engineer of the ice hauler Canterbury.", "Raised as a street urchin in Baltimore.", "Former pilot with the MCRN, honorably discharged after 20 years.", "Corvette-class light frigate seized as legitimate salvage from the MCRN.", "Served as the United Nations Deputy Undersecretary of Executive Administration.", "Earth-born co-conspirator of Jules-Pierre Mao during the Eros incident.", "Separatist organization representing the various peoples of the asteroid belt and gas-giant moons.", "Private security force contracted to Ceres Station.", "Ceres-born detective rarely seen without his porkpie hat.", "Infectious agent of extra-terrestrial origin first discovered on Phoebe.","Retooled water hauler, destroyed while on transit back to Ceres Station.", "Governing body of 'The Red Planet'.", "Worked as the OPA liaison on Ceres during the Eros Incident.","Largest mobile construction platform in the Sol system.", "Oldest child of business magnate Jules-Pierre and pilot of the racing pinnace Razorback.","Flagship of the MCRN's Jupiter fleet.","Martian marine and Gunnery Sergeant of the 2nd Marine Expeditionary Force.","Generation ship constructed at Tycho Station for the Church of Latter Day Saints.","Inventor whose namesake drive allowed humanity to colonize the Asteroid Belt and outer planets.","Chief Botanist of the RMD-Southern soy farm project on Ganymede."];
var incorrect = "";

//Array store to display the URLs and pictures upon completing a specified clue
var urlArray = ["http://expanse.wikia.com/wiki/Jim_Holden_(Books)","http://expanse.wikia.com/wiki/Naomi_Nagata_(Books)", "http://expanse.wikia.com/wiki/Amos_Burton_(Books)", "http://expanse.wikia.com/wiki/Alex_Kamal_(Books)", "http://expanse.wikia.com/wiki/Rocinante_(Books)", "http://expanse.wikia.com/wiki/Chrisjen_Avasarala_(Books)", "http://expanse.wikia.com/wiki/Sadavir_Errinwright_(Books)", "http://expanse.wikia.com/wiki/Outer_Planets_Alliance", "http://expanse.wikia.com/wiki/Star_Helix_Security", "http://expanse.wikia.com/wiki/Josephus_Miller_(Books)", "http://expanse.wikia.com/wiki/Protomolecule","http://expanse.wikia.com/wiki/Canterbury_(Books)", "http://expanse.wikia.com/wiki/Martian_Congressional_Republic","http://expanse.wikia.com/wiki/Anderson_Dawes_(Books)","http://expanse.wikia.com/wiki/Tycho_Station","http://expanse.wikia.com/wiki/Julie_Mao_(Books)","http://expanse.wikia.com/wiki/Donnager","http://expanse.wikia.com/wiki/Bobbie_Draper_(Books)","http://expanse.wikia.com/wiki/Nauvoo","http://expanse.wikia.com/wiki/Solomon_Epstein_(Books)","http://expanse.wikia.com/wiki/Praxidike_Meng_(Books)"];
var picArray = ["assets/images/Holden.jpg", "assets/images/Nagata.jpg", "assets/images/Burton.jpg", "assets/images/Kamal.jpg", "assets/images/Rocinante.jpg", "assets/images/Avasarala.jpg", "assets/images/Errinwright.jpg", "assets/images/OPA.png", "assets/images/Star-Helix.png", "assets/images/Miller.jpg", "assets/images/Protomolecule.jpg","assets/images/Cant.jpg", "assets/images/MCR.png","assets/images/Dawes.jpg","assets/images/Tycho.png","assets/images/Julie_Mao.jpg","assets/images/Donnager.jpg","assets/images/Bobbie.jpg","assets/images/Nauvoo.jpg","assets/images/Epstein.jpg","assets/images/Prax.jpg"];

//Attempting to create game as object, as specified in readme
var guessGame = {
    hint: "",
    currentAnswer: "",
    wins: 0,
    lettersUsed: "",
    answerDiv: "",
    guessesLeft: 0,
    victoryCounter: 0,
    splitAnswer: "",
    hiddenAnswer: "",
    spaces: 0,
    winPic: "",
    winUrl: "",
    difficulty: "",
    initialize: function() {
        //Generates a random number to pull out an answer and hint
        var r = Math.floor(Math.random() * answerArray.length);
        guessGame.currentAnswer = answerArray[r];
        guessGame.hint = hintArray[r];
        guessGame.currentAnswer = this.currentAnswer;
        guessGame.winPic = picArray[r];
        guessGame.winUrl = urlArray[r];

        //Ends game if no clues remaining
        if(answerArray.length === 0){
            alert('You have completed the game! The page will refresh and allow you to play again! Can you beat your previous high score?')
            guessGame.reload();
        }

        //Remove answer and hint once pulled
        answerArray.splice(r,1);
        hintArray.splice(r,1);
        urlArray.splice(r,1);
        picArray.splice(r,1);

        //Using an onload event handler to initialize some HTML content
        window.onload = function(){
            var disp = 
            "<p>Hint: " + guessGame.hint + "</p>" + 
            "<p>Wins: " + guessGame.wins + "</p>" + 
            "<p>Number of Guesses Remaining: " + guessGame.guessesLeft + "</p>" + 
            "<p>Incorrect Guesses: " + incorrect + "</p>"
            document.getElementById("disp").innerHTML = disp;
            document.getElementById("answer").innerHTML = "<h3>" + (guessGame.hiddenAnswer.join(" ")) + "</h3>";
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
                guessGame.hiddenAnswer[i] = "&nbsp";
            }
        }

        //console.log("Length of 'hiddenAnswer' array: " + guessGame.hiddenAnswer.length);
        
        // Splits the answer array
        guessGame.splitAnswer = guessGame.currentAnswer.split("");
        document.getElementById("answer").innerHTML = (guessGame.hiddenAnswer);
        for (var i = 0; i < guessGame.splitAnswer.length; i++){
            if (guessGame.splitAnswer[i]==="-"){
                guessGame.splitAnswer.splice(i,0);
            }
        }

        //Misc. console logs
        console.clear();
        console.log("Current Answer: " + guessGame.currentAnswer);
        console.log("Current Hint: " + guessGame.hint);
        console.log("Split Answer: " + guessGame.splitAnswer);
        console.log("Split Answer Length: " + guessGame.splitAnswer.length);
        console.log("Number of Spaces: " + guessGame.spaces);
        console.log(guessGame.winPic);
        console.log(guessGame.winUrl);
    },

    //Resets the game after running out of guesses or completing the word
    reset: function (){
        guessGame.victoryCounter = 0;
        guessGame.hiddenAnswer = "";
        guessGame.spaces = 0;
        guessGame.lettersUsed = "";
        guessGame.splitAnswer = "";
        guessGame.guessesLeft = guessGame.setDifficulty();
        incorrect = "";
        userGuess="";
        guessGame.initialize();
        guessGame.update();
        document.getElementById("characterPic").innerHTML = "";
        document.getElementById("characterUrl").innerHTML = "";
        document.getElementById("resetBtn").innerHTML = ""; 
    },

    //Updates the HTML window
    update: function (){
        var disp = 
        "<p>Hint: " + guessGame.hint + "</p>" + 
        "<p>Wins: " + guessGame.wins + "</p>" + 
        "<p>Number of Guesses Remaining: " + guessGame.guessesLeft + "</p>" + 
        "<p>Incorrect Guesses: " + incorrect + "</p>"
        document.getElementById("disp").innerHTML = disp;
        document.getElementById("answer").innerHTML = "<h3>" + (guessGame.hiddenAnswer.join(" ")) + "</h3>";
        //console.log(guessGame.hiddenAnswer);
    },

    //Displays the pictures from picArray and creates a button that links to the wiki page in urlArray. Also creates reset button.
    winDisplay: function(){
        var winDispPic = 
        "<img src=" + guessGame.winPic + ' style="display:none" onload="fadeIn(this)">';
        document.getElementById("characterPic").innerHTML = winDispPic;
        var winDispUrl = 
        '<a href=' + guessGame.winUrl + ' target="_blank" class="btn-sm btn-secondary">Click to visit the wiki!</a>';
        document.getElementById("characterUrl").innerHTML = winDispUrl;
        var resetBtn = 
        '<a href="#" class="btn-sm btn-secondary" onclick="guessGame.reset()">Click for the next word!</a>';
        document.getElementById("resetBtn").innerHTML = resetBtn;
    },

    //Reloads the game after exhausting all the answers
    reload: function(){
        window.location.reload();
    },

    //Prompts the user to input the difficulty at the initialization of the game session
    initDifficulty: function(){
        var difficulty = prompt('Select your difficulty by typing "Ensign" (beginner - 10 guesses), "Captain" (medium - 8 guesses), or "Admiral" (hard - 6 guesses)');
        if (difficulty==="Ensign" || difficulty==="ensign"){
            guessGame.difficulty = "1";
        }
        else if (difficulty==="Captain" || difficulty==="captain"){
            guessGame.difficulty = "2";
        }
        else if (difficulty==="Admiral" || difficulty==="admiral"){
            guessGame.difficulty = "3";
        }
        else {
            guessGame.initDifficulty();
        }
    },

    //Function is called by the guessesLeft property to set the number of incorrect guesses allowed based on difficulty
    setDifficulty: function(){
        if (guessGame.difficulty==="1"){
            return 10;
        }
        if (guessGame.difficulty==="2"){
            return 8;
        }
        if (guessGame.difficulty==="3"){
            return 6;
        }
    },
}
//End of guessGame object


//Initialize the game with some console logs for debugging
guessGame.initialize();
guessGame.initDifficulty();
guessGame.setDifficulty();
guessGame.guessesLeft = guessGame.setDifficulty();
console.log("Guesses based on difficulty: " + guessGame.setDifficulty());

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
                    // guessGame.reset();
                    guessGame.winDisplay();
                }
            }
        }
        if (counter === 0){
            guessGame.guessesLeft = guessGame.guessesLeft - 1;
            guessGame.lettersUsed += userGuess;
            incorrect += " " + userGuess;
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

