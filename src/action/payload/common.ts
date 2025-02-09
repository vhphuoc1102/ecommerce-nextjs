export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
export interface PageRequest {
  page: number;
  limit: number;
  sort?: SortOrder;
  sortBy?: string;
}
