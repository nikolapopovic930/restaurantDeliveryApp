import ICategory from './ICategory.model';
export default interface IProduct {
  _id?: string;
  name: string;
  price: number;
  description: string;
  imagePath: string;
  category: ICategory | string;
}