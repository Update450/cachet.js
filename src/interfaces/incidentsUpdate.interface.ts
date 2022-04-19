export interface IIncidentUpdate {
  id: number;
  incident_id: number;
  status: number;
  message: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  human_status: string;
  permalink: string;
}

export interface IAddIncidentUpdateOptions {
  status: number;
  message: string;
}

export interface IUpdateIncidentUpdateOptions {
  status: number;
  message: string;
}