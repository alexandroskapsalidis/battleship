# Battleship Web Application

A browser-based **Battleship** game built using **HTML5**, **CSS3**, and pure **JavaScript (ES6+)**, following an Object-Oriented Programming (MVC) architectural pattern.

---

## About the Project

Unlike simple command-line or basic alert-box toy games, this web application delivers a full interactive experience. It features a radar-style visual game board grid overlay, dynamic ship placement, real-time feedback for hits and misses, form-based coordinate inputs, and win/loss condition tracking.

---

## Features

- **MVC Architecture:** Clean separation of concerns divided into Model, View, and Controller objects.
- **Dynamic Random Ship Generation:** Ships (3 ships, each 3 cells long) are randomly placed vertically or horizontally on a $7 \times 7$ grid at the start of each game, featuring a built-in **collision detection algorithm** to prevent overlaps.
- **Interactive UI & DOM Manipulation:** Instant visual updates using CSS background classes (`.hit` and `.miss`) combined transparently over a radar background grid image (`board.jpg`).
- **Input Validation & Parsing:** Robust helper methods (`parseGuess`) that validate user alphanumeric inputs (e.g., ensuring inputs like `A0` to `G6` are within boundaries, correct length, and properly formatted).
- **User Experience Enhancements:** Supports both clicking the "Fire!" button and pressing the **Return (Enter)** key to submit guesses. The input field disables automatically once all battleships are sunk.

---

## Architecture & Design Pattern (MVC)

The application relies on three core JavaScript components:

1. **The View (`view`):** Manages the Document Object Model (DOM) to update text messages in the message area and toggle CSS classes (`hit`/`miss`) on specific table cells (`<td>`).
2. **The Model (`model`):** Maintains the internal game state (board size, ship locations, tracking hits, and sunk status) and encapsulates core game logic like `fire()` and `isSunk()`.
3. **The Controller (`controller`):** Acts as the bridge between user interaction and game logic. It processes and validates player guesses, increments the guess counter, and detects when the game ends.

---

## Technologies Used

- **HTML5:** Semantic markup, interactive forms (`<form>`, `<input>`), and grid structure (`<table>`).
- **CSS3:** Advanced absolute/relative positioning, background layers, styling, and transparency handling.
- **JavaScript (ES6+):** Object literals, methods, array operations (`indexOf`, `includes`, `push`), event listeners (`onclick`, `onkeypress`), and conditional loops (`do...while`).

---

## View Project

View the project online using the following credentials

<p>Live Demo 🌐: <a href="https://" target="_blank">Battleship</a></p>
