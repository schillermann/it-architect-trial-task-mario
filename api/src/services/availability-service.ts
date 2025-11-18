import type { AvailabilityForCustomer } from "../types/product-availability.js";
import type {
  ServiceAProduct,
  AvailableProductResult,
  ProductPrice,
} from "../types/products.js";

export function calculateAvailableProducts(
  products: ServiceAProduct[],
  availabilityData: AvailabilityForCustomer | null,
  isExistingCustomer: boolean
): AvailableProductResult[] {
  if (isExistingCustomer && availabilityData) {
    const flatProductCodes: string[] = availabilityData.availableProducts.map(product => product.productCode);

    return products
      .map((product) => {
        const price = getCustomerPrice(product.prices);
        if (!price) {
          return null;
        }

        return {
          productName: product.productName,
          productCode: product.productCode,
          generallyAvailable: product.generallyAvailable,
          price: price
        };
      })
      .filter((product): product is AvailableProductResult =>
        product !== null && flatProductCodes.includes(product.productCode)
      );
  }

  return products
    .map((product) => {
      const price = (isExistingCustomer) ? getCustomerPrice(product.prices) : getNonCustomerPrice(product.prices)
      if (!price) {
        return null
      }

      return {
        productCode: product.productCode,
        productName: product.productName,
        generallyAvailable: product.generallyAvailable,
        price: price
      };
    }
    )
    .filter((product): product is AvailableProductResult => product !== null && product.generallyAvailable);
}

function getCustomerPrice(prices: ProductPrice | ProductPrice[]): ProductPrice | undefined {
  if (!Array.isArray(prices)) {
    return prices;
  }

  const existingCustomerPrice = prices.find(
    (price) => price.isExistingCustomer === true
  );

  if (existingCustomerPrice) {
    return existingCustomerPrice;
  }

  const fallbackPrice = prices.find(
    (price) => price.isExistingCustomer === false
  );

  return fallbackPrice;
}

function getNonCustomerPrice(prices: ProductPrice | ProductPrice[]): ProductPrice | undefined {
  if (!Array.isArray(prices)) {
    return prices;
  }

  const existingNonCustomerPrice = prices.find(
    (price) => price.isExistingCustomer === false
  );

  if (existingNonCustomerPrice) {
    return existingNonCustomerPrice;
  }
  return undefined
}