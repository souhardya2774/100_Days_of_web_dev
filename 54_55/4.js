const job={
    title:"Developer",
    location:"New York",
    salary:50000,
    func1:()=>{
        console.log("Hi!");
    }
};

class Job{
    constructor(jobTitle,place,salary){
        this.title=jobTitle,
        this.location=place,
        this.salary=salary
    }

    describe(){
        console.log(`I'm a ${this.title} working in ${this.location} and getting paid $${this.salary}`);
    }
};

const Developer=new Job("Developer","New York",50000);
console.log(Developer);
Developer.describe();