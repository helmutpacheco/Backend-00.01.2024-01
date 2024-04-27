const {request, response} = require("express");
const bcrypt = require('bcrypt');
const UserModel = require("./entity");


const createUser = async(req = request, res = response) => {

    let {DNI, name, email, password} = req.body;

    if( !DNI || !name || !email || !password) {
        return res.status(400).json({message: "Datos incompletos"});
    }

    const saltRounds = Number(process.env.SALT_BCRYPT);
    const salt = bcrypt.genSaltSync(saltRounds);
    password = bcrypt.hashSync(password, salt);
    console.log(password);

    const newUser = await UserModel.create({
        DNI,
        name,
        email,
        password,
    });
    newUser.save()
    res.json(newUser);
};

const findOneUser = async(req = request, res = response) => {
    const {id} = req.params;
    console.log(id);

    const existUser = await UserModel.findById(id);

        if(!existUser){
            return res.status(400).json({message: "El usuario no existe."});
        }
    res.json(existUser);
}

const findAllUsers = async(req = request, res = response) => {
    const result = await UserModel.find();
    res.json(result);
}

const deleteUser = async(req = request, res = response) => {
    const {id} = req.params;

    try {
        const existUser = await UserModel.findByIdAndDelete(id);

        if (!existUser) {
            return res.status(400).json({message: "El usuario no existe."});
        }
        return res.json(existUser);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const updateUser = async (req = request, res = response) => {
    const { id } = req.params; 
    let { password, ...userData } = req.body; 

    try {
        
        if (password) {
            const saltRounds = Number(process.env.SALT_BCRYPT) || 10; 
            const salt = bcrypt.genSaltSync(saltRounds);
            password = bcrypt.hashSync(password, salt);
            userData.password = password; 
        }
   
        const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
            new: true, 
            runValidators: true 
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "El usuario no existe." });
        }
        return res.json(updatedUser);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createUser,
    findOneUser,
    findAllUsers,
    deleteUser,
    updateUser,
}