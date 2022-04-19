import { IComponent } from "./components.interface";

export interface IComponentGroup {
  id: number;
  name: string;
  enabled_components: IComponent[];
  enabled_components_lowest: IComponent[];
  created_at: string;
  updated_at: string;
  order: number;
  collapsed: number;
  visible: number;
  lowest_human_status: string;
}

export interface IAddComponentGroupOptions {
  name: string;
  order?: number;
  collapsed?: number;
}

export interface IUpdateComponentGroupOptions {
  name?: string;
  order?: number;
  collapsed?: number;
}