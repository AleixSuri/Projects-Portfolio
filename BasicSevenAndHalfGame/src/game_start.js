class Player {
	_name;
	_money;
    _sumDealer;
    _sumPlayer;
    _moneyBet;

	constructor(name, money){
		this._name = name;
		this._money = money;
        this._sumDealer=0;
        this._sumPlayer=0;
	}
}


var Player1;

// A-7 (1 point)  J-K (0.5 points)
const deck = [ 
    'A♠', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', 'J♠', 'Q♠', 'K♠',
    'A♥', '2♥', '3♥', '4♥', '5♥', '6♥', '7♥', 'J♥', 'Q♥', 'K♥',
    'A♦', '2♦', '3♦', '4♦', '5♦', '6♦', '7♦', 'J♦', 'Q♦', 'K♦',
    'A♣', '2♣', '3♣', '4♣', '5♣', '6♣', '7♣', 'J♣', 'Q♣', 'K♣'
];

//Dictionary cards with it's show code
const cardUnicodeMap = {
    'A♠': '&#127137;', '2♠': '&#127138;', '3♠': '&#127139;', '4♠': '&#127140;', '5♠': '&#127141;',
    '6♠': '&#127142;', '7♠': '&#127143;', 'J♠': '&#127147;', 'Q♠': '&#127149;', 'K♠': '&#127150;',
    'A♥': '&#127153;', '2♥': '&#127154;', '3♥': '&#127155;', '4♥': '&#127156;', '5♥': '&#127157;',
    '6♥': '&#127158;', '7♥': '&#127159;', 'J♥': '&#127163;', 'Q♥': '&#127165;', 'K♥': '&#127166;',
    'A♦': '&#127169;', '2♦': '&#127170;', '3♦': '&#127171;', '4♦': '&#127172;', '5♦': '&#127173;',
    '6♦': '&#127174;', '7♦': '&#127175;', 'J♦': '&#127179;', 'Q♦': '&#127181;', 'K♦': '&#127182;',
    'A♣': '&#127185;', '2♣': '&#127186;', '3♣': '&#127187;', '4♣': '&#127188;', '5♣': '&#127189;',
    '6♣': '&#127190;', '7♣': '&#127191;', 'J♣': '&#127195;', 'Q♣': '&#127197;', 'K♣': '&#127198;'
};

function startGame(){
    let name = document.getElementById("name").value;	
    let money = document.getElementById("money").value;		

    if (name && money) {
        //create player
        Player1 = new Player(name, money);

        //change background
        let logIin = document.getElementById("logIn");
        logIin.style.display = "none"; 
        document.body.style.backgroundImage = "url('../images/backgroundGame.avif')";

        //start game
        let game = document.getElementById("Game");
        game.style.display = "block"; 
        infoPlayer();

    } else {
        alert("Please fill in all required fields.");
    }
   
}


function infoPlayer(){
    document.getElementById("playerName").textContent  = "Player: " + Player1._name;
    document.getElementById("playerMoney").textContent  = "Money: " + Player1._money;
}


function startRound(){
    
    //money bet
    let bet = prompt("Money bet", "10");
    let correctAmount = false;
    while (!correctAmount) {
        if(bet && isNaN(bet) || bet.trim() === ""){
            alert("Please enter a valid number");
            bet = prompt("Money bet", "10");
        }
        else{
            bet = parseFloat(bet);
            let money = Player1._money - bet;
            if(money<0){
                alert("Please enter an amount you can afford");
                bet = prompt("Money bet", "10");
            }
            else {
                Player1._money = money;
                correctAmount=true;
            }
        }
        
    }
    Player1._moneyBet=bet;
    
    //refresh player money
    infoPlayer();
      
    //hide buttons
    let game = document.getElementById("continueGame");
    game.style.display = "none";
    
    //start game
    shuffle();
    let buttonsCards = document.getElementById("playing");
    buttonsCards.style.display = "block";
    giveCardPlayer("playerList");
    
}

function shuffle(){
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function showCard(card){
    let span = document.createElement("span");
    span.style.fontSize = "100px";

    span.innerHTML = cardUnicodeMap[card];
    return span;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function giveCardPlayer(listId){
    let list = document.getElementById(listId);
    let card = document.createElement("li");
    //take card
    let cardNumber = deck.pop();
    let cardSpan = showCard(cardNumber);
    card.appendChild(cardSpan);
    list.appendChild(card);

        //sum value card
     sumValueCard(listId, cardNumber.slice(0, -1));
    
    // Wait card showed
    await sleep(200);
    if(Player1._sumPlayer>=8){
        alert("You have lost: " + Player1._moneyBet + ". Remaining money: "+Player1._money+"€");
        restartGame();
    }
}


async function giveCardDealer(listId){
    //remove buttons bet/stop
    let buttonsCards = document.getElementById("bottomButtons");
    buttonsCards.style.display = "none";

    let list = document.getElementById(listId);
    let card = document.createElement("li");
    //take card
    while(Player1._sumDealer<Player1._sumPlayer && Player1._sumDealer<7.5){
        let cardNumber = deck.pop();
        let cardSpan = showCard(cardNumber);
        card.appendChild(cardSpan);
        list.appendChild(card);

        //sum value card
        sumValueCard(listId, cardNumber.slice(0, -1));
        await sleep(1000);
    }
    // Wait card showed
    await sleep(200);
    if(Player1._sumDealer>=Player1._sumPlayer && Player1._sumDealer<=7.5){
        alert("You have lost: " + Player1._moneyBet + ". Remaining money: "+Player1._money+"€");
    }
    else{
        Player1._money+=Player1._moneyBet*2;
        alert("You have win: " + Player1._moneyBet + ". Remaining money: "+Player1._money+"€");
        infoPlayer();
    }

    //put buttons bet/stop
    buttonsCards.style.display = "flex";
    restartGame();
}

function sumValueCard(listId, card){
    let sum=0;
    if(card==='A') sum+=1;
    else if(card=='Q' || card=='J' || card=='K') sum+=0.5
    else sum+= parseFloat(card);

    if(listId==="playerList") Player1._sumPlayer+=sum;
    else Player1._sumDealer+=sum;
}

function restartGame(){
    //restart values
    Player1._sumDealer=0;
    Player1._sumPlayer=0;

    //restart deck
    let plyList = document.getElementById("playerList"); 
    plyList.innerHTML = "";
    let dlList = document.getElementById("dealerList"); 
    dlList.innerHTML = "";

    //hide cards buttons 
    let game = document.getElementById("continueGame");
    game.style.display = "flex";

    //show continue/end buttons
    let buttonsCards = document.getElementById("playing");
    buttonsCards.style.display = "none";

}

function endGame(){
    
    alert("You have received: "+Player1._money+"€. See you next time!! ");
    //hide game
    let game = document.getElementById("Game");
    game.style.display = "none";

    //display the login
    let logIin = document.getElementById("logIn");
    logIin.style.display = "block"; 
    document.body.style.backgroundImage = "url('../images/logInPlayer.jpg')";
   
}
