import { sendError, sendResponse } from "../../responses/index.js";
import connectDB from "../../services/db.js";
import Meetup from "../../models/meetupModel.js";

exports.handler = async (event) => {
  try {
    await connectDB();

    const requestData = JSON.parse(event.body);
    const newMeetup = new Meetup(requestData);

    const result = await newMeetup.save();
    if (!result) return sendError(500, "something went wrong!");

    return sendResponse(200, { success: true });
  } catch (error) {
    return sendError(500, "something went wrong!");
  }
};
