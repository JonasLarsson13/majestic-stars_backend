import { middyfy } from "@/services/middify";
import Meetup from "../../models/meetupModel.js";
import { sendResponse, sendError } from "../../responses/index.js";
import { checkPermission } from "../../middleware/permission.js";

const attendDeclineMeetup = async (event) => {
  const { meetupId } = event.pathParameters;
  try {
    const meetup = await Meetup.findById(meetupId);
    if (!meetup) {
      return sendResponse(404, { message: "Meetup not found" });
    }
    const userIndex = meetup.participants.findIndex(
      (participant) => participant === event.user._id.toString()
    );

    if (userIndex !== -1) {
      meetup.participants.splice(userIndex, 1);
    } else {
      meetup.participants.push(event.user._id.toString());
    }

    await meetup.save();

    return sendResponse(200, { success: true });
  } catch (error) {
    console.error(error);
    return sendError(500, "Internal server error");
  }
};

export const handler = middyfy(attendDeclineMeetup).use(checkPermission);
