import { describe, it, expect } from "vitest";
import { handler } from "../lambda/example-handler.js";

describe("Lambda Example Handler", () => {
  it("returns expected response", async () => {
    const event = {
      body: JSON.stringify({ userId: "123" })
    };

    const result = await handler(event as any);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body.receivedUserId).toBe("123");
  });

  it("returns 500 when JSON parsing fails", async () => {
    const event = {
      body: "{ invalid-json" // <-- invalid, will throw in JSON.parse()
    };

    const result = await handler(event as any);

    expect(result.statusCode).toBe(500);

    const body = JSON.parse(result.body);
    expect(body.error).toBe("Internal server error");
  });
});
