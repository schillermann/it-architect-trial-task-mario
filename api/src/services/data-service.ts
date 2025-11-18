import fs from "fs";
import path from "path";
import type { User } from "../types/user.js";
import type { ProductsDatabase, ServiceAProduct } from "../types/products";
import type { AvailabilityForCustomer } from "../types/product-availability";

export function loadUser(userId: string): User | null {
  try {
    const filePath = path.join(__dirname, "../mockups/customers-database.json");
    const customers: User[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return customers.find((c) => c.customerId === userId) || null;
  } catch {
    console.error("Failed to load user DB.");
    return null; // DB unavailable
  }
}

export function loadProductAvailability(userId: string): AvailabilityForCustomer | null {
  try {
    
    const filePath = path.join(
      __dirname,
      `../mockups/product-availability-for-customer-${userId}.json`
    );

    const content = fs.readFileSync(filePath, "utf8");
    const data: AvailabilityForCustomer = JSON.parse(content);

    return data;
  } catch (e) {
    console.warn(`Availability service not responding for user ${userId}`);
    return null;
  }
}

export function loadProductsFromServiceA(): ServiceAProduct[] {
  try {
    const filePath = path.join(
      __dirname,
      "../mockups/products-service-a.json"
    );

    const fileContent = fs.readFileSync(filePath, "utf8");

    const data: ProductsDatabase = JSON.parse(fileContent);

    return data.products;
  } catch (err) {
    console.error("Failed to load products from Service A:", err);
    return [];
  }
}
