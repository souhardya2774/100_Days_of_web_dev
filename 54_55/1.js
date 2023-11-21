function greetUser(greetingPrefix,userName="User"){
    console.log(`${greetingPrefix} ${userName}!`);
}

greetUser("Hi","MAX");
greetUser("Hello");

function sumUp(...numbers){
    let result=0;
    for(const number of numbers){
        result+=number;
    }
    return result;
}

const numbers =[1,2,3,4,5,6];

console.log(sumUp(...numbers));