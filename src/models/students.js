const db = require('../../db')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////
  

//////////////////////////////////////////////////////////////////////////////
// Nested CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAllInstructors(studentId){
  return (
    db('students')
    .select('instructors.id as instructors_id',
            'instructors.name as instructors_name',
            'cohorts.id as cohorts_id',
            'cohorts.name as cohorts_name')
    .join('cohorts', 'cohorts.id', 'students.cohorts_id')
    .join('instructors_cohorts', 'instructors_cohorts.cohorts_id', 'cohorts.id')
    .join('instructors', 'instructors.id', 'instructors_cohorts.instructors_id')
    .where('students.id', studentId)
  )
}

const getAll = () => db('students')

const getOne = studentId => db('students').where({id: studentId}).first()

const create = name => db('instructors').insert({name}).returning('*').then(([data]) => data)

module.exports = {
  create,
  getAll,
  getOne,
  getAllInstructors
}
