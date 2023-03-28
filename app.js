import express from "express";
// import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectionDB from "./utils/connectionDB.js";
import routes from "./routes/routes.js";


dotenv.config();
connectionDB();



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true } ));
app.use(routes);




app.get("/", (req, res)=>{
                            res.json(`Welcome to Goibibo hotel booking Web clone app`);
                          }
        );



let PORT = process.env.PORT||5001;
const server = app.listen(PORT , () =>{
                          console.log(`Hotel booking app Web clone app server is running on http://localhost:${PORT}`);
                       }
          );
