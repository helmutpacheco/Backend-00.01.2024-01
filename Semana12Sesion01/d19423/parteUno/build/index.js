"use strict";
let firstName = "Dylan";
let lastName = "Lopez";
//firstName = 33;
let v = true;
v = "string"; // no hay error ya que puede ser de tipo "any"
Math.round(v); // no hay error ya que puede ser de tipo "any"
let w = 1;
w = "string"; // no hay error
w = {
    runANonExistentMethod: () => {
        console.log("Pienso, luego existo");
    }
};
// ¿Cómo podemos evitar el error para el código comentado abajo cuando no conocemos el tipo?
// w.runANonExistentMethod(); // Error: Object is of type 'unknown'.
if (typeof w === 'object' && w !== null) {
    w.runANonExistentMethod();
}
const names = ["Dylan"];
//names.push("Jack"); // Error: La propiedad 'push' no existe en el tipo 'readonly string[]'.
// intenta quitar el modificador readonly y ver si funciona?
// define nuestra tupla
let ourTuple;
// inicializar correctamente
ourTuple = [5, false, 'El Dios de la Codificación estuvo aquí'];
// No tenemos seguridad de tipos en nuestra tupla para índices 3+
ourTuple.push('Algo nuevo y incorrecto');
console.log(ourTuple);
// define nuestra tupla de solo lectura
const ourReadonlyTuple = [5, true, 'El Verdadero Dios de la Codificación'];
// lanza error ya que es de solo lectura.
//ourReadonlyTuple.push('El Dios de la Codificación se tomó un día libre');
const car = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
};
//car.year = "2007"; error tiene q ser de tipo number
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
// muestra 1
console.log(CardinalDirections.North);
// muestra 4
console.log(CardinalDirections.West);
const rectangle = {
    height: 20,
    width: 10
};
function printStatusCode(code) {
    console.log(`Mi código de estado es ${code}.`);
}
printStatusCode(404);
printStatusCode('404');
function getTime() {
    return new Date().getTime();
}
function printHello() {
    console.log('¡Hola!');
}
function multiply(a, b) {
    return a * b;
}
multiply(2, 4);
let x = 'hola';
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
console.log(person.getName()); // El nombre de la persona no es accesible desde fuera de la clase ya que es privado
