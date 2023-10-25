import mongoose from "mongoose";

const MeetupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    location: {
      type: String,
    },
    participants: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
    },
    tags: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    ratings: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Meetup = mongoose.model("Meetup", MeetupSchema);

export default Meetup;
