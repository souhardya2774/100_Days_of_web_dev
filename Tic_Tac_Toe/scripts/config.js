function openPlayerConfig(event){
    selectedPlayer=+event.target.dataset.playerid;
    overlaysConfig.style.display="block";
    backdropConfig.style.display="block";
}

function closePlayerConfig(){
    overlaysConfig.style.display="none";
    backdropConfig.style.display="none";
    fromConfig.firstElementChild.classList.remove("error");
    fromErrorConfig.textContent="";
    fromInputConfig.value="";
}

function savePlayerConfig(event){
    event.preventDefault();
    const formData=new FormData(event.target);
    const enteredValue=formData.get("playerName").trim();
    if(!enteredValue){
        event.target.firstElementChild.classList.add("error");
        fromErrorConfig.textContent="Please enter a valid name!";
        return;
    }

    const updateElement=document.getElementById(`player-${selectedPlayer}-data`);
    updateElement.children[1].textContent=enteredValue;
    players[selectedPlayer-1].name=enteredValue;

    closePlayerConfig();
}