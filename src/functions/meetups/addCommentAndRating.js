import Meetup from "../../models/meetupModel.js";
import connectDB from "../../services/db.js";
import { sendError, sendResponse } from "../../responses/index.js";

export const handler = async (event) => {
  try {
    await connectDB();

    const meetupId = event.pathParameters.meetupId;

    const requestBody = JSON.parse(event.body);
    const { comment, rating } = requestBody;
    if (!comment) {
      return sendError(400, "Comment is required");
    }

    const meetup = await Meetup.findById(meetupId);
    if (!meetup) {
      return sendError(404, "Meetup not found");
    }

    const newComment = {
      comment,
      username: "Anonymous", // You can set a default or retrieve a username from the user's authentication
      timestamp: new Date(),
    };

    meetup.comments.push(newComment);

    if (rating !== undefined) {
      meetup.ratings.push(rating);
    }

    await meetup.save();

    return sendResponse(200, { success: true });
  } catch (error) {
    console.error(error);
    return sendError(500, "Internal server error", error);
  }
};
