const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    nombre : String,
    valor : Number,
});


courseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
courseSchema.set('toJSON', {
    virtuals: true
});

courseSchema.findById = function (cb) {
    return this.model('Courses').find({id: this.id}, cb);
};

const Course = mongoose.model('Courses', courseSchema);


exports.findByName = (nombre) => {
    return Course.find({nombre: nombre})
    .then(data =>{;
        return data.length > 0 ? data : false;
    })
    .catch(err =>{
        console.log(err);
        return false;
    });
};

exports.findById = (id) => {
    return Course.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createCourse = (courseData) => {
    const course = new Course(courseData);
    return course.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Course.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, courses) {
                if (err) {
                    reject(err);
                } else {
                    resolve(courses);
                }
            })
    });
};

exports.patchCourse = (id, courseData) => {
    return Course.findOneAndUpdate({
        _id: id
    }, courseData);
};

exports.removeById = (courseId) => {
    return new Promise((resolve, reject) => {
        Course.deleteMany({_id: courseId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
