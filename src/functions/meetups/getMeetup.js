import Meetup from "../../models/meetupModel.js";
import { sendResponse, sendError } from "../../responses/index.js";
import connectDB from "../../services/db.js";

export const handler = async (event) => {
  const { meetupId } = event.pathParameters;

  try {
    await connectDB();
    const meetup = await Meetup.findById(meetupId);
    if (!meetup) {
      return sendResponse(404, { message: "Meetup not found" });
    }

    return sendResponse(200, meetup);
  } catch (error) {
    console.error(error);
    return sendError(500, "Internal server error");
  }
};
