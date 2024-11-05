import express from "express";
import AuthController from "../controllers/auth.js";
const Auth = express.Router();
Auth.get("/password", AuthController.createdPassword);
Auth.post("/login", AuthController.login);
export default Auth;
