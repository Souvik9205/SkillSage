import { Router } from "express";
import {
  createCarrerPathController,
  getCarrerPathByIdController,
  getCarrerPathController,
  getLearningNodesByIdController,
  getUserProgressController,
  subscribePathController,
  updateProgressController,
} from "../controller/carrer.controller";

const carrerRouter = Router();

carrerRouter.get("/", getCarrerPathController);
carrerRouter.get("/:carrerPathId", getCarrerPathByIdController);
carrerRouter.post("/create", createCarrerPathController);
carrerRouter.get("/nodes/:carrerPathId", getLearningNodesByIdController);
carrerRouter.get("/subscribe/:carrerPathId", subscribePathController);
carrerRouter.get("/progress/:carrerPathId", getUserProgressController);
carrerRouter.post("/update-progress/:carrerPathId", updateProgressController);

export default carrerRouter;
