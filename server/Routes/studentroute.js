import { Router } from "express";
import { connection } from "../main.js";
import { verifyUserToken } from "../Middleware/verifyUserToken.js";

const studrouter = Router();

studrouter.post("/addStudent", verifyUserToken, async(req,res) => {

    if(req.loginRole == "admin"){

        try {
            
            
        } catch (error) {
            
        }
    }

})