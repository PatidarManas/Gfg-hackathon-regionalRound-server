import mongoose from "mongoose";

const schema = new mongoose.Schema({
  no: {
    type: Number,
    required: true,
  },
  
});

mongoose.models = {};

export const acknowledment = mongoose.model("acknowledment", schema);