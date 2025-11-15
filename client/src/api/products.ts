import { api } from "./api";
import type { Product } from "../types";

export async function fetchProducts(): Promise<Product[]> {
  const res = await api.get<Product[]>("/products");
  return res.data;
}
