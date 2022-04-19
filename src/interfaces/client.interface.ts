export interface ICachetClientOptions {
  url: string;
  key: string;
}

export interface ICachetMeta {
  pagination: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: {
      next: string;
      previous: string;
    };
  }
}

export interface ICachetResponse<T> {
  readonly meta: ICachetMeta;
  data: T;
}