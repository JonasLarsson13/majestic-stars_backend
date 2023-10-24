import { sendError, sendResponse } from "../../responses/index.js";
import { initialize } from "../../services/db.js";
let client;

exports.handler = async (event) => {
  try {
    const collection = await initialize(client, "meetups");

    const requestData = JSON.parse(event.body);

    const result = await collection.insertOne(requestData);

    if (!result.insertedId) return sendError(500, "something went wrong!");

    return sendResponse(200, { success: true });
  } catch (error) {
    return sendError(500, "something went wrong!");
  }
};
