const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/MQTT_Sensor", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error(err);
    }
};

connectDB();

const thingSchema = new mongoose.Schema(
    {},
    { strict: false }
);

let Thing;
if (!mongoose.modelNames().includes('TempHumid')) {
    // Declare the model only if it hasn't been declared before
    Thing = mongoose.model("TempHumid", thingSchema);
} else {
    // If the model already exists, you can simply retrieve it
    Thing = mongoose.model("TempHumid");
}

app.get("/fetchData", async (req, res) => {
    Thing.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
