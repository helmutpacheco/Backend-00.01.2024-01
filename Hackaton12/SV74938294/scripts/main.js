// Captura el envío del formulario y envía los datos al servidor
document.getElementById('crearListaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    fetch('/crear-pendiente', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Agregar la nueva compra a la lista de pendientes en la página web
      const pendientesList = document.getElementById('pendientesList');
      const nuevaCompraItem = document.createElement('li');
      nuevaCompraItem.textContent = `${data.compra.nombre} - ${data.compra.descripcion} - ${data.compra.fecha} - ${data.compra.esCompletado}`;
      pendientesList.appendChild(nuevaCompraItem);
    })
    .catch(error => console.error('Error:', error));
  });

  function cargarLista() {
    fetch('/pendientes')
    .then(response => response.json())
    .then(data => {
      const pendientesList = document.getElementById('pendientesList');
      pendientesList.innerHTML = '';
      data.forEach(item => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.esCompletado; // Marcar o desmarcar el checkbox según el estado del elemento
        checkbox.addEventListener('change', function() {
          // Enviar una solicitud al servidor para actualizar el estado del elemento
          fetch(`/actualizar-pendiente/${item.id}`, {
            method: 'PUT',
            body: JSON.stringify({ esCompletado: this.checked }), // Envía el nuevo estado del checkbox al servidor
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            // Actualizar la lista después de la respuesta del servidor
            cargarLista();
          })
          .catch(error => console.error('Error:', error));
        });
        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(`${item.nombre} - ${item.descripcion} - ${item.fecha}`));
        pendientesList.appendChild(listItem);
      });
    });
  }

// Cargar la lista cuando la página se cargue
window.onload = cargarLista;
