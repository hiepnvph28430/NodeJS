
import express from "express";
import productRouter from "./routes/product";
import authRouter from "./routes/auth"
import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config()

const app = express();
//middlerware 
app.use(express.json());
// router
app.use("/api", productRouter);
app.use("/api", authRouter)
//connect to db
mongoose.connect("mongodb://127.0.0.1:27017/dbnodejs")

export const viteNodeApp = app;