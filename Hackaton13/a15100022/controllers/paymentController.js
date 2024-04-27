exports.processPayment = async (req, res) => {
    try {
      // Obtener la información del usuario y los cursos a comprar desde el cuerpo de la solicitud
      const { userId, courses } = req.body;
  
      // Verificar si se proporcionaron los datos necesarios
      if (!userId || !courses || courses.length === 0) {
        return res.status(400).json({ message: 'Por favor, proporcione información de usuario y cursos para procesar el pago' });
      }
  
      // Simular el cálculo del monto total a pagar sumando el precio de cada curso
      const totalAmount = courses.reduce((total, course) => total + course.price, 0);
  
      // Simular un tiempo de espera de 2 segundos para simular el procesamiento del pago
      setTimeout(() => {
        // Respuesta simulada indicando que el pago ha sido procesado correctamente
        res.status(200).json({ message: 'Pago procesado correctamente', totalAmount });
      }, 2000);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al procesar el pago' });
    }
  };