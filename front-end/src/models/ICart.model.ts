export interface ICartProduct {
  productId: string;
  quantity: number;
}

export default interface ICart {
  _id?: string;
  products: ICartProduct[];
  userId: string;
  createdAt: string;
  status: string;
}