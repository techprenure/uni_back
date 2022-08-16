const mongoose = require('mongoose')

const DepartmentSchema = mongoose.Schema({
    name: String
});

const DepartmentModel = mongoose.model('Department', DepartmentSchema);

module.exports = DepartmentModel;