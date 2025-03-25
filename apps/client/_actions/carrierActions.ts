const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getCarriersAction = async (): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/carrier`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
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

export const getCarrierByIdAction = async (
  carrerPathId: string
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/carrier/${carrerPathId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
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

export const getUserProgressAction = async (
  carrerPathId: string
): Promise<any> => {
  try {
    const response = await fetch(
      `${BASE_URL}/carrier/progress/${carrerPathId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      }
    );
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
