const editPlayer1Name=document.getElementById("edit-player-1-name");
const editPlayer2Name=document.getElementById("edit-player-2-name");
const cancelConfig=document.getElementById("cancel-config");
const startGameBtn=document.getElementById("start-game-btn");
const gameFieldElements=document.querySelectorAll("#game-board li");

let selectedPlayer=-1;
let activePlayer=0;
const players=[
    {
        name:"",
        symbol:"X"
    },
    {
        name:"",
        symbol:"O"
    }
];
const gameData=[
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
let currentRound=1;
let gameOverAlready=false;

const overlaysConfig=document.getElementById("config-overlay");
const backdropConfig=document.getElementById("backdrop");
const fromConfig=document.querySelector("form");
const fromErrorConfig=document.getElementById("config-errors");
const fromInputConfig=document.getElementById("playerName");
const gameAreaElement=document.getElementById("active-game");
const activePlayerName=document.getElementById("active-player-name");
const gameOverElement=document.getElementById("game-over");

editPlayer1Name.addEventListener("click",openPlayerConfig);
editPlayer2Name.addEventListener("click",openPlayerConfig);
cancelConfig.addEventListener("click",closePlayerConfig);
backdropConfig.addEventListener("click",closePlayerConfig);

fromConfig.addEventListener("submit",savePlayerConfig);

startGameBtn.addEventListener("click",startNewGame);

for(const gameFieldElement of gameFieldElements){
    gameFieldElement.addEventListener("click",selectGameField);
}