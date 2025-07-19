import IProduct from "./IProduct.model";

export interface ICartProduct {
  productId: string | IProduct;
  quantity: number;
  price?: number;
}

export default interface ICart {
  _id?: string;
  products: ICartProduct[];
  userId: string;
  createdAt: string;
  status: string;
}