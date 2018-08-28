import { Filter } from './filter';

export class Category {
  public id: string;
  public name: string;
  public timeStamp: string;
  public filters: Filter[] = [];
}
