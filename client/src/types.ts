export interface User {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Product {
  id: number;
  description: string;
  price: number;
  quantityStock: number;
  image: string;
  url: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}
