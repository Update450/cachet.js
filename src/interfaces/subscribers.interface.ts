export interface ISubscriber {
  id: number;
  email: string;
  verify_code: string;
  verify?: boolean;
  components?: number[];
}

export interface IAddSubscriberOptions {
  email: string;
  verify?: boolean;
  components?: number[];
}