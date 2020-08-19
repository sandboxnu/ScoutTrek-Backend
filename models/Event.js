import mongoose from "mongoose";

export const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export const messageUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const messageSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: messageUserSchema,
});

const eventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    troop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Troop",
      required: true,
    },
    patrol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patrol",
      required: "true",
    },
    title: {
      type: String,
      required: [true, "An event cannot have a blank title."],
    },
    description: String,
    datetime: Date,
    meetTime: Date,
    leaveTime: Date,
    endTime: Date,
    pickupTime: Date,
    location: pointSchema,
    meetLocation: pointSchema,
    messages: [messageSchema],

    startDatetime: Date,
    endDatetime: Date,
    recurring: Boolean,
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    checkoutTime: Date,
    numDays: Number,
    distance: Number,
    shakedown: Boolean,
    published: Boolean,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notification: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

eventSchema.virtual("time").get(function () {
  let date = new Date(this.datetime);
  const formattedDate =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return formattedDate;
});

eventSchema.virtual("date").get(function () {
  let date = new Date(this.datetime);
  const monthNames = [
    "Jan.",
    "Feb.",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  const formattedDate =
    monthNames[date.getMonth()] +
    " " +
    date.getDay() +
    ", " +
    date.getFullYear();
  return formattedDate;
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
