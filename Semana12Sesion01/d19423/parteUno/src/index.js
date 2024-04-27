"use strict";
let firstName = "Dylan";
let lastName = "Lopez";
//firstName = 33;
let v = true;
v = "string"; // no error as it can be "any" type
Math.round(v); // no error as it can be "any" type
let w = 1;
w = "string"; // no error
w = {
    runANonExistentMethod: () => {
        console.log("I think therefore I am");
    }
};
// How can we avoid the error for the code commented out below when we don't know the type?
// w.runANonExistentMethod(); // Error: Object is of type 'unknown'.
if (typeof w === 'object' && w !== null) {
    w.runANonExistentMethod();
}
const names = ["Dylan"];
//names.push("Jack"); // Error: Property 'push' does not exist on type 'readonly string[]'.
// try removing the readonly modifier and see if it works?
// define our tuple
let ourTuple;
// initialize correctly
ourTuple = [5, false, 'Coding God was here'];
// We have no type safety in our tuple for indexes 3+
ourTuple.push('Something new and wrong');
console.log(ourTuple);
// define our readonly tuple
const ourReadonlyTuple = [5, true, 'The Real Coding God'];
// throws error as it is readonly.
//ourReadonlyTuple.push('Coding God took a day off');
const car = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
};
//car.year = "2007";
const car2 = {
    type: "Toyota",
};
car2.mileage = 2000;
var CardinalDirections;
(function (CardinalDirections) {
    CardinalDirections[CardinalDirections["North"] = 1] = "North";
    CardinalDirections[CardinalDirections["East"] = 2] = "East";
    CardinalDirections[CardinalDirections["South"] = 3] = "South";
    CardinalDirections[CardinalDirections["West"] = 4] = "West";
})(CardinalDirections || (CardinalDirections = {}));
// logs 1
console.log(CardinalDirections.North);
// logs 4
console.log(CardinalDirections.West);
const rectangle = {
    height: 20,
    width: 10
};
function printStatusCode(code) {
    console.log(`My status code is ${code}.`);
}
printStatusCode(404);
printStatusCode('404');
function getTime() {
    return new Date().getTime();
}
function printHello() {
    console.log('Hello!');
}
function multiply(a, b) {
    return a * b;
}
multiply(2, 4);
let x = 'hello';
console.log(x.length);
class Person {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
const person = new Person("Jane");
console.log(person.getName()); // person.name isn't accessible from outside the class since it's private
