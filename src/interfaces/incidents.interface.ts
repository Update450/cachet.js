export interface IIncident {
  id: number;
  component_id: number;
  name: string;
  status: number;
  message: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  occured_at: string;
  visible: number;
  stickied: boolean;
  notifiactions: boolean;
  is_resolved: boolean;
  meta: [];
  updates: [];
  human_status: string;
  latest_update_id: number;
  latest_status: number;
  latest_human_status: string;
  latest_icon: string;
  permalink: string;
  duration: number;
}

export interface IAddIncidentOptions {
  name: string;
  message: string;
  status: number;
  visible: number;
  component_id?: number;
  component_status?: number;
  notify?: boolean;
  created_at?: Date;
  template?: string;
  vars?: string[];
}

export interface IUpdateIncidentOptions {
  name?: string;
  message?: string;
  status?: number;
  visible?: number;
  component_status?: number;
  component_id?: number;
  notify?: boolean;
}
