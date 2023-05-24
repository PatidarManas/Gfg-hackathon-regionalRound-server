import mongoose from "mongoose";

const schema = new mongoose.Schema({
  
  from:{
    type:String,
    required:true
  },
  to: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  Interest: {
    type: Number,
    required: true,
  },
  ticket:{
    type:String,
    required:true,
  },
  status: {
    type: String,
    required: true,
  },
});

mongoose.models = {};

export const Transaction = mongoose.model("Transaction", schema);
