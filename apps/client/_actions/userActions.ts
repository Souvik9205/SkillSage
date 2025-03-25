// import { useAuth } from "@/hooks/useAuth";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// const { accessToken } = useAuth();

export const getUserAction = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("refreshToken");
    const response = await fetch(`${BASE_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const status = response.status;
    return {
      data,
      status,
    };
  } catch (error: any) {
    return error;
  }
};

export const onboardUserAction = async (
  ageGroup: string,
  experience: string,
  purpose: string
): Promise<any> => {
  try {
    const token = localStorage.getItem("refreshToken");
    const response = await fetch(`${BASE_URL}/user/onboarding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ageGroup, experience, purpose }),
    });
    const data = await response.json();
    const status = response.status;
    return {
      data,
      status,
    };
  } catch (error: any) {
    return error;
  }
};
