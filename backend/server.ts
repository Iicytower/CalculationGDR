import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import passportConfig from "./helpers/passportConfig";

try {
    const dburl = "mongodb+srv://admin:admin123@cluster0.ewwpc.mongodb.net/calculationgdr?retryWrites=true&w=majority";

    mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use(cookieParser());
app.use(cors());

import indexRouter from "./routes/index";
app.use("/", indexRouter);

const PORT: number = (!!process.env.PORT) ? parseInt(process.env.PORT) : 3000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
});