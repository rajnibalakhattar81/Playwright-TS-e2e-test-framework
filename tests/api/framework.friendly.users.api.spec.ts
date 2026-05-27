import { test, expect, request } from "@playwright/test";
import { log } from "../helpers/logger";
import constants from '../../data/constants.json'
import APITestData from "../../data/api/reqres-test-data";
import fileHelper from "../helpers/file-helper";


const envConfig=undefined;

test.describe(" REST API CALLs", () => {

  test("Should get list of users", async ({ request }, testInfo) => {

    let  envConfig = testInfo.project.use as any;

    // Make a GET call
    await log("info", `Making a GET call using ${envConfig.apiURL}`);

    const res = await request.get(`${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.GET_USERS_LIST}`, {
      headers: {
        "x-api-key": process.env.REQ_RES_API_KEY,
      },
    });
    // assert the response
    expect(res.status()).toBe(200);
    await log("info", `The GET call is succesfull with ${res.status()}`);
    // Get list of users
    const userData = await res.json();
    await log("info", `>> The list of Users: ==> ${JSON.stringify(userData)}`);
    fileHelper.writeFile(`${process.cwd()}/data/api/list-of-users`,`${JSON.stringify(userData, undefined, 4)}`)

  });

  test("Should create a user", async ({ request },testInfo) => {

    let  envConfig = testInfo.project.use as any;

    // Make a GET call
    await log("info", `Making a POST call using ${envConfig.apiURL}`);
    const payLoad = APITestData.createUserApiTestData();
    const res = await request.post(`${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.POST_USER}`, {
      headers: {
        "x-api-key": process.env.REQ_RES_API_KEY,
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
