import { createCarrerPathData, UpdateProgressData } from "../types";
import prisma from "../utils/PrismaClient";
import { decodeToken } from "../utils/decodeToken";

export const getCarrerPathService = async (
  userId: string
): Promise<{
  status: number;
  data: { message?: string; carrerPath?: any };
}> => {
  const id = decodeToken(userId);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return {
      status: 404,
      data: { message: "User not found" },
    };
  }
  const carrerPath = await prisma.careerPath.findMany();
  if (!carrerPath) {
    return {
      status: 404,
      data: { message: "Carrer path not found" },
    };
  }
  return {
    status: 200,
    data: { carrerPath },
  };
};

export const getCarrerPathByIdService = async (
  userId: string,
  carrerPathId: string
): Promise<{
  status: number;
  data: { message?: string; carrerPath?: any };
}> => {
  const id = decodeToken(userId);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return {
      status: 404,
      data: { message: "User not found" },
    };
  }
  const carrerPath = await prisma.careerPath.findUnique({
    where: {
      id: carrerPathId,
    },
    include: {
      learningNodes: true,
      subscriptions: true,
    },
  });
  if (!carrerPath) {
    return {
      status: 404,
      data: { message: "Carrer path not found" },
    };
  }
  return {
    status: 200,
    data: { carrerPath },
  };
};

export const createCarrerPathService = async (
  userId: string,
  data: createCarrerPathData
): Promise<{
  status: number;
  data: { message?: string; carrerPath?: any };
}> => {
  const id = decodeToken(userId);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return {
      status: 404,
      data: { message: "User not found" },
    };
  }
  const carrerPath = await prisma.careerPath.create({
    data: {
      name: data.name,
      description: data.description,
      img: data.img,
      learningNodes: {
        create: data.learningNodes.map((node, index) => ({
          title: node.title,
          type: node.type,
          rewardPoints: node.rewardPoints,
          order: index + 1,
        })),
      },
    },
  });
  if (!carrerPath) {
    return {
      status: 404,
      data: { message: "Carrer path not found" },
    };
  }
  return {
    status: 200,
    data: { carrerPath },
  };
};

export const getLearningNodesService = async (
  userId: string,
  carrerPathId: string
): Promise<{
  status: number;
  data: { message?: string; learningNodes?: any };
}> => {
  const id = decodeToken(userId);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return {
      status: 404,
      data: { message: "User not found" },
    };
  }
  const careerPath = await prisma.careerPath.findUnique({
    where: {
      id: carrerPathId,
    },
    select: {
      learningNodes: true,
    },
  });
  if (!careerPath) {
    return {
      status: 404,
      data: { message: "Learning nodes not found" },
    };
  }
  const learningNodes = careerPath.learningNodes;
  return {
    status: 200,
    data: { learningNodes },
  };
};

export const subscribePathService = async (
  userId: string,
  careerPathId: string
): Promise<{
  status: number;
  data: { message?: string; carrerPath?: any };
}> => {
  const id = decodeToken(userId);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return {
      status: 404,
      data: { message: "User not found" },
    };
  }
  const existingSubscription = await prisma.userLearningProgress.findFirst({
    where: {
      userId: id,
      careerPathId,
    },
  });
  if (existingSubscription) {
    return {
      status: 400,
      data: { message: "User already subscribed to this career path" },
    };
  }

  const carrerPath = await prisma.careerPath.findUnique({
    where: {
      id: careerPathId,
    },
    select: {
      learningNodes: true,
    },
  });
  if (!carrerPath) {
    return {
      status: 404,
      data: { message: "Carrer path not found" },
    };
  }
  const subscribe = await prisma.userLearningProgress.create({
    data: {
      userId,
      careerPathId,
      currentNodeID: carrerPath.learningNodes[0].id,
      userLearningNodes: {
        create: carrerPath.learningNodes.map((node) => ({
          title: node.title,
          type: node.type,
          rewardPoints: node.rewardPoints,
          order: node.order,
        })),
      },
    },
  });

  if (!subscribe) {
    return {
      status: 404,
      data: { message: "Error While Subscribing" },
    };
  }
  return {
    status: 200,
    data: { message: "Subscribed!" },
  };
};

export const getUserProgressService = async (
  userId: string,
  careerPathId: string
): Promise<{
  status: number;
  data: { message?: string; progress?: any };
}> => {
  const id = decodeToken(userId);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return {
      status: 404,
      data: { message: "User not found" },
    };
  }
  const carrerPath = await prisma.careerPath.findUnique({
    where: {
      id: careerPathId,
    },
  });
  if (!carrerPath) {
    return {
      status: 404,
      data: { message: "Carrier path not found" },
    };
  }

  const progress = await prisma.userLearningProgress.findFirst({
    where: {
      userId,
      careerPathId,
    },
    include: {
      userLearningNodes: true,
      careerPath: true,
      user: true,
    },
  });

  if (!progress) {
    return {
      status: 404,
      data: { message: "Progress not found" },
    };
  }

  return {
    status: 200,
    data: { progress },
  };
};

export const updateProgressService = async (
  userId: string,
  careerPathId: string,
  data: UpdateProgressData
): Promise<{
  status: number;
  data: { message?: string; carrerPath?: any };
}> => {
  const id = decodeToken(userId);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return {
      status: 404,
      data: { message: "User not found" },
    };
  }
  const carrerPath = await prisma.careerPath.findUnique({
    where: {
      id: careerPathId,
    },
  });
  if (!carrerPath) {
    return {
      status: 404,
      data: { message: "Carrier path not found" },
    };
  }

  const progress = await prisma.userLearningProgress.findFirst({
    where: {
      userId,
      careerPathId,
    },
    select: {
      id: true,
      currentNodeID: true,
      userLearningNodes: true,
    },
  });

  if (!progress) {
    return {
      status: 404,
      data: { message: "Progress not found" },
    };
  }
  const currentNode = progress.userLearningNodes.find(
    (node) => node.id === progress.currentNodeID
  );
  const NextNodeOrder = currentNode?.order! + 1;
  const nextNode = progress.userLearningNodes.find(
    (node) => node.order == NextNodeOrder
  );

  const update = await prisma.userLearningProgress.update({
    where: {
      id: progress.id,
    },
    data: {
      currentNodeID: nextNode?.id,
      score: data.score,
    },
  });
  if (!update) {
    return {
      status: 402,
      data: { message: "Error while Updating" },
    };
  }

  return {
    status: 200,
    data: { message: "updated!" },
  };
};

//TODO: UPDATE CARRER
//TODO: SUBSCRIBE TO CARRER
//TODO: USER LEARNING PROGRESS
//TODO: USER SPECIFIC LEARNING NODE
