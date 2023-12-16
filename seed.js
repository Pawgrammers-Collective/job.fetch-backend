// This fille will connect to the database server, add some documents, and then disconnect
const mongoose = require('mongoose');
require('dotenv').config();

// Bring in our Dog Schema
const Dog = require('./models/dogs.js');

// Open a connecton to the database
mongoose.connect( process.env.MONGODB_URL );

async function seed() {

    const geno = new Dog({
        name: "Geno",
        breed: "Pit Bull",
        hair: "White",
        tail: true
    });

    const rosie = new Dog({
        name: "Rosie",
        breed: "Lab",
        hair: "Blonde",
        tail: true
    });


    // Use .save()
    try { 
        await geno.save();
        console.log("Saved");
        await rosie.save();
        console.log("Saved");
    } catch(e) { 
        console.error(e.message);
    }

    try {
        await Dog.create({
            name: "Rocky",
            breed:"Collie",
            hair: "white",
            tail: false
        });
        console.log("Created directly");
    } catch(e) {
        console.error(e.message);
    }

    mongoose.disconnect();

}

seed();
