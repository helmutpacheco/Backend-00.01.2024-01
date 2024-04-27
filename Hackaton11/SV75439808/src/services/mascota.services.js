const { req, res } = require("express");
const Mascota = require("../models/mascota.model.js");

const findAll = async (req, res) => {
  const result = await Mascota.findAll();
  const formatResult = result.map((e) => e.dataValues);
  res.json(formatResult);
};

const findOne = async (req, res) => {
  const result = await Mascota.findOne();
  const formatResult = result.map((e) => e.id == id);
  res.json(formatResult);
};

const createMascota = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const nuevaMascota = await Mascota.create(data);
    console.log(nuevaMascota.dataValues);
    res.json(nuevaMascota);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error creating Mascota" });
  }
};

const deleteMascota = async (req, res) => {
  const { id } = req.params;

  try {
    //Intentar eliminar la mascota por id
    const result = await Mascota.destroy({
      where: { id },
    });

    //Si ninguna fue afectada, la mascota no existe
    if (result === 0) {
      return res.status(404).json({ message: "Mascota not found" });
    }

    //Si se eliminó la mascota, enviar una respuesta adecuada
    res.json({ message: "Mascota deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while detenting the mascota" });
  }
};

const updateMascota = (req,res) => {
  const {id} = req.params;

  try {
  const result = await Mascota.update({
    where: {id},
  })
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while detenting the mascota" });
  }
}