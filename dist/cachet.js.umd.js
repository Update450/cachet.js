(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cross-fetch')) :
  typeof define === 'function' && define.amd ? define(['exports', 'cross-fetch'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.cachet = {}, global.fetch));
})(this, (function (exports, fetch) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);

  class Client {
      key;
      apiURL;
      headers;
      constructor(options) {
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
      async handleRequest(method, path, data) {
          const url = `${this.apiURL}${path}`;
          const options = {
              method: method,
              headers: this.headers,
              body: JSON.stringify(data),
          };
          const response = await fetch__default["default"](url, options);
          if (response.status === 200 || response.status === 204) {
              try {
                  const data = await response.json();
                  return data;
              }
              catch {
                  return undefined;
              }
          }
          else {
              throw new Error(`${response.status} ${response.statusText}`);
          }
      }
      /* basics */
      async ping() {
          const response = await this.handleRequest('GET', '/ping');
          return response;
      }
      async version() {
          const response = await this.handleRequest('GET', '/version');
          return response;
      }
      /* subscribers */
      async getSubscribers() {
          const response = await this.handleRequest('GET', '/subscribers');
          return response;
      }
      async addSubscriber(options) {
          const response = await this.handleRequest('POST', '/subscribers', options);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async deleteSubscriber(id) {
          await this.handleRequest('DELETE', `/subscribers/${id}`);
      }
      /* incidents */
      async getIncidents() {
          const response = await this.handleRequest('GET', '/incidents');
          return response;
      }
      async getIncident(id) {
          const response = await this.handleRequest('GET', `/incidents/${id}`);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async addIncident(options) {
          const response = await this.handleRequest('POST', '/incidents', options);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async updateIncident(id, options) {
          const response = await this.handleRequest('PUT', `/incidents/${id}`, options);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async deleteIncident(id) {
          await this.handleRequest('DELETE', `/incidents/${id}`);
      }
      /* incident updates */
      async getIncidentUpdates(incidentId) {
          const response = await this.handleRequest('GET', `/incidents/${incidentId}/updates`);
          return response;
      }
      async getIncidentUpdate(incidentId, updateId) {
          const response = await this.handleRequest('GET', `/incidents/${incidentId}/updates/${updateId}`);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async addIncidentUpdate(incidentId, options) {
          const response = await this.handleRequest('POST', `/incidents/${incidentId}/updates`, options);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async updateIncidentUpdate(incidentId, updateId, options) {
          const response = await this.handleRequest('PUT', `/incidents/${incidentId}/updates/${updateId}`, options);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async deleteIncidentUpdate(incidentId, updateId) {
          await this.handleRequest('DELETE', `/incidents/${incidentId}/updates/${updateId}`);
      }
      /* metrics */
      async getMetrics() {
          const response = await this.handleRequest('GET', '/metrics');
          return response;
      }
      async getMetric(id) {
          const response = await this.handleRequest('GET', `/metrics/${id}`);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async addMetric(options) {
          const response = await this.handleRequest('POST', '/metrics', options);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async deleteMetric(id) {
          await this.handleRequest('DELETE', `/metrics/${id}`);
      }
      async getMetricPoints(metricId) {
          const response = await this.handleRequest('GET', `/metrics/${metricId}/points`);
          return response;
      }
      async getMetricPoint(metricId, pointId) {
          const response = await this.handleRequest('GET', `/metrics/${metricId}/points/${pointId}`);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async addMetricPoint(metricId, value) {
          const response = await this.handleRequest('POST', `/metrics/${metricId}/points`, { value });
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async deleteMetricPoint(metricId, pointId) {
          await this.handleRequest('DELETE', `/metrics/${metricId}/points/${pointId}`);
      }
      /* components */
      async getComponents() {
          const response = await this.handleRequest('GET', '/components');
          return response;
      }
      async getComponent(id) {
          const response = await this.handleRequest('GET', `/components/${id}`);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async addComponent(options) {
          const response = await this.handleRequest('POST', '/components', options);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async updateComponent(id, options) {
          const response = await this.handleRequest('PUT', `/components/${id}`, options);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async deleteComponent(id) {
          await this.handleRequest('DELETE', `/components/${id}`);
      }
      /* components groups */
      async getComponentGroups() {
          const response = await this.handleRequest('GET', '/components/groups');
          return response;
      }
      async getComponentGroup(id) {
          const response = await this.handleRequest('GET', `/components/groups/${id}`);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async addComponentGroup(options) {
          const response = await this.handleRequest('POST', '/components/groups', options);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async updateComponentGroup(id, options) {
          const response = await this.handleRequest('PUT', `/components/groups/${id}`, options);
          if (typeof response !== 'undefined') {
              return response.data;
          }
          return undefined;
      }
      async deleteComponentGroup(id) {
          await this.handleRequest('DELETE', `/components/groups/${id}`);
      }
  }

  exports.Client = Client;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
