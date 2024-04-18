FORMA DE CREAR LISTA:
Postman: http://localhost:3000/sales 
Metodo: POST

Body (raw):
    {
        "name":"laptop",
        "description":"laptop asus",
        "date":"2024-04-13",
        "esCompletado":"completado" 
    }

Nota: El ultimo campo se llena con "completado" o "pendiente"


FORMA DE OBTENER PRODUCTOS PENDIENTES:
Postman: http://localhost:3000/sales/pendiente
Metodo: GET

FORMA DE OBTENER PRODUCTOS COMPLETADOS:
Postman: http://localhost:3000/sales/completado
Metodo: GET