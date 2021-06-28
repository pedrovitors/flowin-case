import express from "express";
import {LeilaoController} from "../controller/LeilaoController";

export const leilaoRouter = express.Router()
const leilaoController = new LeilaoController

leilaoRouter.post("/create", leilaoController.create)

leilaoRouter.post("/bid/:id", leilaoController.bid)

leilaoRouter.get("/", leilaoController.getAllItems)

leilaoRouter.get("/:title", leilaoController.getSpecificItem)