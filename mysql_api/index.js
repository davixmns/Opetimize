async function start() {
    const database = require('./database/db');
    const Purchase = require('./models/purchase');
    const Pet = require('./models/pet');
    const User = require('./models/user');

    try {
        await database.sync({ force: true });

        const user = await User.create({
            name: 'Davi Ximenes',
            email: 'dropperdavi@gmail.com',
            password: 'minhasenha',
        });
        console.log(user.user_id)
        const purchase = await Purchase.create({
            name: 'dog show',
            user_id: user.user_id,
            price: 18.89,
            weight: 900,
            date: new Date(),
        });

        const pet = await Pet.create({
            name: "Zeus",
            breed:"Pastor Alemão",
            age: 8,
            weight: 25,
            user_id:user.user_id
        })

        const pet2 = await Pet.create({
            name: "Thor",
            breed:"HotVailer",
            age: 8,
            weight: 25,
            user_id:user.user_id
        })

    } catch (error) {
        console.log(error);
    }
}

start();





