import api from "./axios";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export const getProducts = async (
  limit = 20,
  skip = 0,
): Promise<ProductsResponse> => {
  return api.get(`/products?limit=${limit}&skip=${skip}`);
};

export const getProductById = async (id: number): Promise<Product> => {
  return api.get(`/products/${id}`);
};

export const searchProducts = async (
  query: string,
): Promise<ProductsResponse> => {
  return api.get(`/products/search?q=${query}`);
};
