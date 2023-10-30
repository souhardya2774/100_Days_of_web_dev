// Add new Element**
// Create a html element
let newAnchorElement=document.createElement("a");
newAnchorElement.href="https://www.google.com";
newAnchorElement.textContent="link";

//Get access to the parent element
let firstParagraph=document.querySelector("p");

// insert new element
firstParagraph.append(newAnchorElement);

// Delete Element**
// select the element
let h1Element=document.querySelector("h1");

// remove it
h1Element.remove();

// Move Existing Elements Around
// 
document.body.append(firstParagraph);
firstParagraph.innerHTML="I am <strong>Me</strong>";