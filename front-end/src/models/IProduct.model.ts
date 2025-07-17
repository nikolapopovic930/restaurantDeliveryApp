import ICategories from './ICategories.model';

export default interface IProduct {
  _id?: string;
  name: string;
  price: number;
  description: string;
  imagePath: string;
  category: ICategories | string;
}