import connectDB from "../../services/db.js";
import Meetup from "../../models/meetupModel.js";
import { sendResponse, sendError } from "../../responses/index.js";

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDB();

    const { fromDate, toDate, city, category } = event.queryStringParameters;

    console.log("Query Parameters:", { fromDate, toDate, city, category });

    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      return sendError(400, { message: "Invalid date range" });
    }

    const filters = {};

    const toDateObj = new Date(toDate);
    toDateObj.setDate(toDateObj.getDate() + 1);
    if (fromDate && toDate) {
      filters.$or = [
        { startDate: { $gte: new Date(fromDate), $lte: toDateObj } },
        { endDate: { $gte: new Date(fromDate), $lte: toDateObj } },
      ];
    }

    if (city) {
      filters.city = city;
    }

    if (category) {
      filters.category = category;
    }

    const filteredMeetups = await Meetup.find(filters);

    if (filteredMeetups.length === 0) {
      return sendResponse(200, { message: "No meetups found" });
    }

    return sendResponse(200, filteredMeetups);
  } catch (error) {
    console.error("Error:", error);
    return sendError(500, { message: "Internal server error" });
  }
};
