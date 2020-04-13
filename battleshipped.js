var view = {
  //shows all
  //this method takes a string message & displays it
  //in the message area

  displayMessage: function(msg) {
    var messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = msg;
  },

  displayHit: function(location) {
    if (cell !== undefined) {};
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },

  displayMiss: function(location) {
    if (cell !== undefined) {};
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");

  }

};
var model = {
  //thinks all

  boardSize: 7,
  numShips: 3,
  shipsSunk: 0,
  shipLength: 3,

  ships: [
    {locations: [0, 0, 0], hits: ["", "", ""]},
    {locations: [0, 0, 0], hits: ["", "", ""]},
    {locations: [0, 0, 0], hits: ["", "", ""]}
        ],

  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      //locations = ship.locations;
      var index = ship.locations.indexOf(guess);

      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
          view.displayMessage("HIT!!");

        if (this.isSunk(ship)) {
          view.displayMessage("You sank my battleship!");
          this.shipsSunk++;
        }
        return true;
        //we have a hit!
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed!, you shoot like my grandma");
    return false
  },

  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },


  generateShipLocations: function() {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
    console.log("Ships array: ");
    console.log(this.ships);
  },

  generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;

    if (direction === 1) {
      //generate a starting location  for a horizontal ship
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));

    } else {
      // generate a starting location for a vertical ship
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
      col = Math.floor(Math.random() * this.boardSize);

    }

    var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push((row + i) + "" + col);
      }
    }
    return newShipLocations;
  },

  collision: function(locations) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }
};


function init() {
  var fireButton = document.getElementById('fireButton');
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById('guessInput');
  guessInput.onkeypress = handleKeyPress;

  // place the ships on the game board
  model.generateShipLocations();
};

function handleKeyPress(e) {
  var fireButton = document.getElementById('fireButton');
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
};

function handleFireButton() {
  var guessInput = document.getElementById('guessInput');
  var guess = guessInput.value;
  controller.processGuess(guess);

  guessInput.value = "";

};
window.onload = init;



var controller = {

  //adds all
  guesses: 0,

  processGuess: function(guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage("You sank all my battleship, in " + this.guesses + " guesses")
      }
    }
  }
};


function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if (guess === null || guess.length !== 2) {
    alert("Oops, please enter a letter and a number on the board.");
  } else {
    var row = alphabet.indexOf(guess.charAt(0));
    var column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      alert("Oops, that isn't on the board.");
    } else if (row < 0 || row >= model.boardSize ||
      column < 0 || column >= model.boardSize) {
      alert("Oops, that's off the board!");
    } else {
      return row + column;
    }
  }
  return null;
}





/*
view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");
view.displayMessage("Tap, Tap, Is this thing on?")

var ships =  [
  { locations: [06, 16, 26], hits: ["", "", ""] },
  { locations: [24, 34, 44], hits: ["", "hit", ""] },
  { locations: [10, 11, 12], hits: ["hit", "", ""] }
];

var ship2 = ships[1];
var locations = ship2.locations;
console.log("location is " + locations[1]);

var ship3 = ships[2];
var hits = ship3.hits;
if (hits[0]=== "hit"){
  console.log("ouch, hit on third ship at location one")
};

var ship1 = ships[0];
var hits = ship1.hits;
hits[2] = "hit";

model.fire("53");
model.fire("52");
model.fire("51");

model.fire("06");


model.fire("14");
model.fire("24");
model.fire("44");

model.fire("00");
model.fire("50");

model.fire("12");
model.fire("11");
model.fire("10");

console.log(parseGuess("A0"));
console.log(parseGuess("B6"));
console.log(parseGuess("G3"));
console.log(parseGuess("H0"));
console.log(parseGuess("A7"));

controller.processGuess("A0")

controller.processGuess("A6")
controller.processGuess("B6")
controller.processGuess("C6")

controller.processGuess("C4")
controller.processGuess("D4")
controller.processGuess("E4")

controller.processGuess("B0")
controller.processGuess("B1")
controller.processGuess("B2")

controller.processGuess("F0")
*/
