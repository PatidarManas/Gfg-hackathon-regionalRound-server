import mongoose from "mongoose";

const schema = new mongoose.Schema({
  start:{
    type: Date,
    required : true
  },
  end:{
    type: Date,
    required : true
  },
  amount: {
    type: Number,
    required: true,
  },
  id:{
    type:String,
    required:true,
  },
  ticket:{
    type:String,
    required:true,
  },
});

mongoose.models = {};

export const Request = mongoose.model("Request", schema);
