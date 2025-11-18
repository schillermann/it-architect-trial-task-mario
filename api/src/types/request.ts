export interface IncomingCustomerRequest {
  customerId: string | null;
  isBusinessCustomer?: boolean;
}

export type IncomingCustomerRequestBody = IncomingCustomerRequest[];
