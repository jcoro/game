var GAME = GAME || {};

GAME.text = [
    "You receive a mysterious letter. when you arrive, you realize you are trapped in the computer lab.",
]

GAME.locations = ["Hallway", "Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6"];
GAME.commands = ["Forward", "Backward", "Left", "Right", "Inventory", "Health"];
GAME.grid =
    [
        [0,0], [0,1], [0,2],
        [1,0], [1,1], [1,2],
        [2,0], [2,1], [2,2]
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
        bindings.startForm.style.display = "none";
        bindings.gameDisplay.style.display = "block";
        GAME.appendText(GAME.text[0], 0);
        gameCanvas.drawInitialCanvas();
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
        switch (inputValue) {
            case "map": {
                GAME.appendText("This is where we will show the map", 0);
                gameCanvas.drawCanvas();
                break;
            }
            case "clues": {
                GAME.appendText("You have no clues yet", 0);
                break;
            }
            case "forward": {
                // to pass the correct value, we need to copy the array
                var copy = player.location.slice();
                if (GAME.checkValidMove([copy[0]-1, copy[1]], GAME.grid)) {
                    --player.location[0]
                } else {
                    GAME.appendText("You can't move forward", 0);
                };
                console.log("Player Location: " + player.location);
                break;
            }
            case "back": {
                // to pass the correct value, we need to copy the array
                var copy = player.location.slice();
                if (GAME.checkValidMove([copy[0]+1, copy[1]], GAME.grid)) {
                    ++player.location[0]
                } else {
                    GAME.appendText("You can't move back", 0);
                };
                console.log("Player Location: " + player.location);
                break;
            }
            default: {
                GAME.appendText("I don't understand that command.", 0);
            }
        }
        bindings.locationSpan.innerHTML = GAME.getRoom(player);
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
function Player() {}

Player.prototype.health = 100;
Player.prototype.location = [2,1];
Player.prototype.inventory = [];

Player.prototype.getHealth = function() {
    return this.health;
}

Player.prototype.getLocation = function() {
    return this.location;
}

var player = new Player();

// GameCanvas Class
function GameCanvas() {}
GameCanvas.prototype.canvas = document.getElementById("gameCanvas");
GameCanvas.prototype.ctx = GameCanvas.prototype.canvas.getContext("2d");
GameCanvas.prototype.ctx.font = "bold 38px Arial";

GameCanvas.prototype.drawInitialCanvas = function() {
    GameCanvas.prototype.ctx.fillStyle = "#FF0000";
    GameCanvas.prototype.ctx.fillRect(0,0,150,75);
}

GameCanvas.prototype.drawCanvas = function() {
    GameCanvas.prototype.ctx.fillStyle = "#0073bc";
    GameCanvas.prototype.ctx.fillRect(0,0,300,200);
}

var gameCanvas = new GameCanvas();

// var findSum = function(){
//     var sum = 0;
//     for (var i = 100; i--;){
//         if (i % 2 === 0){
//             sum += i;
//         }
//     }
//     return sum;
// }
//
// console.log(findSum());






