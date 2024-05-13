import { config } from "dotenv";
import express from "express";
import path from "path";
import databaseConnection from "./database/connection.js";
import ejs from "ejs";

config();
const app = express();
const PORT = process.env.PORT || 3000;
databaseConnection();
app.set("view engine", "ejs");
app.set("views", 'views');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
import indexRouter from "./routes/index.js";
import adminRouter from "./routes/admin.js";
import cookieParser from "cookie-parser";
app.use('/', indexRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => console.log(`express app listening on port: ${PORT}!`));
