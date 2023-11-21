const fs=require("fs");

function readFile(){
    try {
        const fileData=fs.readFileSync("data.json");
    } catch (error) {
        console.error("Error error");
    }
    console.log("HI there!");
}

console.dir(readFile);