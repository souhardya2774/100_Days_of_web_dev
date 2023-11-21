const fs=require("fs/promises");

async function readFile(){
    const fileData=await fs.readFile("data.txt");
    console.log(fileData.toString());
    console.log("HI there!");
}

readFile();