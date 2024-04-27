## CRUD DE USUARIOS

{
    "DNI":"72227312",
    "name":"Henry Gómez",
    "courses":"",
    "email":"henry.gomez2904@gmail.com",
    "password":"loquito541"
}

## CRUD DE CURSOS
# Crear cursos (EJEMPLO)
POST http://localhost:4000/api/courses

{
    "name":"SQL SERVER",
    "description":"Curso de base de datos",
    "image":"https://www.jasoft.org/Blog/image.axd?picture=/2021/localdb/SQL-Server-logo.png",
    "frontPage":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGk8xHWWrZbNV4aJmvaONxo69SqHHiugTsdsQrC7Fp2w&s",
    "price":150
}
## Obtener un curso por id usando params
GET http://localhost:4000/api/courses/:id

Colocar previamente el id en los params

## Obtener todos los cursos
GET http://localhost:4000/api/courses

## Borrar un curso
DELETE http://localhost:4000/api/courses/:id

Colocar previamente el id en los params

## Actualizar un curso
PUT http://localhost:4000/api/courses/:id

Colocar previamente el id en los params

Colocar en el body la informacion actualizada
{
    "name":"SQL SERVER",
    "description":"Curso de base de datos",
    "image":"https://www.jasoft.org/Blog/image.axd?picture=/2021/localdb/SQL-Server-logo.png",
    "frontPage":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGk8xHWWrZbNV4aJmvaONxo69SqHHiugTsdsQrC7Fp2w&s",
    "price":150
}

## CRUD DE COMPRA (order)
{
    "user": "6625ac287060640f2c02e841",
    "course":"66258b8cbf3a2475554ee5d4",
    "priceFinal": 100
}

## CRUD DE CUPONES
{
    "code": "12345-abcd",
    "discount": 25
}