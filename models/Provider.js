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
  amount: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  interest_rate:{
    type: String,
    required:true
  },
  acknowledgment: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  discription:{
    type: String,
    required:true,
  },
  applied_by:[],
  accepted_of: [],
});

mongoose.models = {};

export const Provider = mongoose.model("Provider", schema);