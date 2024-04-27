let firstName: string = "Dylan";
let lastName = "Lopez";

//firstName = 33;

let v: any = true;
v = "string"; // no hay error ya que puede ser de tipo "any"
Math.round(v); // no hay error ya que puede ser de tipo "any"

let w: unknown = 1;
w = "string"; // no hay error
w = {
  runANonExistentMethod: () => {
    console.log("Pienso, luego existo");
  }
} as { runANonExistentMethod: () => void}
// ¿Cómo podemos evitar el error para el código comentado abajo cuando no conocemos el tipo?
// w.runANonExistentMethod(); // Error: Object is of type 'unknown'.
if(typeof w === 'object' && w !== null) {
  (w as { runANonExistentMethod: Function }).runANonExistentMethod();
}

const names: readonly string[] = ["Dylan"];
//names.push("Jack"); // Error: La propiedad 'push' no existe en el tipo 'readonly string[]'.
// intenta quitar el modificador readonly y ver si funciona?


// define nuestra tupla
let ourTuple: [number, boolean, string];

// inicializar correctamente
ourTuple = [5, false, 'El Dios de la Codificación estuvo aquí'];
// No tenemos seguridad de tipos en nuestra tupla para índices 3+
ourTuple.push('Algo nuevo y incorrecto');
console.log(ourTuple);

// define nuestra tupla de solo lectura
const ourReadonlyTuple: readonly [number, boolean, string] = [5, true, 'El Verdadero Dios de la Codificación'];
// lanza error ya que es de solo lectura.
//ourReadonlyTuple.push('El Dios de la Codificación se tomó un día libre');


const car: { type: string, model: string, year: number } = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
  };

  //car.year = "2007"; error tiene q ser de tipo number

  const car2: { type: string, mileage?: number } = { // Error: La propiedad 'mileage' falta en el tipo '{ type: string; }' pero es requerida en el tipo '{ type: string; mileage: number; }'.
    type: "Toyota",
  };
  car2.mileage = 2000;


  enum CardinalDirections {
    North = 1,
    East,
    South,
    West
  }
  // muestra 1
  console.log(CardinalDirections.North);
  // muestra 4
  console.log(CardinalDirections.West);


  interface Rectangle {
    height: number,
    width: number
  }
  
  const rectangle: Rectangle = {
    height: 20,
    width: 10
  };


  function printStatusCode(code: string | number) {
    console.log(`Mi código de estado es ${code}.`)
  }
  printStatusCode(404);
  printStatusCode('404');

  function getTime(): number {
    return new Date().getTime();
  }

  function printHello(): void {
    console.log('¡Hola!');
  }


  function multiply(a: number, b: number) {
    return a * b;
  }

  multiply(2,4)


let x: unknown = 'hola';
console.log((<string>x).length);

class Person {
    private name: string;
  
    public constructor(name: string) {
      this.name = name;
    }
  
    public getName(): string {
      return this.name;
    }
  }
  
  const person = new Person("Jane");
  console.log(person.getName()); // El nombre de la persona no es accesible desde fuera de la clase ya que es privado
