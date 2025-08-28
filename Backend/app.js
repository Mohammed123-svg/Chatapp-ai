import express, { urlencoded } from "express";

import morgan from "morgan";
import connect from "./DB/db.js";

import cookieParser from "cookie-parser";
import cors from "cors"

connect();

const app = express();
app.use(morgan("dev"));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())

//routes
import userroutes from "./Routes/user.routes.js";
import projectroutes from "./Routes/project.route.js"

app.use("/api/v2/user", userroutes);
app.use("/api/v2/project",projectroutes)

// app.get("/",(req,res)=>{
//     res.send("hello wolrd")

// })

export default app;
