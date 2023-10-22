let userName = "Souhardya Dutta";
let age = 20;
let hobbies = ["Sports", "Cooking", "Reading"];

// alert(hobbies[0]);

let job = {
    title: "Developer",
    place: "New York", 
    salary: 500000
};

// alert(job.title);
function calculateAdultYears(userAge){
    return userAge-18;
}

let adultYears=calculateAdultYears(age);
console.log(adultYears);

age=45;

adultYears=calculateAdultYears(age);
console.log(adultYears);

let Person={
    name: "Max",
    greet(){
        console.log("Hello, I am Max");
    }
};

Person.greet();