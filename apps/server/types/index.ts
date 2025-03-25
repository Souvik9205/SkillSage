import { LearningNodeType } from "@prisma/client";

export interface successfulAuthResponse {
  status: number;
  data: {
    message: string;
    accessToken?: string;
    refreshToken?: string;
  };
}

export interface addInterviewQAServiceData {
  question: string;
  answer: string;
}

export interface createCarrerPathData {
  name: string;
  description: string;
  img: string;
  learningNodes: LearningNodes[];
}

export interface LearningNodes {
  title: string;
  type: LearningNodeType;
  rewardPoints: number;
}

export interface UpdateProgressData {
  score: number;
}
