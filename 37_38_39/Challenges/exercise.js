// Practice what you learned!

// 1) Select the two <button> elements and store them in two different variables.
//    - Select the first button without adding or using any "id"
const buttonElement1=document.querySelector("button");
//    - Select the second button by using an "id"
const buttonElement2=document.getElementById("button2");

// 2) Add "click" event listener to both buttons (with two different functions).
//    The functions should "console.dir()" the clicked buttons.
//    - Output the first button by using the variable in which it's stored
// function output1(){
//     console.dir(buttonElement1);
// }
// buttonElement1.addEventListener("click",output1);
//    - Output the second button WITHOUT using the variable in which it's stored
// function output2(event){
//     console.dir(event.target);
// }
// buttonElement2.addEventListener("click",output2);

// 3) Now select and store the paragraphs mentioned in the text you see on the page
//    (first and third paragraph)
//    - Select BOTH paragraphs by drilling into the document and "navigating" to the
//      mentioned elements
const firstParagraph=document.body.lastElementChild.children[1];
const thirdParagraph=document.body.lastElementChild.children[3];
//    - If you struggle with DOM drilling, use "ids" instead but watch the solution!


// 4) Change the functions from (2) such that:
//    - The first button removes the third paragraph (i.e. the <p> prior to it)
function output1(){
    thirdParagraph.remove();
}
buttonElement1.addEventListener("click",output1);
//    - The second button changes the background color of the first paragraph to blue
function output2(event){
    firstParagraph.style.backgroundColor="blue"; // changing the "inline styles"
    firstParagraph.classList.add("added"); // by adding CSS classes
}
buttonElement2.addEventListener("click",output2);

// 5) Solve (4) both by changing the "inline styles" as well as by adding CSS classes
//    Note: You'll have to add those classes to the styles.css file first!