import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./routes/user.js"; // ✅ Corrected import
import recipeRouter from './routes/recipe.js'
import cors from "cors"


const app = express();

app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:5173"],
      credentials: true,
    })
  );
  
// Middleware
app.use(express.json());


// Routes
app.use("/api", userRouter); 

// recipeRouter
app.use('/api/recipes',recipeRouter)
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME
}).then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

  
  

/* import express from 'express'
import mongoose from 'mongoose';
import userRouter from "./routes/user.js"; // ✅ Correct

import bodyParser from 'body-parser';
import dotenv from 'dotenv';
const app = express();

app.use(bodyParser.json());
// userRouter
app.use('/api',userRouter)


// connection between node.js and mongodb atlas
// mongodb+srv:// -> uses the mongodb atlas SRV protocol for connecting to a cloud hosted database.
// akashdugale2003 -> mongodb username

mongoose.connect(process.env.MONGO_URI,
    {dbName: "The_Recipe_Haven_App"}

).then(()=>console.log("Mongodb is connected..")).catch((err)=>console.log(err.message));

const port = 3000;

app.listen(port,() => console.log(`server is running on port ${port}`));

// username : akashdugale2003
// password : dBXyE5Iq8rnZBWxi
 */