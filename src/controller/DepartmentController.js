const DepartmentModel = require('../model/Department');

(async () => {
  await  DepartmentModel.find()
})()