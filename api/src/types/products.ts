export interface ProductPrice {
  isExistingCustomer: boolean;
  netPrice: string;      // e.g. "126,00 €"
  bruttoPrice: string;   // e.g. "149,00 €"
  bonusPercentage: number;
}

export interface ServiceAProduct {
  productCode: string;
  productCategoryCode: string;
  productName: string;
  generallyAvailable: boolean;
  prices: ProductPrice[] | ProductPrice;
}

export interface AvailabilityEntry {
  productId: string;
  available: boolean;
  price?: number;
}

export interface AvailabilityData {
  customerId: string;
  products: AvailabilityEntry[];
  error?: boolean;
}

export interface AvailableProductResult {
  productId: string;
  productName: string;
  productCode: string;
  generallyAvailable: boolean;
  price: ProductPrice;
}