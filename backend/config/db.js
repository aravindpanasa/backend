const mongoose = require('mongoose');

var connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo db connect succesfully " + conn.connection.host);
    }
    catch (err) {
        console.log("Error occured " + err);  
    }
}

module.exports = connectDb;