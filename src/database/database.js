import config from "../config.js";
import mongoose from "mongoose";
(async () => {
    try {
        await mongoose.connect(config.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Data Connected');
    } catch (e) {
        console.log('Error to Connect DB');
        console.log(e);
    }
})();