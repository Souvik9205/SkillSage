const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const loginAction = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const status = response.status;
    const data = await response.json();
    return {
      data,
      status,
    };
  } catch (error: any) {
    return error;
  }
};

export const sendOTPAction = async (email: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export const OTPVerificationAction = async (
  email: string,
  otp: string,
  name: string,
  password: string,
  avatar?: string
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/otp-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp, name, password, avatar }),
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
