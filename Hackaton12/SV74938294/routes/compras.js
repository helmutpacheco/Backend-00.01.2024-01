let pendientes = [];
let completados = [];

function crearPendiente(req, res) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const formData = JSON.parse(body); // Parsear los datos JSON
      const nuevaCompra = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        fecha: formData.fecha,
        esCompletado: false
      };
      pendientes.push(nuevaCompra);
      console.log('Elemento agregado al arreglo pendientes:', nuevaCompra); // Agregar este mensaje de registro
      // Enviar una respuesta JSON con el nuevo elemento creado
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Compra creada con éxito', compra: nuevaCompra }));
    });
}


function mostrarPendientes(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(pendientes));
}

function mostrarCompletados(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(completados));
}

module.exports = {
  pendientes, // Exporta la variable pendientes
  crearPendiente,
  mostrarPendientes,
  mostrarCompletados
};
