import mongoose from "mongoose";

const schema = new mongoose.Schema({
  no: {
    type: Number,
    required: true,
  },
  
});

mongoose.models = {};

export const Application = mongoose.model("Application", schema);