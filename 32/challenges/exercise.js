// This is how a comment is added to JavaScript
// Comments are not executed - they are just there to provide extra
// information to you or other developers

// Exercise Time!

// 1) Create three new variables:
//    - A variable that stores the name of an online course of your choice
//    - A variable that stores the price of that course
//    - A variable that stores the three main goals that you have, when taking this course
let course_name="Learn web development from A to Z in 100 days";
let course_price=499;
let main_goals=["Learn to develop great web applications","Get to know about different technologies around wed development","Extend my knowledge of Computer Science & Engineering"];
// 2) Output ("alert") the three variable values
alert(course_name);
alert(course_price);
alert(main_goals);
// 3) Try "grouping" the three variables together and still output their values thereafter
let course={
    Name:"Learn web development from A to Z in 100 days",
    Price:499,
    main_goals:["Learn to develop great web applications","Get to know about different technologies around wed development","Extend my knowledge of Computer Science & Engineering"]
};
alert(course.Name);
alert(course.Price);
alert(course.main_goals);
// 4) Also output the second element in your "main goals" variable
alert(main_goals[1]);
// 5) Add a custom command that does the following:
//    - Use your "main goals" variable and access an element by its identifier
//    - The concrete identifier value should be dynamic / flexible 
//      (i.e. the command can be executed for different identifier)
//    - The "main goals" variable should also be dynamic: The command should work 
//      with ANY list of values
//    - The custom command should provide the accessed value (i.e. the list element)
function custom_command(main_goals_,index_){
    return main_goals_[index_];
}
// 6) Execute your custom command from (5) and output ("alert") the result
alert(custom_command(main_goals,1));