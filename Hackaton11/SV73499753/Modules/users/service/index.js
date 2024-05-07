const { request, response } = require("express");
const User = require("../model/user"); // Importa el
const findAll =async (req=request,res=response) => {
   
        const result = await User.findAll(); // Llama a findAll() en el modelo de usuario
        const formtResult = result.map((users) => users.dataValues);
        console.log(formtResult); 

        res.json(formtResult); // Devuelve los datos del usuario en formato JSON

};


const createUser =  async (req=request,res=response)=>{
    const data = req.body;
    const newUser = await User.create (data); // Crea un nuevo usuario con la información que se le pasa por par
    
    console.log(newUser.dataValues);
    res.json(newUser.dataValues);
}
module.exports = {
    findAll,
    createUser
}
