import * as dotenv from "dotenv"; dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';

try {
    mongoose.connect(String(process.env.DATABASE_ADRESS), { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('connected to database'))
        .catch(err => console.log('error ', err))
    
} catch (err) {
    console.log("problem with connect to database");
    throw err;
}

const app: express.Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

import indexRouter from "./routes/index";
app.use("/", indexRouter);

const PORT: number = (!!process.env.PORT) ? parseInt(process.env.PORT) : 3000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
});