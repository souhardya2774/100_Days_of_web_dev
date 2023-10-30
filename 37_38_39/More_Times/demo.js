const inputElement=document.getElementById("product-name");
const remainingCharsElement=document.getElementById("remaining-chars");

const maxLen=inputElement.maxLength;

inputElement.addEventListener("input",(event)=>{
    const presentLen=event.target.value.length;
    const remaining=maxLen-presentLen;
    remainingCharsElement.textContent=`${remaining}`;
    if(remaining<=10){
        inputElement.classList.add("warning");
        remainingCharsElement.classList.add("warning");
    }else{
        inputElement.classList.remove("warning");
        remainingCharsElement.classList.remove("warning");
    }
});