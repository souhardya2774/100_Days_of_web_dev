function resetGameStatus(){
    activePlayer=0;
    currentRound=1;
    gameOverAlready=false;
    gameOverElement.firstElementChild.innerHTML="You won, <span id=\"winner-name\">Player Name</span>!";
    gameOverElement.style.display="none";
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            gameData[i][j]=0;
            gameFieldElements[i*3+j].textContent="";
            gameFieldElements[i*3+j].classList.remove("disabled");
        }
    }
}

function startNewGame(){
    if(players[0].name==="" || players[1].name===""){
        alert("Please enter the player names!");
        return;
    }

    resetGameStatus();
    activePlayerName.textContent=players[activePlayer].name;
    gameAreaElement.style.display="block";
}

function checkForGameOver(){
    for(let i=0;i<3;i++){
        if(gameData[i][0]>0 && gameData[i][0]===gameData[i][1] && gameData[i][1]===gameData[i][2]){
            return gameData[i][0];
        }
    }

    for(let i=0;i<3;i++){
        if(gameData[0][i]>0 && gameData[0][i]===gameData[1][i] && gameData[1][i]===gameData[2][i]){
            return gameData[0][i];
        }
    }

    if(gameData[0][0]>0 && gameData[0][0]===gameData[1][1] && gameData[1][1]===gameData[2][2])return gameData[0][0];
    if(gameData[1][1]>0 && gameData[0][2]===gameData[1][1] && gameData[1][1]===gameData[2][0])return gameData[1][1];
    
    if(currentRound===9)return -1;
    return 0;
}

function endGame(winnerId){
    gameOverElement.style.display="block";
    if(winnerId>0){
        gameOverElement.firstElementChild.firstElementChild.textContent = players[winnerId-1].name;
    }else{
        gameOverElement.firstElementChild.textContent="It's a Draw!";
    }
}

function selectGameField(event){
    if(gameOverAlready){
        return;
    }
    const selectedField=event.target;
    const selectedColumn=+(selectedField.dataset.col);
    const selectedRow=+(selectedField.dataset.row);
    if(gameData[selectedRow][selectedColumn]>0){
        alert("Please select an empty field!");
        return;
    }

    selectedField.textContent=players[activePlayer].symbol;
    selectedField.classList.add("disabled");
    
    gameData[selectedRow][selectedColumn]=(activePlayer+1);
    const winnerId=checkForGameOver();
    if(winnerId!==0){
        gameOverAlready=true;
        activePlayerName.textContent=",Oh Sorry! Game is already Finished";
        endGame(winnerId);
        return;
    }

    activePlayer=(activePlayer+1)%2;
    currentRound++;
    activePlayerName.textContent=players[activePlayer].name;
}