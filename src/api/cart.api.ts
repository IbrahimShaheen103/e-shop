import api from "./axios";

export type CartResponse = {
  id: number;
  products: any[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};

export const getUserCart = async (
  userId: number,
): Promise<{ carts: CartResponse[] }> => {
  return api.get(`/carts/user/${userId}`);
};

export const addToCart = async (
  userId: number,
  products: { id: number; quantity: number }[],
): Promise<CartResponse> => {
  return api.post("/carts/add", {
    userId,
    products,
  });
};
