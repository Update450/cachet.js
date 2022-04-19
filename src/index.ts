import fetch from 'cross-fetch';
import { ICachetClientOptions, ICachetResponse } from './interfaces/client.interface';
import { IAddComponentGroupOptions, IComponentGroup, IUpdateComponentGroupOptions } from './interfaces/componentGroups.interface';
import { IAddComponentOptions, IComponent, IUpdateComponentOptions } from './interfaces/components.interface';
import { IAddIncidentOptions, IIncident, IUpdateIncidentOptions } from './interfaces/incidents.interface';
import { IAddIncidentUpdateOptions, IIncidentUpdate, IUpdateIncidentUpdateOptions } from './interfaces/incidentsUpdate.interface';
import { IAddMetricOptions, IMetric, IMetricPoint } from './interfaces/metrics.interface';
import { IAddSubscriberOptions, ISubscriber } from './interfaces/subscribers.interface';

export class Client {
  public key: string;
  private apiURL: string;
  private headers: any;

  constructor(options: ICachetClientOptions) {
    this.key = options.key;

    if (options.url.endsWith('/')) {
      options.url = options.url.slice(0, -1);
    }

    this.apiURL = `${options.url}/api/v1`;
    this.headers = {
      'Content-Type': 'application/json',
      'X-Cachet-Token': this.key,
    };
  }

  private async handleRequest(method: string, path: string, data?: any): Promise<ICachetResponse<any> | undefined> {
    const url = `${this.apiURL}${path}`;
    const options: any = {
      method: method,
      headers: this.headers,
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);

    if (response.status === 200 || response.status === 204) {
      try {
        const data = await response.json();
        return data;
      } catch {
        return undefined;
      }
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  }

  /* basics */
  public async ping() {
    const response = await this.handleRequest('GET', '/ping');
    return response;
  }

  public async version() {
    const response = await this.handleRequest('GET', '/version');
    return response;
  }

  /* subscribers */
  public async getSubscribers(): Promise<ICachetResponse<[ISubscriber]> | undefined> {
    const response = await this.handleRequest('GET', '/subscribers');
    return response;
  }

  public async addSubscriber(options: IAddSubscriberOptions): Promise<ISubscriber | undefined> {
    const response = await this.handleRequest('POST', '/subscribers', options);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async deleteSubscriber(id: number): Promise<void> {
    await this.handleRequest('DELETE', `/subscribers/${id}`);
  }

  /* incidents */
  public async getIncidents(): Promise<ICachetResponse<[IIncident]> | undefined> {
    const response = await this.handleRequest('GET', '/incidents');
    return response;
  }

  public async getIncident(id: number): Promise<IIncident | undefined> {
    const response = await this.handleRequest('GET', `/incidents/${id}`);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async addIncident(options: IAddIncidentOptions): Promise<IIncident | undefined> {
    const response = await this.handleRequest('POST', '/incidents', options);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async updateIncident(id: number, options: IUpdateIncidentOptions): Promise<IIncident | undefined> {
    const response = await this.handleRequest('PUT', `/incidents/${id}`, options);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async deleteIncident(id: number): Promise<void> {
    await this.handleRequest('DELETE', `/incidents/${id}`);
  }

  /* incident updates */
  public async getIncidentUpdates(incidentId: number): Promise<ICachetResponse<[IIncidentUpdate]> | undefined> {
    const response = await this.handleRequest('GET', `/incidents/${incidentId}/updates`);
    return response;
  }

  public async getIncidentUpdate(incidentId: number, updateId: number): Promise<IIncidentUpdate | undefined> {
    const response = await this.handleRequest('GET', `/incidents/${incidentId}/updates/${updateId}`);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async addIncidentUpdate(incidentId: number, options: IAddIncidentUpdateOptions): Promise<IIncidentUpdate | undefined> {
    const response = await this.handleRequest('POST', `/incidents/${incidentId}/updates`, options);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async updateIncidentUpdate(incidentId: number, updateId: number, options: IUpdateIncidentUpdateOptions): Promise<IIncidentUpdate | undefined> {
    const response = await this.handleRequest('PUT', `/incidents/${incidentId}/updates/${updateId}`, options);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async deleteIncidentUpdate(incidentId: number, updateId: number): Promise<void> {
    await this.handleRequest('DELETE', `/incidents/${incidentId}/updates/${updateId}`);
  }

  /* metrics */
  public async getMetrics(): Promise<ICachetResponse<[IMetric]> | undefined> {
    const response = await this.handleRequest('GET', '/metrics');
    return response;
  }

  public async getMetric(id: number): Promise<IMetric | undefined> {
    const response = await this.handleRequest('GET', `/metrics/${id}`);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async addMetric(options: IAddMetricOptions): Promise<IMetric | undefined> {
    const response = await this.handleRequest('POST', '/metrics', options);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async deleteMetric(id: number): Promise<void> {
    await this.handleRequest('DELETE', `/metrics/${id}`);
  }

  public async getMetricPoints(metricId: number): Promise<ICachetResponse<[IMetricPoint]> | undefined> {
    const response = await this.handleRequest('GET', `/metrics/${metricId}/points`);
    return response;
  }

  public async getMetricPoint(metricId: number, pointId: number): Promise<IMetricPoint | undefined> {
    const response = await this.handleRequest('GET', `/metrics/${metricId}/points/${pointId}`);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async addMetricPoint(metricId: number, value: number): Promise<IMetricPoint | undefined> {
    const response = await this.handleRequest('POST', `/metrics/${metricId}/points`, { value });

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async deleteMetricPoint(metricId: number, pointId: number): Promise<void> {
    await this.handleRequest('DELETE', `/metrics/${metricId}/points/${pointId}`);
  }

  /* components */
  public async getComponents(): Promise<ICachetResponse<[IComponent]> | undefined> {
    const response = await this.handleRequest('GET', '/components');
    return response;
  }

  public async getComponent(id: number): Promise<IComponent | undefined> {
    const response = await this.handleRequest('GET', `/components/${id}`);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async addComponent(options: IAddComponentOptions): Promise<IComponent | undefined> {
    const response = await this.handleRequest('POST', '/components', options);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async updateComponent(id: number, options: IUpdateComponentOptions): Promise<IComponent | undefined> {
    const response = await this.handleRequest('PUT', `/components/${id}`, options);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async deleteComponent(id: number): Promise<void> {
    await this.handleRequest('DELETE', `/components/${id}`);
  }

  /* components groups */
  public async getComponentGroups(): Promise<ICachetResponse<[IComponentGroup]> | undefined> {
    const response = await this.handleRequest('GET', '/components/groups');
    return response;
  }

  public async getComponentGroup(id: number): Promise<IComponentGroup | undefined> {
    const response = await this.handleRequest('GET', `/components/groups/${id}`);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async addComponentGroup(options: IAddComponentGroupOptions): Promise<IComponentGroup | undefined> {
    const response = await this.handleRequest('POST', '/components/groups', options);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async updateComponentGroup(id: number, options: IUpdateComponentGroupOptions): Promise<IComponentGroup | undefined> {
    const response = await this.handleRequest('PUT', `/components/groups/${id}`, options);

    if (typeof response !== 'undefined') {
      return response.data;
    }

    return undefined;
  }

  public async deleteComponentGroup(id: number): Promise<void> {
    await this.handleRequest('DELETE', `/components/groups/${id}`);
  }
}
