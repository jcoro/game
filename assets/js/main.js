var GAME = GAME || {};

GAME.text = [
    "You receive a mysterious letter. when you arrive, you realize you are trapped in the computer lab.",
];

GAME.initialBackgroundImage = new Image();
GAME.initialBackgroundImage.src = "./assets/img/title.jpg";

GAME.map = new Image();
GAME.map.src = "./assets/img/map.jpg";

GAME.you = new Image();
GAME.you.src = "./assets/img/youAreHere.png";

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

GAME.addClickEvent = function(element, myEvent, fnc) {
    element.addEventListener(myEvent, fnc, false);
};

GAME.output = document.getElementById("output");

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
}

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
}

GAME.getRoom = function(p){
    var room = "";
    if (p.getLocation()[1] === 1){
        room = "Hallway";
    } else if (p.getLocation()[1] === 0) {
        room = "Left Room";
    } else {
        room = "Right Room";
    }
    return room;
}

GAME.loadModule = (function(){
    var bindings = {};
    var doc = document;
    function setupBindings() {
        bindings.startButton = doc.getElementById("startButton");
        bindings.startForm = doc.getElementById("startForm");
        bindings.gameDisplay = doc.getElementById("game-display");
        bindings.inputButton = doc.getElementById("userInputButton");
    }

    function startGameFunction() {
        bindings.startForm.style.visibility = "hidden";
        bindings.gameDisplay.style.display = "block";
        GAME.appendText(GAME.text[0], 0);
        GAME.gameCanvas.drawImage(GAME.map, 0, 0);
        GAME.gameCanvas.drawImage(GAME.you, GAME.player.coordinates[0], GAME.player.coordinates[1]);
        GAME.proccessInputModule.init();
    }

    function init() {
        setupBindings();
        GAME.addClickEvent(bindings.startButton, "click", startGameFunction);
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
        bindings.locationSpan = doc.getElementById("dynamic-location");
    }

    function processInputFunction() {
        var inputValue = document.getElementById("UserTextArea").value;
        var lowercaseValue = inputValue.toLowerCase();
        switch (lowercaseValue) {
            case "map": {
                GAME.appendText("This is where we will show the map", 0);
                GAME.gameCanvas.drawImage(GAME.map, 0, 0);
                GAME.gameCanvas.drawImage(GAME.you, GAME.player.coordinates[0], GAME.player.coordinates[1]);
                break;
            }
            case "clues": {
                GAME.appendText("You have no clues yet", 0);
                break;
            }
            case "forward": {
                // to pass the correct value, we need to copy the array
                var copy = GAME.player.location.slice();
                if (GAME.checkValidMove([copy[0]-1, copy[1]], GAME.grid)) {
                    --GAME.player.location[0];
                    GAME.player.coordinates[1] -= 151;
                    GAME.gameCanvas.drawImage(GAME.map, 0, 0);
                    GAME.gameCanvas.drawImage(GAME.you, GAME.player.coordinates[0], GAME.player.coordinates[1]);
                } else {
                    GAME.appendText("You can't move forward", 0);
                };
                console.log("Player Location: " + GAME.player.location);
                console.log("Player Coordinates: " + GAME.player.coordinates);
                break;
            }
            case "back": {
                // to pass the correct value, we need to copy the array
                var copy2 = GAME.player.location.slice();
                if (GAME.checkValidMove([copy2[0]+1, copy2[1]], GAME.grid)) {
                    ++GAME.player.location[0]
                    GAME.player.coordinates[1] += 151;
                    GAME.gameCanvas.drawImage(GAME.map, 0, 0);
                    GAME.gameCanvas.drawImage(GAME.you, GAME.player.coordinates[0], GAME.player.coordinates[1]);
                } else {
                    GAME.appendText("You can't move back", 0);
                };
                console.log("Player Location: " + GAME.player.location);
                console.log("Player Coordinates: " + GAME.player.coordinates);
                break;
            }
            default: {
                GAME.appendText("I don't understand that command.", 0);
            }
        }
        bindings.locationSpan.innerHTML = GAME.getRoom(GAME.player);
        // Clear the input after processing is done
        document.getElementById("UserTextArea").value = "";

    }

    function init() {
        setupBindings();
        GAME.addClickEvent(bindings.inputButton, "click", processInputFunction);
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
Player.prototype.coordinates = [269, 194]

Player.prototype.getLocation = function() {
    return this.location;
}

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
}


/**
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
    for (i = 10; i < string.length; i = i + 10) {
        result += string[i];
    }
    return result;
}
console.log(everyTenthLetter("asldkfasldfkjaslalskfjasldgjffasldfjkaskdlkfj"));


function uniqueCharacters(string) {
    var testString = string;
    var result = "";
    for (var i = testString.length; i--;) {
        if (result.indexOf(testString[i]) === -1) {
            result += testString[i];
        }
    }
    return result;
}
 console.log(uniqueCharacters("aabbcddeffg"))
**/




