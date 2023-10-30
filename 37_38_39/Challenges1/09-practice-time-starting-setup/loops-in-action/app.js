// First Portion -> Calculate Sum

const calculatorButton=document.querySelector("#calculator button");
const calculatorInput=document.getElementById("user-number");
const calculatorOutput=document.getElementById("calculated-sum");

calculatorButton.addEventListener("click",()=>{
    const inputValue=calculatorInput.value;
    if(inputValue){
        // const value=inputValue-0;
        let sum=0;
        for(let i=1;i<=inputValue;i++)sum+=i;// --> O(n)
        // sum=(value*(value+1))/2; --> O(1)
        calculatorOutput.textContent=sum;
        calculatorOutput.classList.add("out");
    }
});

// Second Portion -> Highlight Links

const highlightButton=document.querySelector("#highlight-links button");

highlightButton.addEventListener("click",()=>{
    const highlightElements=document.querySelectorAll("#highlight-links a");
    for(const highlightElement of highlightElements){
        highlightElement.classList.add("highlight");
    }
});

// Thrid Portion -> Display User Data

const dummyData={
    "user_name":"Souhardya Dutta",
    "user_access":"Admin",
    "portion":"Full"
}

const displayUserDataButton=document.querySelector("#user-data button");

displayUserDataButton.addEventListener("click",()=>{
    const listElements=document.getElementById("output-user-data");
    listElements.innerHTML="";
    for(const key in dummyData){
        const listElement=document.createElement("li");
        listElement.textContent=`${key} : ${dummyData[key]}`;
        listElements.appendChild(listElement);
    }
});

// Fourth Portion -> Statistics

const statisticsButton=document.querySelector("#statistics button");

statisticsButton.addEventListener("click",()=>{
    const inputValue=document.getElementById("user-target-number").value;
    const ulElement=document.getElementById("dice-rolls");
    ulElement.innerHTML="";
    const totalRolls=document.getElementById("output-total-rolls");
    totalRolls.textContent="X";
    const targetNumber=document.getElementById("output-target-number");
    targetNumber.textContent="Y";
    if(inputValue){
        let throwValue=-1;
        while(throwValue!=inputValue){
            throwValue=Math.floor(Math.random()*6) + 1;
            const liElement=document.createElement("li");
            liElement.textContent=`Roll ${ulElement.childElementCount+1} : You got ${throwValue}`;
            ulElement.appendChild(liElement);
        }
        totalRolls.textContent=ulElement.childElementCount;
        targetNumber.textContent=inputValue;
    }
});
