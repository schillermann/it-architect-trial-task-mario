import { describe, it, expect, beforeAll } from "vitest";
import { handler } from "./available-products-handler.js";
import exampleBody from "../mockups/example-request-bodies.json";

let response: any[];

describe("available-products-handler (integration test)", () => {
  beforeAll(async () => {
    const event = { body: JSON.stringify(exampleBody) };

    const result = await handler(event as any);

    expect(result.statusCode).toBe(200);
    response = JSON.parse(result.body);
  });

  it("returns correct products for Customer 1 (customerId exists but not in DB)", () => {
    const expectedProducts = [
      {
        productId: "VAC-0005",
        name: "Vacuum cleaner V300, Siemens",
        price: {
          netPrice: "126,00 €",
          bruttoPrice: "149,00 €",
          bonusPercentage: 0
        },
      },
      {
        productId: "HAD-0064",
        name: "Hair dryer Grundig Z22 Sharp XION",
        price: {
          netPrice: "49,58 €",
          bruttoPrice: "59,00 €",
          bonusPercentage: 0
        }
      }
    ];

    const c1 = response[0];

    expect(c1.userId).toBe("0005465465");
    expect(c1.isExistingCustomer).toBe(false);
    expect(c1.products).toEqual(expectedProducts);
  });

  it("returns correct products for Customer 2 (customerId = null)", () => {
    const expectedProducts = [
      {
        productId: "VAC-0005",
        name: "Vacuum cleaner V300, Siemens",
        price: {
          netPrice: "126,00 €",
          bruttoPrice: "149,00 €",
          bonusPercentage: 0
        },
      },
      {
        productId: "HAD-0064",
        name: "Hair dryer Grundig Z22 Sharp XION",
        price: {
          netPrice: "49,58 €",
          bruttoPrice: "59,00 €",
          bonusPercentage: 0
        }
      }
    ];

    const c2 = response[1];

    expect(c2.userId).toBe(null);
    expect(c2.isExistingCustomer).toBe(false);
    expect(c2.products).toEqual(expectedProducts);
  });

  it("returns correct products for Customer 3 (no customerId field)", () => {
    const expectedProducts = [
      {
        productId: "VAC-0005",
        name: "Vacuum cleaner V300, Siemens",
        price: {
          netPrice: "126,00 €",
          bruttoPrice: "149,00 €",
          bonusPercentage: 0
        },
      },
      {
        productId: "HAD-0064",
        name: "Hair dryer Grundig Z22 Sharp XION",
        price: {
          netPrice: "49,58 €",
          bruttoPrice: "59,00 €",
          bonusPercentage: 0
        }
      }
    ];

    const c3 = response[2];

    expect(c3.userId).toBe(null);
    expect(c3.isExistingCustomer).toBe(false);
    expect(c3.products).toEqual(expectedProducts);
  });

  it("returns correct products for Customer 4 (customerId exists and is known)", () => {
    const expectedProducts = [
      {
        productId: "VAC-0085",
        name: "Vacuum cleaner Braun AW800",
        price: {
          bonusPercentage: 0,
          bruttoPrice: "229,00 €",
          netPrice: "192,43 €",
        },
      },
      {
        productId: "HAD-0064",
        name: "Hair dryer Grundig Z22 Sharp XION",
        price: {
          bonusPercentage: 5,
          bruttoPrice: "56,05 €",
          netPrice: "47,10 €",
        },
      },
      {
        productId: "HAD-0963",
        name: "Hair dryer Braun ComfortAirble",
        price: {
          bonusPercentage: 5,
          bruttoPrice: "56,05 €",
          netPrice: "47,10 €",
        },
      },
    ];

    const customer = response[3];

    expect(customer.userId).toBe("000000055");
    expect(customer.products).toEqual(expectedProducts);
  });
});
