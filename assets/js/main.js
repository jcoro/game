var GAME = {};

GAME.locations = ["Entrance", "Burial Chamber", "Corridor", "Antechamber"];
GAME.commands = ["Forward", "Backward", "Left", "Right", "Inventory", "Health"];

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

GAME.loadModule = (function(){
    var bindings = {};
    var doc = document;
    function setupBindings() {
        bindings.startButton = doc.getElementById("startButton");
        bindings.startForm = doc.getElementById("startForm");
        bindings.gameDisplay = doc.getElementById("gameDisplay");
        bindings.inputButton = doc.getElementById("userInputButton");
    }

    function startGameFunction() {
        bindings.startForm.style.display = "none";
        bindings.gameDisplay.style.display = "block";
        GAME.appendText("You are inside the Pharoh's Tomb.", 0);
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
    }

    function processInputFunction() {
        var inputValue = document.getElementById("UserTextArea").value;
        console.log(inputValue);
        if (inputValue == "health"){
            GAME.appendText("Your Health is: " + player1.getHealth(), 0);
        } else {
            GAME.appendText("You find that you are Trapped.", 0);
        }


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
function Player() {};

Player.prototype.health = 100;
Player.prototype.location = GAME.locations[0];
Player.prototype.inventory = [];

Player.prototype.getHealth = function() {
    return this.health;
}

Player.prototype.getLocation = function() {
    return this.location;
}

var player = new Player();

var findSum = function(){
    var sum = 0;
    for (var i = 100; i--;){
        if (i % 2 === 0){
            sum += i;
        }
    }
    return sum;
}

console.log(findSum());






