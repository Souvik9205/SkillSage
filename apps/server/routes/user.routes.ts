import { Router } from "express";
import {
  getPublicUserController,
  getUserController,
  onboardingUserController,
} from "../controller/user.controller";

const userRouter = Router();

userRouter.get("/", getUserController);
userRouter.get("/:userEmail", getPublicUserController);
userRouter.post("/onboarding", onboardingUserController);

export default userRouter;
