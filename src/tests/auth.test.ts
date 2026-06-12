import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test("returns null when authorization header is missing", () => {
    expect(getAPIKey({})).toBeNull();
  });

  test("returns null when authorization scheme is not ApiKey", () => {
    expect(getAPIKey({ authorization: "Bearer some-token" })).toBeNull();
  });

  test("returns null when authorization header has no key", () => {
    expect(getAPIKey({ authorization: "ApiKey" })).toBeNull();
  });

  test("returns empty string when authorization header has no key after scheme", () => {
    expect(getAPIKey({ authorization: "ApiKey " })).toBe("");
  });

  test("returns the api key when authorization header is valid", () => {
    expect(getAPIKey({ authorization: "ApiKey my-secret-key" })).toBe(
      "my-secret-key",
    );
  });
});
