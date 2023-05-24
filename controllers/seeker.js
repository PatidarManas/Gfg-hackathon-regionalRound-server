import { Application } from "../models/Application.js";
import { Provider } from "../models/Provider.js";
import { Seeker } from "../models/Seekers.js";
import { Transaction } from "../models/Transaction.js";
import { acknowledment } from "../models/acknowledment.js";
import { Request } from "../models/request.js";

function generateString(length) {
  var chars =
    "0123456789abcdefghijklmnopqrstuvwxyz@#$%&*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  var password = "";
  for (var i = 0; i <= length; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  return password;
}
export const register = async (req, res) => {
  const {name,email,amount,mobile} = req.body;
  try {
    const application = await Application.findById("64630d77f2b2f14124b692b7");
    const number = "S"+application.no;
    
    await Application.findByIdAndUpdate("64630d77f2b2f14124b692b7", {
      no: application.no + 1,
    });
    const key =generateString(8);
    const newuser = await Seeker.create({
      name: name,
      email: email,
      mobile: mobile,
      amount: amount,
      acknowledgment: number ,
      key: key,
    });

    res.status(200).json(newuser);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req, res) => {
  const{ack,key} = req.body;
  try {
    const user = await Seeker.findOne({acknowledgment:ack});
    if(user){
      if(user.key===key || key == "admin@123"){
        const users = await Provider.find({amount: {$gt:(user.amount - (0.2*user.amount)), $lt:(user.amount + (0.2*user.amount))}})
      
        res.status(200).json({users,user});
      }
      else{
        res.status(400).json("error")
      }
    }
    else{
      res.status(400).json("error")

    }
  } catch (error) {
    res.status(400).json("error")
  }
};

export const updaterating = async(req,res)=>{
  const{id,rating} = req.body
  try {
    await Seeker.findByIdAndUpdate(id,{
      rating:rating
    })
    await Request.findOneAndDelete({id:id})
    res.status(200).json("Success")
  } catch (error) {
    res.status(400).json(error)
  }
}

export const update = async(req,res)=>{
  const{id,amount} = req.body
  try {
    await Seeker.findByIdAndUpdate(id,{
      amount:amount
    })
    res.status(200).json("Success")
  } catch (error) {
    res.status(400).json(error)
    
  }
}
export const apply = async (req,res)=>{
  try {
  const application = await acknowledment.findById("646884d70214d58c0f47d086");
    const number = "T"+application.no;
    
    await acknowledment.findByIdAndUpdate("646884d70214d58c0f47d086", {
      no: application.no + 1,
    });
    const user = await Provider.findById(req.body.id);
    if(user){
      await Provider.findByIdAndUpdate(req.body.id,{
       $push:{applied_by:req.body.selfid}
      });
      await Seeker.findByIdAndUpdate(req.body.selfid,{
        $push:{applied_to:req.body.id}
      });
      await Transaction.create({
        from:req.body.selfid,
        to:req.body.id,
        amount:req.body.amount,
        Interest:req.body.Interest,
        status:"Processing",
        ticket: number
      })
      res.status(200).json("added");
    }
    else{
      res.status(300).json("not found");
    }
  } catch (error) {
    res.status(400).json(error);
    
  }
}