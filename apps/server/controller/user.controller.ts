import { Response, Request } from "express";
import {
  getPublicUserService,
  getUserService,
  onboardUserService,
} from "../services/user.service";

export const getUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.headers.authorization?.split(" ")[1];
  if (!userId) {
    res.status(401).json({ message: "Unauthorized: user id missing" });
    return;
  }
  try {
    const result = await getUserService(userId);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPublicUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.headers.authorization?.split(" ")[1];
  if (!userId) {
    res.status(401).json({ message: "Unauthorized: user id missing" });
    return;
  }
  const { userEmail } = req.params;
  try {
    const result = await getPublicUserService(userEmail);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const onboardingUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.headers.authorization?.split(" ")[1];
  const { ageGroup, experience, purpose } = req.body;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized: user id missing" });
    return;
  }
  if (!ageGroup || !experience || !purpose) {
    res
      .status(400)
      .json({ message: "Age group, experience and purpose are required" });
    return;
  }
  try {
    const result = await onboardUserService(userId, {
      ageGroup,
      experience,
      purpose,
    });
    res.status(result.status).json(result.message);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
