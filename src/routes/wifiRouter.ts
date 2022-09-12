import express from 'express';
import { createWiFi, deleteWiFi, findWiFi, findWiFis } from '../controllers/wifiController.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { wifiSchema } from '../schemas/wifiSchema.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const wifiRouter = express.Router();
wifiRouter.post("/wifi/create", (req, res, next) => validate(req, res, next, wifiSchema), verifyToken, createWiFi);
wifiRouter.get("/wifi/find", verifyToken, findWiFis);
wifiRouter.get("/wifi/find/:id", verifyToken, findWiFi);
wifiRouter.delete("/wifi/delete/:id", verifyToken, deleteWiFi);


export default wifiRouter