import Meetup from "../../models/meetupModel.js";
import connectDB from "../../services/db.js";
import { sendError, sendResponse } from "../../responses/index.js";

export const handler = async (event) => {
  try {
    await connectDB();
    const query = event.queryStringParameters.query;
    if (!query) {
      return sendError(400, "Missing 'search' parameter");
    }

    const meetups = await Meetup.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    return sendResponse(200, { meetups });
  } catch (error) {
    console.error(error);
    return sendError(500, "Internal server error", console.error(error));
  }
};
