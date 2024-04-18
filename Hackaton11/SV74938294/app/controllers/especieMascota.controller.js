const db = require('../models');
const EspecieMascota = db.EspecieMascota;

exports.getAllEspecieMascota = async (req, res) => {
  try {
    const especie = await EspecieMascota.findAll();
    res.json(especie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addEspecieMascota = async (req, res) => {
  const { nombre } = req.body;
  
  try {
    const nuevaEspecie = await EspecieMascota.create({ nombre });
    res.status(201).json(nuevaEspecie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEspecieMascotaById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const especie = await EspecieMascota.findByPk(id);
    if (!especie) {
      return res.status(404).json({ message: 'Especie not found' });
    }
    res.json(especie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEspecieMascota = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  
  try {
    const especie = await EspecieMascota.findByPk(id);
    if (!especie) {
      return res.status(404).json({ message: 'Especie not found' });
    }
    especie.nombre = nombre;
    await especie.save();
    res.json(especie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEspecieMascota = async (req, res) => {
  const { id } = req.params;
  
  try {
    const especie = await EspecieMascota.findByPk(id);
    if (!especie) {
      return res.status(404).json({ message: 'Especie not found' });
    }
    await especie.destroy();
    res.json({ message: 'Especie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
