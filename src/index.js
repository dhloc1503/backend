import express from "express";
import router from "./routers/index.js";
const app = express();
router(app);
export default app;
