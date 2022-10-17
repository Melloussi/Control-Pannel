require('dotenv').config()
const { MongoClient } = require("mongodb");
const BSON = require('bson')


async function conn_db() {
    try {
        const client = new MongoClient(process.env.DB_CONNECTION_LINK, { useNewUrlParser: true });
        const collection = client.db("Stream_db").collection("users")
        console.log("DB Connected...")
        return collection
    } catch (error) {
        console.log(error)
    }
}

exports.getUsers = async function getUsers(user) {

    const collection = await conn_db()
    const users = await collection.find({ "username": user }).toArray()

    return users

}

exports.getUserById = async function getUserById(id) {

    const collection = await conn_db()
    const user = await collection.find({ "_id": new BSON.ObjectId(id) }).toArray()

    return user

}