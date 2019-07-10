const db = require('../config/dbConfig.js')

module.exports = {
    get,
    add,
    findBy,
    findById
}

function get() {
    return db('users')
}

async function add(user){
    const [id] = await db('users').insert(user)
    return findById(id)
}

function findBy(filter) {
    return db('users').where(filter);
}

function findById(id) {
    return db('users')
        .where({id})
        .first()
}