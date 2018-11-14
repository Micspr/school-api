const model = require('../models/students')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////
// Nested CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAllInstructors(req, res, next){
  model.getAllInstructors(parseInt(req.params.studentId))
  .then(function(data){
    return res.status(200).send({ data })
  })
  .catch(next)
}

const getAll = (req, res, next) => {
  model.getAll()
  .then(data => res.status(200).send({data}))
  .catch(next)
}

const getOne = (req, res, next) => {
  model.getOne(parseInt(req.params.studentId))
  .then(data => {
    if(data) {
      return res.status(200).send({data})
    } else {
      throw {status: 404, message: 'Student not found.'}
    }})
    .catch(next)
}

const create = (req, res, next) => {
  if(!req.body.name) 
    return next({status: 400, message: 'Please include a name.'})

  model.create(req.body.name)
  .then(data => res.status(201).send({data}))
  .catch(next)
}
//////////////////////////////////////////////////////////////////////////////
// Quality of Life functions
//////////////////////////////////////////////////////////////////////////////

function checkIfStudentExists(req, res, next){
  model.getOne(parseInt(req.params.studentId))
  .then(function(data){
    if(!data) next({ status: 404, message: 'Student Not Found' })
    next()
  })
}

module.exports = {
  create,
  getAll,
  getOne,
  getAllInstructors,
  checkIfStudentExists
}
