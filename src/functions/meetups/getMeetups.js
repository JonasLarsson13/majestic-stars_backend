// Import Mongoose
import mongoose from 'mongoose'; 

// Import meetup model 
import Meetup from '../../models/meetupModel.js';

// Import response methods
import { sendResponse, sendError } from '../../responses/index.js';

export const handler = async () => {

  try {

    // Connect to MongoDB using mongoose
    await mongoose.connect(process.env.MONGO_URL);
    
    // Query meetups using model
    const meetups = await Meetup.find({}); 

    if(!meetups) {
      return sendError(404, "No meetups found"); 
    }

    return sendResponse(200, meetups);

  } catch (error) {
    console.error(error);
    return sendError(500, "Internal server error", console.error(error));
  }

}