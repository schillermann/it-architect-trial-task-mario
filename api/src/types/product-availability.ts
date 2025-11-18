export interface AvailabilityProduct {
  productCode: string;
}

export interface AvailabilityForCustomer {
  availableProducts: AvailabilityProduct[];
}
