import { Address } from './address';
import { CartItem } from './cart-item';

export class User {
  public uid: string;
  public email: string;
  public fullName: string;
  public addresses: Address[] = [];
  public cart: CartItem[] = [];
  public wishList: CartItem[] = [];
}
