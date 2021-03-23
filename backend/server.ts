import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import passportConfig from "./helpers/passportConfig";

try {
    //TODO adress from eviroment variables
    const dburi: string = 'mongodb+srv://admin:admin123@cluster0.ewwpc.mongodb.net/calculationgdr?retryWrites=true&w=majority';
    // const dburi: string = String(process.env.DATABASE_ADRESS);    
    mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('connected to database'))
        .catch(err => console.log('error ', err))

} catch (err) {
    console.log("problem with connect to database");
    throw err;
}

passportConfig();

const app: express.Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.SECRET ?? "secret"));
app.use(cors({
    allowedHeaders: ['Content-Type'],
    origin: "http://localhost:8080",
    preflightContinue: true,
    credentials: true,
}));

import indexRouter from "./routes/index";
app.use("/", indexRouter);

const PORT: number = (!!process.env.PORT) ? parseInt(process.env.PORT) : 3000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
});