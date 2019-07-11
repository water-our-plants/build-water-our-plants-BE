const db = require('../config/dbConfig.js')

module.exports = {
    get,
    add,
    findById,
    update,
    remove
}

function get() {
    return db('plants')
}

async function add(plant){
    const [id] = await db('plants').insert(plant)
    return findById(id)
}


async function update(id, changes) {
    return db('plants').where({id}).update(changes)
}

async function remove(id){
    return db('plants')
        .where({id})
        .del()
}
  
function findById(id) {
    return db('plants')
        .where({id})
        .first()
}
