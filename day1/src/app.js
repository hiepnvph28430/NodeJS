
import express from "express";
import productRouter from "./routes/product";
import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config()

const app = express();
//middlerware 
app.use(express.json());
// router
app.use("/api", productRouter);
//connect to db
mongoose.connect("mongodb://127.0.0.1:27017/dbnodejs")

export const viteNodeApp = app;