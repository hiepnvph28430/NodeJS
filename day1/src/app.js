
import express from "express";
import productRouter from "./routes/product";
import dotenv from "dotenv"
dotenv.config()

const app = express();
//middlerware 
app.use(express.json());
// router
app.use("/api", productRouter);

export const viteNodeApp = app;