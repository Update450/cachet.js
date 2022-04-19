interface ICachetClientOptions {
    url: string;
    key: string;
}
interface ICachetMeta {
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
    };
}
interface ICachetResponse<T> {
    readonly meta: ICachetMeta;
    data: T;
}

interface IComponent {
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
interface IAddComponentOptions {
    name: string;
    status: number;
    description?: string;
    link?: string;
    order?: number;
    group_id?: number;
    enabled?: boolean;
}
interface IUpdateComponentOptions {
    name?: string;
    status?: number;
    description?: string;
    link?: string;
    order?: number;
    group_id?: number;
    enabled?: boolean;
}

interface IComponentGroup {
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
interface IAddComponentGroupOptions {
    name: string;
    order?: number;
    collapsed?: number;
}
interface IUpdateComponentGroupOptions {
    name?: string;
    order?: number;
    collapsed?: number;
}

interface IIncident {
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
interface IAddIncidentOptions {
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
interface IUpdateIncidentOptions {
    name?: string;
    message?: string;
    status?: number;
    visible?: number;
    component_status?: number;
    component_id?: number;
    notify?: boolean;
}

interface IIncidentUpdate {
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
interface IAddIncidentUpdateOptions {
    status: number;
    message: string;
}
interface IUpdateIncidentUpdateOptions {
    status: number;
    message: string;
}

interface IMetric {
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
interface IAddMetricOptions {
    name: string;
    suffix: string;
    description: string;
    default_value: number;
    display_chart?: number;
}
interface IMetricPoint {
    id: number;
    metric_id: number;
    value: number;
    created_at: string;
    updated_at: string;
    counter: number;
    calculated_value: number;
}

interface ISubscriber {
    id: number;
    email: string;
    verify_code: string;
    verify?: boolean;
    components?: number[];
}
interface IAddSubscriberOptions {
    email: string;
    verify?: boolean;
    components?: number[];
}

declare class Client {
    key: string;
    private apiURL;
    private headers;
    constructor(options: ICachetClientOptions);
    private handleRequest;
    ping(): Promise<ICachetResponse<any> | undefined>;
    version(): Promise<ICachetResponse<any> | undefined>;
    getSubscribers(): Promise<ICachetResponse<[ISubscriber]> | undefined>;
    addSubscriber(options: IAddSubscriberOptions): Promise<ISubscriber | undefined>;
    deleteSubscriber(id: number): Promise<void>;
    getIncidents(): Promise<ICachetResponse<[IIncident]> | undefined>;
    getIncident(id: number): Promise<IIncident | undefined>;
    addIncident(options: IAddIncidentOptions): Promise<IIncident | undefined>;
    updateIncident(id: number, options: IUpdateIncidentOptions): Promise<IIncident | undefined>;
    deleteIncident(id: number): Promise<void>;
    getIncidentUpdates(incidentId: number): Promise<ICachetResponse<[IIncidentUpdate]> | undefined>;
    getIncidentUpdate(incidentId: number, updateId: number): Promise<IIncidentUpdate | undefined>;
    addIncidentUpdate(incidentId: number, options: IAddIncidentUpdateOptions): Promise<IIncidentUpdate | undefined>;
    updateIncidentUpdate(incidentId: number, updateId: number, options: IUpdateIncidentUpdateOptions): Promise<IIncidentUpdate | undefined>;
    deleteIncidentUpdate(incidentId: number, updateId: number): Promise<void>;
    getMetrics(): Promise<ICachetResponse<[IMetric]> | undefined>;
    getMetric(id: number): Promise<IMetric | undefined>;
    addMetric(options: IAddMetricOptions): Promise<IMetric | undefined>;
    deleteMetric(id: number): Promise<void>;
    getMetricPoints(metricId: number): Promise<ICachetResponse<[IMetricPoint]> | undefined>;
    getMetricPoint(metricId: number, pointId: number): Promise<IMetricPoint | undefined>;
    addMetricPoint(metricId: number, value: number): Promise<IMetricPoint | undefined>;
    deleteMetricPoint(metricId: number, pointId: number): Promise<void>;
    getComponents(): Promise<ICachetResponse<[IComponent]> | undefined>;
    getComponent(id: number): Promise<IComponent | undefined>;
    addComponent(options: IAddComponentOptions): Promise<IComponent | undefined>;
    updateComponent(id: number, options: IUpdateComponentOptions): Promise<IComponent | undefined>;
    deleteComponent(id: number): Promise<void>;
    getComponentGroups(): Promise<ICachetResponse<[IComponentGroup]> | undefined>;
    getComponentGroup(id: number): Promise<IComponentGroup | undefined>;
    addComponentGroup(options: IAddComponentGroupOptions): Promise<IComponentGroup | undefined>;
    updateComponentGroup(id: number, options: IUpdateComponentGroupOptions): Promise<IComponentGroup | undefined>;
    deleteComponentGroup(id: number): Promise<void>;
}

export { Client };
