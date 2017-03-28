var GAME = GAME || {};

GAME.text = {

    setup: "Your day begins just like any other. But, when you arrive at school you sense that something’s not quite right. Your normal teachers and classmates are missing. You try to make a break for it, but you notice the doors are locked from the outside. It quickly dawns on you that you’re TRAPPED in the school. Because you’re a computer whiz, you notice that the locks to exit the school are guarded by a four-part secret password. Search each room for clues. Use TEAMWORK and your programming skills to decipher each part of the password. Then ESCAPE FROM THE SCHOOL."
};

GAME.output = document.getElementById("output");
GAME.overlay = document.getElementById("canvas-overlay");
GAME.locationSpan = document.getElementById("dynamic-location");
GAME.input = document.getElementById("input");

GAME.exitInput = document.getElementById("exitInput");
GAME.roomOneText = document.getElementById("roomOneText");
GAME.roomTwoText = document.getElementById("roomTwoText");
GAME.roomThreeText = document.getElementById("roomThreeText");
GAME.roomFourText = document.getElementById("roomFourText");
GAME.FinalInputButton = document.getElementById("FinalInputButton");

GAME.initialBackgroundImage = new Image();
GAME.initialBackgroundImage.src = "./assets/img/title.jpg";

GAME.map = new Image();
GAME.map.src = "./assets/img/map.jpg";

GAME.you = new Image();
GAME.you.src = "./assets/img/youAreHere.png";

GAME.roomOne = new Image();
GAME.roomOne.src = "./assets/img/roomOne.jpg";

GAME.roomTwo = new Image();
GAME.roomTwo.src = "./assets/img/roomTwo.jpg";

GAME.roomThree = new Image();
GAME.roomThree.src = "./assets/img/roomThree.jpg";

GAME.roomFour = new Image();
GAME.roomFour.src = "./assets/img/roomFour.jpg";

GAME.exitImage = new Image();
GAME.exitImage.src = "./assets/img/exitImage.jpg";

GAME.locations = ["Hallway", "Room 1", "Room 2", "Room 3", "Room 4"];
GAME.commands = ["Forward", "Backward", "Left", "Right", "Inventory", "Health"];
GAME.grid =
    [
        [0,0], [0,1], [0,2],
        [1,0], [1,1], [1,2]
    ];

GAME.coordinates =
    [
        [68,43], [269,43], [469,43],
        [68,194], [269,194], [469,194]
    ];

GAME.addEvent = function(element, myEvent, fnc) {
    element.addEventListener(myEvent, fnc, false);
};

GAME.displayText = function (element, text, index) {
    if (index < text.length) {
        element.innerHTML += text[index++];
        setTimeout(function () { GAME.displayText(element, text, index); }, 50);
    }
};

GAME.appendText = function (text, index) {
    var newFirstElement = document.createElement("p");
    GAME.output.insertBefore(newFirstElement, GAME.output.firstElementChild);
    GAME.displayText(newFirstElement, text, index);
};

GAME.checkValidMove = function(a, b){
    // checks if a is in b
    var match = false;
    var grid;
    for (var i = b.length; i--;) {
        grid = b[i];
        if (grid[0] == a[0] && grid[1] == a[1]) {
            match = true;
        }
    }
    return match;
};

GAME.getRoom = function(p){
    var coords = p.getCoordinates();
    console.log(coords)
    if (coords[0] === 68 && coords[1] === 194){
        GAME.roomOneModule.init();
    } else if (coords[0] === 470 && coords[1] === 194) {
        GAME.roomTwoModule.init();
    } else if (coords[0] === 68 && coords[1] === 43) {
        GAME.roomThreeModule.init();
    } else if (coords[0] === 470 && coords[1] === 43) {
        GAME.roomFourModule.init();
    } else if (coords[0] === 269 && coords[1] === 194) {
        GAME.HallwayAndMapModule.init();
    } else {
        GAME.HallwayAndMapModule.init();
    }
};

GAME.roomOneModule = (function(){
    function showImages() {
        GAME.overlay.style.display = "block";
        GAME.appendText("In ROOM 1, you notice a computer screen like that above. The TOP SECRET information is protected by a CSS DIV which overlays the first part of the password. If only you could use Chrome's Developer tools to take a peek at the image that's being hidden by the DIV...", 0);
        GAME.gameCanvas.drawImage(GAME.roomOne, 0, 0);
        GAME.locationSpan.innerHTML = "Room 1";
    }
    function init() {
        showImages();

    }
    return {
        init: init
    };
}());

GAME.roomTwoModule = (function(){
    function showImages() {
        GAME.overlay.style.display = "hidden";
        GAME.appendText("In ROOM 2 you notice calculations that lead you to believe that the second part of the password is the sum of all even numbers between 0 and 100. You don't have time to work this number out on paper or with a calculator, but you CAN write a JavaScript function to do it for you.", 0);
        GAME.gameCanvas.drawImage(GAME.roomTwo, 0, 0);
        GAME.locationSpan.innerHTML = "Room 2";
    }
    function init() {
        showImages();
    }
    return {
        init: init
    };
}());

GAME.roomThreeModule = (function(){
    function showImages() {
        GAME.overlay.style.display = "hidden";
        GAME.appendText("In Room 3, you find a data file with the following encrypted code: mqazxporiwkdjmsdvcxmtibdalpgdjfurutdmkoemsjdsfgtewsdxsdetfghtonamdsloightresdfgtbfwpolkmnjtuiomkjdfr You also find some scribblings which indicate that the password is comprised of every tenth letter of the code.", 0);
        GAME.gameCanvas.drawImage(GAME.roomThree, 0, 0);
        GAME.locationSpan.innerHTML = "Room 3";
    }
    function init() {
        showImages();
    }
    return {
        init: init
    };
}());

GAME.roomFourModule = (function(){
    function showImages() {
        GAME.overlay.style.display = "hidden";
        GAME.appendText("The fourth password is an ISOGRAM (search for it) embedded in code. You'll need to crack the code by piecing together the letters that are only used once in the following code: qjozwpqmqzvakytohfuuinwwdxexvbsgwmrjbkccslylg", 0);
        GAME.gameCanvas.drawImage(GAME.roomFour, 0, 0);
        GAME.locationSpan.innerHTML = "Room 4";
    }
    function init() {
        showImages();
    }
    return {
        init: init
    };
}());

GAME.HallwayAndMapModule = (function(){
    function showImages() {
        GAME.overlay.style.display = "hidden";
        //GAME.appendText("This is where we will show the map", 0);
        GAME.gameCanvas.drawImage(GAME.map, 0, 0);
        GAME.gameCanvas.drawImage(GAME.you, GAME.player.coordinates[0], GAME.player.coordinates[1]);
        GAME.locationSpan.innerHTML = "The Hallway";
    }
    function init() {
        showImages();
    }
    return {
        init: init
    };
}());

GAME.ExitModule = (function(){
    function showImages() {
        GAME.overlay.style.display = "hidden";
        GAME.locationSpan.innerHTML = "The Exit";
        GAME.exitInput.style.display = "block";
        GAME.input.style.display = "none";
        console.log(GAME.exitInput);
    }

    function processExitInputs(e) {
        e.preventDefault();

        var valOne = GAME.roomOneText.value.toLowerCase();
        showInputFields(GAME.roomOneText, valOne === "cssmaster");

        var valTwo = GAME.roomTwoText.value.toLowerCase();
        showInputFields(GAME.roomTwoText, valTwo === "2450");

        var valThree = GAME.roomThreeText.value.toLowerCase();
        showInputFields(GAME.roomThreeText, valThree === "wmjewhitjr");

        var valFour = GAME.roomFourText.value.toLowerCase();
        showInputFields(GAME.roomFourText, valFour === "pathfinder");

        if(valOne === "cssmaster" && valTwo === "2450" && valThree === "wmjewhitjr" && valFour === "pathfinder") {
            showFinalImage();
        }

        function showInputFields(element, bool) {
            var color, text;
            if (bool) {
                color = "green";
                text = "Correct!";
            } else {
                color = "red";
                text = "Incorrect!";
            }
            element.style.backgroundColor = color;
            element.value = text;
        }

        function showFinalImage() {
            GAME.gameCanvas.drawImage(GAME.exitImage, 0, 0);
            GAME.appendText("CONGRATULATIONS - YOU'VE ESCAPED!", 0);
        }
    }

    function init() {
        showImages();
        GAME.addEvent(GAME.FinalInputButton, "click", processExitInputs);
    }

    return {
        init: init
    };

}());

GAME.loadModule = (function(){
    var bindings = {};
    var doc = document;
    function setupBindings() {
        bindings.startButton = doc.getElementById("startButton");
        bindings.startForm = doc.getElementById("startForm");
        bindings.gameDisplay = doc.getElementById("game-display");
    }

    function startGameFunction(e) {
        e.preventDefault();
        bindings.startForm.style.visibility = "hidden";
        bindings.gameDisplay.style.display = "block";
        GAME.appendText(GAME.text.setup, 0);
        GAME.gameCanvas.drawImage(GAME.map, 0, 0);
        GAME.gameCanvas.drawImage(GAME.you, GAME.player.coordinates[0], GAME.player.coordinates[1]);
        GAME.proccessInputModule.init();
    }

    function init() {
        setupBindings();
        GAME.addEvent(bindings.startButton, "click", startGameFunction);
    }
    return {
        init: init
    };
}());

GAME.proccessInputModule = (function(){
    var bindings = {};
    var doc = document;
    function setupBindings() {
        bindings.inputButton = doc.getElementById("userInputButton");
        bindings.userTextArea = doc.getElementById("userTextArea");
    }

    function processInputFunction() {
        var inputValue = document.getElementById("userTextArea").value;
        var lowercaseValue = inputValue.toLowerCase();
        switch (lowercaseValue) {
            case "map": {
                GAME.player.coordinates = [269,194];
                GAME.getRoom(GAME.player);
                break;
            }
            case "exit": {
                GAME.ExitModule.init();
                break;
            }
            case "forward": {
                // to pass the correct value, we need to copy the array
                var copy = GAME.player.location.slice();
                if (GAME.checkValidMove([copy[0]-1, copy[1]], GAME.grid)) {
                    --GAME.player.location[0];
                    GAME.player.coordinates[1] -= 151;
                    GAME.getRoom(GAME.player);
                } else {
                    GAME.appendText("You can't move forward", 0);
                }
                break;
            }
            case "back": {
                // to pass the correct value, we need to copy the array
                var copy2 = GAME.player.location.slice();
                if (GAME.checkValidMove([copy2[0]+1, copy2[1]], GAME.grid)) {
                    ++GAME.player.location[0];
                    GAME.player.coordinates[1] += 151;
                    GAME.getRoom(GAME.player);
                } else {
                    GAME.appendText("You can't move back", 0);
                }
                break;
            }
            case "left": {
                // to pass the correct value, we need to copy the array
                var copy3 = GAME.player.location.slice();
                if (GAME.checkValidMove([copy3[0], copy3[1]-1], GAME.grid)) {
                    --GAME.player.location[1];
                    GAME.player.coordinates[0] -= 201;
                    GAME.getRoom(GAME.player);
                } else {
                    GAME.appendText("You can't move left", 0);
                }
                break;
            }
            case "right": {
                // to pass the correct value, we need to copy the array
                var copy4 = GAME.player.location.slice();
                if (GAME.checkValidMove([copy4[0], copy4[1]+1], GAME.grid)) {
                    ++GAME.player.location[1];
                    GAME.player.coordinates[0] += 201;
                    GAME.getRoom(GAME.player);
                } else {
                    GAME.appendText("You can't move right", 0);
                }
                break;
            }
            default: {
                GAME.appendText("I don't understand that command.", 0);
            }
        }
        // Clear the input after processing is done
        document.getElementById("userTextArea").value = "";

    }

    function init() {
        setupBindings();
        GAME.addEvent(bindings.inputButton, "click", processInputFunction);
        GAME.addEvent(bindings.userTextArea, "keydown", function(e){
            if(e.keyCode == 13) {
                processInputFunction();
            }
        });
    }
    return {
        init: init
    };
}());

GAME.loadModule.init();

// Player Class
// Use prototype when an asset can be shared by ALL instances of the class
function Player() {}

Player.prototype.location = [1,1];
Player.prototype.coordinates = [269, 194];

Player.prototype.getLocation = function() {
    return this.location;
};

Player.prototype.getCoordinates = function() {
    return this.coordinates;
};

// GameCanvas Class
function GameCanvas() {}
GameCanvas.prototype.canvas = document.getElementById("gameCanvas");
GameCanvas.prototype.ctx = GameCanvas.prototype.canvas.getContext("2d");
GameCanvas.prototype.ctx.font = "bold 38px Arial";

GameCanvas.prototype.drawImage = function(image, xVal, yVal) {
    this.ctx.drawImage(image, xVal, yVal);
};

window.onload = function () {
    GAME.player = new Player();
    GAME.gameCanvas = new GameCanvas();
    GAME.gameCanvas.drawImage(GAME.initialBackgroundImage, 0, 0);
};



function sumOfEvens(){
     var sum = 0;
     for (var i = 100; i--;){
         if (i % 2 === 0){
             sum += i;
         }
     }
     return sum;
 }
 console.log(sumOfEvens());


function everyTenthLetter(string){
    var result = "";
    console.log(string.length);
    for (i = 9; i < string.length; i += 10) {
        result += string[i];
    }
    return result;
}
console.log(everyTenthLetter("mqazxporiwkdjmsdvcxmtibdalpgdjfurutdmkoemsjdsfgtewsdxsdetfghtonamdsloightresdfgtbfwpolkmnjtuiomkjdfr"));



function uniqueCharacters(string) {
    var testString = string;
    var result = "";
    for (var i = 0; i < testString.length; i++) {
        if ( testString.indexOf(testString[i]) === testString.lastIndexOf(testString[i]) ) {
            result += testString[i];
        }
    }
    return result;
}
 console.log(uniqueCharacters("qjozwpqmqzvakytohfuuinwwdxexvbsgwmrjbkccslylg"))
/**
**/




