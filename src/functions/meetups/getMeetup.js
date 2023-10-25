/* import { ObjectId } from "mongodb";
import { sendError, sendResponse } from "../../responses/index.js";
import { initialize } from "../../services/db.js";
let client; */

exports.handler = async (event) => {
  /* try {
    const collection = await initialize(client, "meetups");

    const { id } = event.pathParameters;
    if (!id) return sendError(400, "No id provided!");

    const objectId = new ObjectId(id);
    const result = await collection.findOne({ _id: objectId });
    if (!result) return sendError(404, "No meetup found!");

    return sendResponse(200, result);
  } catch (error) {
    return sendError(500, "something went wrong!");
  } */
};
