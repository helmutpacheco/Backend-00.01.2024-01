const CourseModel = require('../models/courses.model');
const crypto = require('crypto');

exports.createCourse = (req, res) => {
    CourseModel.createCourse(req.body)
        .then((result) => {
            res.status(201).send({ id: result._id });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Some error occurred while creating the course." });
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    CourseModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    CourseModel.findById(req.params.courseId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.updateCourse = (req, res) => {
    CourseModel.patchCourse(req.params.courseId, req.body)
        .then((course) => {
            if (!course) {
                return res.status(404).send({ message: "Course not found with id " + req.params.courseId });
            }
            res.status(200).send(course);
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: "Course not found with id " + req.params.courseId });
            }
            return res.status(500).send({ message: "Error updating course with id " + req.params.courseId });
        });
};

exports.removeById = (req, res) => {
    CourseModel.removeById(req.params.courseId)
        .then((result)=>{
            res.status(204).send({});
        });
};