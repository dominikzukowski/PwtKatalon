export interface IPagination<T> {
    paging: IPagingInfo,
    links: ILink[],
    items: T[],
}

export interface ILink {
  href: string,
  rel: string,
  method: string,
}

export interface IPagingInfo {
  totalItems:string,
  pageNumber :string,
  pageSize :string,
  totalPages:string, 
}
