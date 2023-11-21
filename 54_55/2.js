const hobbies=["Sports","Cooking"];
hobbies.push("Reading");
const age=0;

console.log(hobbies);
console.dir(age);

function getAdultYears(p){
    p.age-=18;
    return p.age;
}

console.log(getAdultYears())