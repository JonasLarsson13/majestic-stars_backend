import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

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
    capacity: {
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
    category: {
      type: Array,
      default: [],
    },
    comments: [CommentSchema],
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
