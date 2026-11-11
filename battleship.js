// The VIEW object
// Keeps the display updated with hits, misses, and messages
// for the user
let view = {
  displayMessage(msg) {
    let messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit(location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss(location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
};
// Testing view
// view.displayMiss("00");
// view.displayHit("34");
// view.displayMiss("55");
// view.displayMessage("Test, Test, Test");

// The MODEL object
// Keeps track of the ships ex. where they are, if they've been hit,
// and if they've been sunk
let model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  ships: [
    { locations: ["0", "0", "0"], hits: ["", "", ""] },
    { locations: ["0", "0", "0"], hits: ["", "", ""] },
    { locations: ["0", "0", "0"], hits: ["", "", ""] },
  ],

  // This method creates a ships array with the number of ships in the
  // model's numShips property. For each ship we generate locations and check
  // to see if those locations overlap with any existing ships.
  generateShipLocations() {
    let locations;
    for (let i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },

  // The generateShip method creates an array with random locations for one ship.
  // Each ship can have horizontal or vertical direction
  generateShip() {
    let direction = Math.floor(Math.random() * 2);
    let row;
    let col;
    // direction can be 1 or 0. If it is 1, we create a horizontal ship else if it is
    // 0, we create a vertical ship. First, we'll create a starting location. We should
    // take care to be able to fit the ship according to the starting point.
    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(
        Math.random() * (this.boardSize - (this.shipLength + 1)),
      );
    } else {
      row = Math.floor(
        Math.random() * (this.boardSize - (this.shipLength + 1)),
      );
      col = Math.floor(Math.random() * this.boardSize);
    }
    // We'll start with an empty array and add the locations one by one
    let newShipLocations = [];
    for (let i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(`${row}${col + i}`);
      } else {
        newShipLocations.push(`${row + i}${col}`);
      }
    }
    return newShipLocations;
  },

  // The collision method takes a ship and checks to see if any of the locations overlap
  collision(locations) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      for (let j = 0; j < locations.length; j++) {
        if (ship.locations.includes(locations[j])) {
          return true;
        }
      }
    }
    return false;
  },

  // Firing on a ship and figuring out if the shot is a hit or a miss
  fire(guess) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      let locations = ship.locations;
      let index = locations.indexOf(guess);
      // We could chain the above three lines to the following
      // let index = this.ships[i].locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        // We notify the view that we got a hit at the location in guess
        // and ask it to display the message "HIT!"
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if (this.isSunk(ship)) {
          this.shipsSunk++;
          // Let the player know that this hit sank the battleship!
          view.displayMessage("You sank my battleship!");
        }
        return true;
      }
    }
    // Notify the view that we got a miss at the location in guess
    view.displayMiss(guess);
    // And ask the view to display the message "You missed."
    view.displayMessage("You missed.");
    return false;
  },

  isSunk(ship) {
    return !ship.hits.includes("");
  },
};

// Testing model
// model.fire("53");
// model.fire("06");
// model.fire("16");
// model.fire("26");
// model.fire("34");

// The controller object
// Glues everything together. Manages communication between the view,
// the model, and the user. Is responsible for getting the player's
// input and executing the game logic.
let controller = {
  guesses: 0,

  // helper method
  parseGuess(guess) {
    // Helper array
    const alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
      alert("Oops, please enter a letter and a number on the board.");
    } else {
      let firstChar = guess.charAt(0);
      let row = alphabet.indexOf(firstChar);
      let column = guess.charAt(1);
      if (isNaN(column)) {
        alert("Oops, that isn't on the board.");
      } else if (
        row < 0 ||
        row >= model.boardSize ||
        column < 0 ||
        column >= model.boardSize
      ) {
        alert("Oops, that's off the board!");
      } else {
        // If everything is good we return the location as a string
        return row + column;
      }
    }
    // If we get here, there was a failed check along the way
    return null;
  },

  processGuess(guess) {
    let location = this.parseGuess(guess);
    if (location) {
      this.guesses++;
      let hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage(
          `You sank all my battleships, in ${this.guesses} guesses`,
        );
        let guessInput = document.getElementById("guessInput");
        guessInput.setAttribute("disabled", "true");
      }
    }
  },
};

// Testing helper method
// console.log(controller.parseGuess("A0"));
// console.log(controller.parseGuess("B6"));
// console.log(controller.parseGuess("G3"));
// console.log(controller.parseGuess("H0"));
// console.log(controller.parseGuess("A7"));

// Testing the processGuess method
// controller.processGuess("A0");
// controller.processGuess("A6");
// controller.processGuess("B6");
// controller.processGuess("C6");
// controller.processGuess("C4");

// Handling the Fire button
function init() {
  let fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  // Code to handle pressing the Return key instead of Fire button
  let guessInput = document.getElementById("guessInput");
  // This new handler handles key press events from the HTML input field.
  guessInput.onkeypress = handleKeyPress;

  model.generateShipLocations();
}

// Getting the player's guess from the form
function handleFireButton() {
  let guessInput = document.getElementById("guessInput");
  let guess = guessInput.value;
  // We're passing the player's guess to the controller
  controller.processGuess(guess);
  guessInput.value = "";
}

// The key press handler. It's called whenever you press a key in the
// form input in the page. The browser passes an event object to the handler
// which has info about which key was pressed.
function handleKeyPress(e) {
  let fireButton = document.getElementById("fireButton");
  // If you press the Return key, the event's keyCode property will be set to 13
  if (e.keyCode === 13) {
    fireButton.click();
    // We return false so the form doesn't submit itsel
    return false;
  }
}

window.onload = init;
