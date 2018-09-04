import { Filter } from './filter';

export class Category {
  public id: string;
  public name: string;
  public timestamp: string;
  public filters: Filter[] = [];
  public routeFriendlyName: string;
}
