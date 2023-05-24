import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  rating:{
    type:Number,
    default:0
  },
  amount: {
    type: Number,
    required: true,
  },
  acknowledgment: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  applied_to: [],
  accepted_by: [],
  Rejected_by:[],
});

mongoose.models = {};

export const Seeker = mongoose.model("Seeker", schema);
