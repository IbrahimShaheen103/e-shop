import api from "./axios";

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  return api.post("/auth/login", payload);
};
