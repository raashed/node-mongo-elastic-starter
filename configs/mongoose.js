const mongoose = require('mongoose');
const config = require('./index');

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(config.mongoUrl).catch(err => {
    console.log("Mongoose connection error: " + err);
});

mongoose.connection.once("open", () => {
    console.log("Mongoose connected.");

    mongoose.connection.on("connected", () => {
        console.log("Mongoose event connected");
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Mongoose event disconnected");
    });

    mongoose.connection.on("reconnected", () => {
        console.log("Mongoose event reconnected");
    });

    mongoose.connection.on("error", error => {
        console.log("Mongoose event error");
        console.log(error);
    });
});

module.exports = mongoose;
