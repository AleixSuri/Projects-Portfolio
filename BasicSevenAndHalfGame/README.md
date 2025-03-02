# 7 & a Half


## Project Description
The "Seven and a Half" game is a simple web-based implementation of the popular card game. It allows players to interactively play against a dealer with intuitive gameplay, including betting, drawing cards, and determining outcomes based on the rules of the game. The game is implemented using HTML, CSS, and JavaScript.

## Features
1. **Player Login**
    - Players can enter their name and starting balance to initialize the game.

2. **Interactive Gameplay**
    - Players can bet an amount before each round.
    - Players and dealers draw cards from a shuffled deck.
    - The dealer's behavior is automated according to the game's rules.

3. **Card Deck**
    - Cards are displayed using Unicode characters for realism.
    - The deck is shuffled at the start of each round.

4. **Game Rules**
    - Card values:
        - Aces (A) are worth 1 point.
        - Face cards (J, Q, K) are worth 0.5 points.
        - Numbered cards (2-7) hold their face values.
    - If a player's hand exceeds 7.5 points, they lose the round.
    - The dealer stops drawing cards once their total meets or exceeds the player's score but does not exceed 7.5.

5. **Result Calculation**
    - Wins and losses are calculated after each round based on the player's and dealer's total card values.
    - Players can win twice their bet if they beat the dealer.

6. **Game Continuity**
    - Players can choose to continue playing or end the game after each round.


## How to Play
1. Enter your Name and Initial Money in the login form and click Play!.
2. Place a bet to start a new round.
3. Draw cards by clicking More cards until you decide to stop or exceed 7.5 points.
4. The dealer will draw cards automatically after the player stops.
5. Outcomes will be displayed, and the remaining balance will be updated.
6. Continue the game by starting a new round or exit by clicking End Game.


## Setup and Usage
1. Clone the repository to your local machine:
    - Copy this "git clone <"repository-url">"

2. Navigate to the project directory and open the index.html file in a web browser to start the game.

3. Folder Structure:
    - index.html: Main file to launch the game.
    - style.css: Located in the library folder, defines the visual styling of the game.
    - game_start.js: Implements the game logic and interactivity.
    - images: Contains background images for the game screens.

## Implementation
### HTML Structure
We structured the HTML to include two main sections:

- Login Section: Allows the player to enter their name and initial money before starting the game.
- Game Section: Displays the game interface, including player information, game controls, and the card area for both the player and the dealer.

### CSS Styling
Using an external CSS file, we styled the game elements to create an engaging and visually appealing interface. This includes the layout, colors, fonts, and backgrounds.

### JavaScript Functionality
The JavaScript code drives the game logic:

- Player Class: A class to manage player information such as name, money, and card totals.
- Deck Initialization: An array of cards and a function to shuffle them.
- Game Flow:
    - **Start Game**: Initializes the player, updates the interface, and transitions to the game screen.
    - **Start Round**: Prompts the player for their bet, updates their money, shuffles the deck, and deals the first card to the player.
    - **Deal Cards**: Functions to deal cards to the player and the dealer, updating their totals and checking for win/lose conditions.
    - **Round Management**: Functions to handle the end of a round, restart the game, or end the game completely.


### User Interaction
The player interacts with the game through buttons for starting rounds, dealing more cards, stopping, and ending the game. Prompts and alerts guide the player through betting and inform them of the game's outcomes.

## Technologies Used
    - HTML: Structure of the web interface.
    - CSS: Styling and layout of the game components.
    - JavaScript: Game logic, card handling, and interactive functionalities.

