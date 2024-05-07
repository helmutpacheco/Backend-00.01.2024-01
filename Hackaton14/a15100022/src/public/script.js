document.addEventListener('DOMContentLoaded', async () => {
  const messageForm = document.getElementById('message-form');
  const senderInput = document.getElementById('sender');
  const messageInput = document.getElementById('message');
  const chatMessages = document.getElementById('chat-messages');
  const editMessageBtn = document.getElementById('edit-message-btn');
  const deleteMessageBtn = document.getElementById('delete-message-btn');
  const clearHistoryBtn = document.getElementById('clear-history-btn');

  // Función para mostrar mensajes en el chat
  const displayMessage = (sender, message, messageId) => {
    // Crear un nuevo elemento div para el mensaje
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messageElement.dataset.messageId = messageId; // Agregar el atributo data-message-id
    chatMessages.appendChild(messageElement);
};


  // Función para obtener y mostrar todos los mensajes
  const fetchMessages = async () => {
      chatMessages.innerHTML = ''; // Limpiar mensajes existentes
      const response = await fetch('/messages');
      let messages = await response.json();

      messages.forEach(({ sender, message, _id }) => {
          displayMessage(sender, message, _id);
      });
  };

  // Obtener y mostrar mensajes al cargar la página
  fetchMessages();

  // Manejar el envío de mensajes
  messageForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const sender = senderInput.value;
      const message = messageInput.value;
      if (sender && message) {
          await fetch('/messages', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ sender, message })
          });
          senderInput.value = '';
          messageInput.value = '';
          fetchMessages();
      } else {
          alert('Por favor, ingresa tu nombre y un mensaje.');
      }
  });

  // Manejar clic en un mensaje para mostrar botones de edición y eliminación
  chatMessages.addEventListener('click', (e) => {
    if (e.target.classList.contains('message')) {
        const messageId = e.target.dataset.messageId; // Obtener el ID del mensaje
        console.log("ID del mensaje:", messageId); // Verificar si se capturó correctamente
        editMessageBtn.style.display = 'inline-block';
        deleteMessageBtn.style.display = 'inline-block';
        deleteMessageBtn.dataset.messageId = messageId; // Establecer el ID del mensaje en el botón de eliminación
    }
});

 // Manejar clic en el botón de eliminar mensaje
deleteMessageBtn.addEventListener('click', async (e) => {
    const messageId = e.target.dataset.messageId;
    const confirmation = confirm('¿Estás seguro de que quieres eliminar este mensaje?');
    if (confirmation) {
        await fetch(`/messages/${messageId}`, {
            method: 'DELETE'
        });
        await fetchMessages();
        editMessageBtn.style.display = 'none';
        deleteMessageBtn.style.display = 'none';
    }
});
// Manejar clic en el botón de editar mensaje

editMessageBtn.addEventListener('click', async () => {
    const messageId = editMessageBtn.dataset.messageId;
    const newMessage = prompt('Edit message:');
    if (newMessage !== null) {
        try {
            await fetch(`/message/${messageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ updatedMessage: newMessage })
            });
            await fetchMessages(); // Actualizar mensajes después de la edición
        } catch (error) {
            console.error('Error sending PUT request:', error);
            alert('There was an error editing the message. Please try again.');
        }
    }
});
  // Manejar clic en el botón de borrar historial
  clearHistoryBtn.addEventListener('click', async () => {
      const confirmation = confirm('Are you sure you want to delete all messages? This action cannot be undone.');
      if (confirmation) {
          await fetch('/clear-history', {
              method: 'DELETE'
          });
          chatMessages.innerHTML = ''; // Clear messages on the client side
          editMessageBtn.style.display = 'none';
          deleteMessageBtn.style.display = 'none';
      }
  });
});