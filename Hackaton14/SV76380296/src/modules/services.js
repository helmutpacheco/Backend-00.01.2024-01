const { request, response } = require("express");
const MessageModel = require("./entity");

const createMessage = async (req = request, res = response) => {
    try {
      const data = req.body;
  
      const newMessage = await MessageModel.create(data);
  
      newMessage.save();
  
      res.json(newMessage);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  const deleteOneMessage = async (req = request, res = response) => {
    const { id } = req.params;
    console.log(id)
  
    const existMessage = await MessageModel.findById(id);
    if (!existMessage) {
      return res.status(400).json({ message: "El curso no existe" });
    }
    res.json(existMessage);
  };


  const createMessage2 = async (req = request, res = response) => {
    try {

      const newMessage = await MessageModel.create(data);
  
      newMessage.save();
      
    } catch (err) {
      console.log(err)
    }
  };


  module.exports = {
    createMessage,
    deleteOneMessage
  };