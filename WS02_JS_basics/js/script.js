// Exercise 1
console.log("Hello World!");
alert("Hello World!");


// Exercise 2
const name = "Dilip";
let age = 24;
const favouriteAnimal = "Cat";

console.log(name);
console.log(age);
console.log(favouriteAnimal);

console.log("Hello! My name is " + name + " and my favourite animal is the " + favouriteAnimal + ".");


// Exercise 3
const userName = prompt("What is your name?");

console.log("Hello " + userName + "! Welcome to JavaScript.");


// Exercise 4
const userAge = prompt("How old are you?");

if (userAge >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are under 18.");
}


// Exercise 5
function greetUser(name) {
    console.log("Hello " + name + "!");
}

greetUser("Dilip");
greetUser("John");
greetUser("Maria");


// Exercise 6
function showMessage() {
    alert("JavaScript works!");
}
