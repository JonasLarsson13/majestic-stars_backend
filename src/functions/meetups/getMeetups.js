import Meetup from "../../models/meetupModel.js";
import { sendResponse, sendError } from "../../responses/index.js";
import connectDB from "../../services/db.js";

export const handler = async () => {
  try {
    await connectDB();
    const meetups = await Meetup.find({})
      .select(
        "_id title description city participants capacity startDate image category endDate"
      )
      .sort({ endDate: 1 });

    if (!meetups) {
      return sendError(404, "No meetups found");
    }

    return sendResponse(200, meetups);
  } catch (error) {
    console.error(error);
    return sendError(500, "Internal server error", console.error(error));
  }
};
