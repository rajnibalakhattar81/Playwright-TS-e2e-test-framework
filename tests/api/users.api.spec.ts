import { test, expect, request } from "@playwright/test";
import { log } from "../helpers/logger";

test.describe(" REST API CALLs", () => {
  const baseURL = "https://reqres.in/api";

  test("Should get list of users", async ({ request }) => {
    const baseURL = "https://reqres.in/api";
    // Make a GET call
    await log("info", `Making a GET call using ${baseURL}`);

    const res = await request.get(`${baseURL}/users`, {
      headers: {
        "x-api-key": "pro_32c902cdd6d7996232b16ea8554f8ac0bfda802a0a0471e7",
      },
    });
    // assert the response
    expect(res.status()).toBe(200);
    await log("info", `The GET call is succesfull with ${res.status()}`);
    // Get list of users
    const userData = await res.json();
    await log("info", `>> The list of Users: ==> ${JSON.stringify(userData)}`);
  });
  test("Should create a user", async ({ request }) => {
    // Make a GET call
    await log("info", `Making a POST call using ${baseURL}`);
    const payLoad = {
      name: "Alex1",
      job: "Thomas1",
      id: "126",
      createdAt: "2026-05-05T01:35:49.877Z",
    };

    const res = await request.post(`${baseURL}/users`, {
      headers: {
        "x-api-key": "pro_32c902cdd6d7996232b16ea8554f8ac0bfda802a0a0471e7",
        "Content-Type": "application/json",
      },
      data: payLoad,
    });
    // assert the response
    expect(res.status()).toBe(201);
    await log("info", `The POST call is succesfull with ${res.status()}`);
    // Get list of users
    const resData = await res.json();
    await log(
      "info",
      `>> The Created User Details : ==> ${JSON.stringify(resData)}`,
    );
  });
});
