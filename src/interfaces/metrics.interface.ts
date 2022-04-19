export interface IMetric {
  id: number;
  name: string;
  suffix: string;
  default_value: number;
  calc_type: number;
  display_chart: boolean;
  created_at: string;
  updated_at: string;
  places: number;
  default_view: number;
  threshold: number;
  order: number;
  visible: number;
  default_view_name: string;
}

export interface IAddMetricOptions {
  name: string;
  suffix: string;
  description: string;
  default_value: number;
  display_chart?: number;
}

export interface IMetricPoint {
  id: number;
  metric_id: number;
  value: number;
  created_at: string;
  updated_at: string;
  counter: number;
  calculated_value: number;
}