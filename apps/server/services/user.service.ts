import { AgeGroup, Experience, Purpose } from "@prisma/client";
import { decodeToken } from "../utils/decodeToken";
import prisma from "../utils/PrismaClient";

export const getUserService = async (
  userId: string
): Promise<{
  status: number;
  data: { message?: string; user?: any };
}> => {
  const id = decodeToken(userId);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      onboardingResponses: true,
      learningProgress: true,
      interviews: true,
      sentConnections: true,
      receivedConnections: true,
    },
  });
  if (!user) {
    return {
      status: 404,
      data: { message: "User not found" },
    };
  }
  return {
    status: 200,
    data: { user },
  };
};

export const getPublicUserService = async (
  email: string
): Promise<{
  status: number;
  data: { message?: string; user?: any };
}> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      onboardingResponses: true,
      learningProgress: true,
      interviews: true,
      sentConnections: true,
      receivedConnections: true,
    },
  });
  if (!user) {
    return {
      status: 404,
      data: { message: "User not found" },
    };
  }
  return {
    status: 200,
    data: { user },
  };
};

export const onboardUserService = async (
  userId: string,
  data: {
    ageGroup: AgeGroup;
    experience: Experience;
    purpose: Purpose;
  }
): Promise<{
  status: number;
  message: string;
}> => {
  const id = decodeToken(userId);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      onboardingResponses: true,
    },
  });
  if (!user) {
    return {
      status: 404,
      message: "User not found",
    };
  }
  await prisma.onboardingResponse.create({
    data: {
      userId: user.id,
      ageGroup: data.ageGroup,
      experience: data.experience,
      purpose: data.purpose,
      compleated: true,
    },
  });
  return {
    status: 200,
    message: "User onboarding completed",
  };
};
