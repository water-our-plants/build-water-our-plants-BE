const db = require('../config/dbConfig.js')

module.exports = {
    get,
    add,
    findBy,
    findById,
    remove
}

function get() {
    return db('plants')
}

async function add(plant){
    const [id] = await db('plants').insert(plant)
    return findById(id)
}

async function findBy(filter) {
    return db('users').where(filter);
}

async function remove(id){
    return db('plants')
        .where('id', id)
        .del()
}
  
function findById(id) {
    return db('plants')
        .where({id})
        .first()
}
