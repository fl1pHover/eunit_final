"use server";
import { ServiceType } from "@/config/enum";
import { api } from "@/utils/routes";
import { cookies } from "next/headers";

export const sendRequest = async (
  location: number,
  value: {
    room?: number;
    floor?: number;
    area: number;
    no?: string;
    count?: number;
    startDate?: Date;
    endDate?: Date;
    payment: number;
  },
  service: number
) => {
  const token = (await cookies()).get("auth_token");
  if (!token?.value) return { token: false };
  try {
    const body = {
      location: location,
      area: value.area,
      no: value.no,
      room: value.room,
      floor: value.floor,
      service: service,
      startDate: value.startDate,
      endDate: value.endDate,
      count: value.count,
      payment: value.payment,
    };
    const res = await fetch(`${api}request`, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value ?? ""}`,
      },
    }).then((d) => d.json());
    return {
      data: res.payload,
      token: true,
      message: res?.payload?.message,
      status: res?.payload?.status,
      success: res.succeed,
    };
  } catch (error) {
    // console.error(error);
  }
};

export const checkPayment = async (id: number, code: string) => {
  const token = (await cookies()).get("auth_token");
  if (!token?.value) return { token: false };
  try {
    const res = await fetch(`${api}request/payment/${id}/${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value ?? ""}`,
      },
    }).then((d) => d.json());
    return {
      data: res.payload,
      token: true,
      message: res?.payload?.message,
      status: res?.payload?.status,
      success: res.succeed,
    };
  } catch (error) {
    // console.error(error);
  }
};
export const getRequestResult = async (id: number) => {
  const token = (await cookies()).get("auth_token");
  if (!token?.value) return { token: false };
  try {
    const res = await fetch(`${api}request/service/${id}`, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value ?? ""}`,
      },
    }).then((d) => d.json())
    return {
      data: res.payload,
      token: true,
      message: res?.payload?.message ?? res.message,
      status: res?.payload?.status,
      success: res.succeed,
    };
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message,
    };
  }
};
export const getRequestUser = async (page: number, limit: number) => {
  const token = (await cookies()).get("auth_token");
  if (!token?.value) return { token: false };
  try {
    const res = await fetch(`${api}request/user/${page}/${limit}`, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value ?? ""}`,
      },
    }).then((d) => d.json());

    return {
      data: res.payload,
      token: true,
      message: res?.payload?.message,
      status: res?.payload?.status,
      success: res.succeed,
    };
  } catch (error) {
    // console.error(error);
  }
};
export const getRequestAllUser = async () => {
  const token = (await cookies()).get("auth_token");
  if (!token?.value) return { token: false };
  try {
    const res = await fetch(`${api}request/all`, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value ?? ""}`,
      },
    }).then((d) => d.json());
    return {
      data: res.payload,
      token: true,
      message: res?.payload?.message,
      status: res?.payload?.status,
      success: res.succeed,
    };
  } catch (error) {
    // console.error(error);
  }
};
