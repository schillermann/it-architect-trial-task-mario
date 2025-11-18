import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
  loadUser,
  loadProductsFromServiceA,
  loadProductAvailability
} from "../services/data-service";

import { calculateAvailableProducts } from "../services/availability-service";
import type { IncomingCustomerRequestBody } from "../types/request";
import type { User } from "../types/user";
import type { AvailabilityForCustomer, AvailabilityProduct } from "../types/product-availability";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body: IncomingCustomerRequestBody =
      event.body ? JSON.parse(event.body) : [];

    if (!Array.isArray(body)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid input: expected an array of customer objects"
        })
      };
    }

    const products = loadProductsFromServiceA();

    // Process ALL customers
    const results = body.map((customer) => {
      const userId = customer.customerId ?? null;
      let isExistingCustomer = false;

      // Load user if ID is provided
      let user: User | null = null;
      if (typeof userId === "string" && userId.length > 0) {
        user = loadUser(userId);
        if (user) isExistingCustomer = true;
      }

      // Load availability only if we have a valid user ID
      let availabilityData: AvailabilityForCustomer | null = null;
      if (isExistingCustomer && typeof userId === "string") {
        availabilityData = loadProductAvailability(userId);
      }

      const availableProducts = calculateAvailableProducts(
        products,
        availabilityData,
        isExistingCustomer
      );

      return {
        userId,
        isExistingCustomer,
        products: availableProducts.map((product) => ({
          productId: product.productCode,
          name: product.productName,
          price: {
            bonusPercentage: product.price.bonusPercentage,
            bruttoPrice: product.price.bruttoPrice,
            netPrice: product.price.netPrice,
          },
        }))
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(results)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "internal error" })
    };
  }
};
