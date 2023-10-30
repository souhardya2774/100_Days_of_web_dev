let paragraphElement=document.querySelector("p");

let i=0;
paragraphElement.addEventListener("click",()=>{
    paragraphElement.textContent=`Clicked ${i++}!`;
});

let inputElement=document.querySelector("input");
function inputFunc(event){
    console.log(event.data);
}

inputElement.addEventListener("input",inputFunc);