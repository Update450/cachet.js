export interface IComponent {
  id: number;
  name: string;
  description: string;
  link: string;
  status: number;
  order: number;
  group_id?: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  enabled: boolean;
  meta: [];
  status_name: string;
  tags: string[];
}

export interface IAddComponentOptions {
  name: string;
  status: number;
  description?: string;
  link?: string;
  order?: number;
  group_id?: number;
  enabled?: boolean;
}

export interface IUpdateComponentOptions {
  name?: string;
  status?: number;
  description?: string;
  link?: string;
  order?: number;
  group_id?: number;
  enabled?: boolean;
}