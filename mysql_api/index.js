async function start() {
    const database = require("./database/db")
    const Purchase = require("./models/purchase")
    const User = require("./models/user")
    const Pet = require("./models/pet")

    try {
        await database.sync()
    }catch (error){
        console.log(error)
    }
}

start()