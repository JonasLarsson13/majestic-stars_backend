import { middyfy } from "@/services/middify";
import Meetup from "../../models/meetupModel.js";
import { sendError, sendResponse } from "../../responses/index.js";
import { checkPermission } from "../../middleware/permission.js";

const addCommentAndRating = async (event) => {
  const { comment, rating } = event.body;
  try {
    const meetupId = event.pathParameters.meetupId;

    if (!comment) {
      return sendError(400, "Comment is required");
    }

    const meetup = await Meetup.findById(meetupId);
    if (!meetup) {
      return sendError(404, "Meetup not found");
    }

    const newComment = {
      comment,
      email: event.user.email,
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

export const handler = middyfy(addCommentAndRating).use(checkPermission);
