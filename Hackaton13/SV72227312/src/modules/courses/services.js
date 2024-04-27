const {request, response} = require("express");
const CourseModel = require("./entity");


const createCourse = async(req = request, res = response) => {
    try {
        const data = req.body;
        const existCourse = await CourseModel.findOne({name: data.name});

        if (existCourse) {
            return res.status(400).json({message: "El curso ya existe."});
        }

        const newCourse = await CourseModel.create(data);
        return res.json(newCourse); 
    } catch (err) {
        return res.status(400).json({message: err.message}); 
    }
};

const findOneCourse = async(req = request, res = response) => {
    const {id} = req.params;
    console.log(id);

    const existCourse = await CourseModel.findById(id);

        if(!existCourse){
            return res.status(400).json({message: "El curso no existe."});
        }
    res.json(existCourse);
}

const findAllCourse = async(req = request, res = response) => {
    const result = await CourseModel.find();
    res.json(result);
}

const deleteCourse = async(req = request, res = response) => {
    const {id} = req.params;

    try {
        const existCourse = await CourseModel.findByIdAndDelete(id);

        if (!existCourse) {
            return res.status(400).json({message: "El curso no existe."});
        }
        return res.json(existCourse);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const updateCourse = async (req = request, res = response) => {
    const { id } = req.params;  
    const courseData = req.body; 

    try {
    
        const updatedCourse = await CourseModel.findByIdAndUpdate(id, courseData, {
            new: true,  
            runValidators: true  
        });

        if (!updatedCourse) {
            return res.status(404).json({ message: "El curso no existe." });
        }
        return res.json(updatedCourse);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createCourse,
    findOneCourse,
    findAllCourse,
    deleteCourse,
    updateCourse,
}