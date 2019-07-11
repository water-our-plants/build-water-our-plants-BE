const db = require('../config/dbConfig.js')

module.exports = {
    get,
    add,
    findBy,
    findById
}

function get() {
    return db('plants')
}

async function add(plant){
    const [id] = await db('plants').insert(plant)
    return findById(id)
}

function findBy(filter) {
    return db('users').where(filter);
}

function findById(id) {
    return db('plants')
        .where({id})
        .first()
}
