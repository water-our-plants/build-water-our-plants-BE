const db = require('../config/dbConfig.js')

module.exports = {
    get,
    add,
    findBy,
    findById,
    update
}

function get() {
    return db('users')
}

async function add(user){
    const [id] = await db('users').insert(user)
    return findById(id)
}

async function update(id, changes) {
    return db('users').where({id}).update(changes)
}

function findBy(filter) {
    return db('users').where(filter);
}

function findById(id) {
    return db('users')
        .where({id})
        .first()
}
