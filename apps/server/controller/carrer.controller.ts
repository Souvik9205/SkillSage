import { Response, Request } from "express";
import {
  createCarrerPathService,
  getCarrerPathByIdService,
  getCarrerPathService,
  getLearningNodesService,
  getUserProgressService,
  subscribePathService,
  updateProgressService,
} from "../services/career.service";

export const getCarrerPathController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.headers.authorization?.split(" ")[1];
  if (!userId) {
    res.status(401).json({ message: "Unauthorized: user id missing" });
    return;
  }
  try {
    const result = await getCarrerPathService(userId);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCarrerPathByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.headers.authorization?.split(" ")[1];
  if (!userId) {
    res.status(401).json({ message: "Unauthorized: user id missing" });
    return;
  }
  const { carrerPathId } = req.params;
  if (!carrerPathId) {
    res.status(400).json({ message: "CarrierPath Id is missing" });
    return;
  }
  try {
    const result = await getCarrerPathByIdService(userId, carrerPathId);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Get Carrer Path by Id error", error);
    res.status(500).json({ message: `${error}` });
  }
};

export const createCarrerPathController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.headers.authorization?.split(" ")[1];
  if (!userId) {
    res.status(401).json({ message: "Unauthorized: user id missing" });
    return;
  }
  const { data } = req.body;
  if (!data || data.length === 0) {
    res.status(400).json({ message: "Data is missing" });
    return;
  }
  try {
    const result = await createCarrerPathService(userId, data);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLearningNodesByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.headers.authorization?.split(" ")[1];
  if (!userId) {
    res.status(401).json({ message: "Unauthorized: user id missing" });
    return;
  }
  const { carrerPathId } = req.params;
  if (!carrerPathId) {
    res.status(400).json({ message: "CarrierPath Id is missing" });
    return;
  }
  try {
    const result = await getLearningNodesService(userId, carrerPathId);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Get Carrer Path by Id error", error);
    res.status(500).json({ message: `${error}` });
  }
};

export const subscribePathController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.headers.authorization?.split(" ")[1];
  if (!userId) {
    res.status(401).json({ message: "Unauthorized: user id missing" });
    return;
  }
  const { carrerPathId } = req.params;
  if (!carrerPathId) {
    res.status(400).json({ message: "CarrierPath Id is missing" });
    return;
  }
  try {
    const result = await subscribePathService(userId, carrerPathId);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Get Carrer Path by Id error", error);
    res.status(500).json({ message: `${error}` });
  }
};

export const getUserProgressController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.headers.authorization?.split(" ")[1];
  if (!userId) {
    res.status(401).json({ message: "Unauthorized: user id missing" });
    return;
  }
  const { carrerPathId } = req.params;
  const { score } = req.body;
  if (!carrerPathId) {
    res.status(400).json({ message: "CarrierPath Id is missing" });
    return;
  }
  try {
    const result = await getUserProgressService(userId, carrerPathId);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Get Carrer Path by Id error", error);
    res.status(500).json({ message: `${error}` });
  }
};

export const updateProgressController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.headers.authorization?.split(" ")[1];
  if (!userId) {
    res.status(401).json({ message: "Unauthorized: user id missing" });
    return;
  }
  const { carrerPathId } = req.params;
  const { score } = req.body;
  if (!carrerPathId) {
    res.status(400).json({ message: "CarrierPath Id is missing" });
    return;
  }
  const data = { score };
  try {
    const result = await updateProgressService(userId, carrerPathId, data);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Get Carrer Path by Id error", error);
    res.status(500).json({ message: `${error}` });
  }
};
