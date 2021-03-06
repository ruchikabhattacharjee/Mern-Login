const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//Set up express

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server is connected on port: ${PORT}`));

//set up mongoose

mongoose.connect(
    process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    }, (err) => {
        if(err) throw err;
        console.log(`MONGODB connection established`);
    }
);

app.use('/users', require('./routes/userRoutes'));