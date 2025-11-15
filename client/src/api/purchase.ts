import { api } from "./api";

export interface PurchaseItemPayload {
  id: number;
  quantity: number;
}

export async function completePurchase(items: PurchaseItemPayload[]) {
  const res = await api.post("/purchase/complete", { items });
  return res.data as { success: boolean };
}
