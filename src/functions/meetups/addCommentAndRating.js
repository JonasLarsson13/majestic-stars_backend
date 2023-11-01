import { middyfy } from "@/services/middify";
import Meetup from "../../models/meetupModel.js";
import { sendError, sendResponse } from "../../responses/index.js";
import { checkPermission } from "../../middleware/permission.js";

const addCommentAndRating = async (event) => {
  try {
    const meetupId = event.pathParameters.meetupId;
    const requestData = event.body;

    if (!requestData.comment) {
      return sendError(400, "Comment is required");
    }

    const meetup = await Meetup.findById(meetupId);
    if (!meetup) {
      return sendError(404, "Meetup not found");
    }

    const newComment = {
      comment: requestData.comment,
      email: event.user.email,
      timestamp: new Date(),
      rating: requestData.rating || 1,
    };

    meetup.comments.push(newComment);

    if (requestData.rating !== undefined) {
      meetup.ratings.push(requestData.rating);
    }

    await meetup.save();

    return sendResponse(200, { success: true });
  } catch (error) {
    console.error(error);
    return sendError(500, "Internal server error", error);
  }
};

export const handler = middyfy(addCommentAndRating).use(checkPermission);
