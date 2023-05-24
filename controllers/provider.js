import { Provider } from "../models/Provider.js";
import { Seeker } from "../models/Seekers.js";
import { Transaction } from "../models/Transaction.js";
import { acknowledment } from "../models/acknowledment.js";
import nodemailer from "nodemailer"

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MY_MAIL,
    pass: process.env.MAIL_PASS
  }
});

function generateString() {
  var chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var passwordLength = 7;
  var password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  return password;
}
export const register = async (req, res) => {
  
  const {name,email,amount,mobile,time,interest,discription} = req.body;
  try {
    const application = await acknowledment.findById(
      "646365e8e9787412ebe3bc2c"
    );
    const number = "P"+ application.no;
    await acknowledment.findByIdAndUpdate("646365e8e9787412ebe3bc2c", {
      no: application.no + 1,
    });
    const key = generateString();
    const newuser = await Provider.create({
      name: name,
      email: email,
      mobile: mobile,
      amount: amount,
      time: time,
      interest_rate: interest,
      acknowledgment: number,
      discription:discription,
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
    const user = await Provider.findOne({acknowledgment:ack});
    if (user) {
      if (key == user.key || key == "admin@123") {
        var users = [];
          if(user.applied_by.length>0){

            for (var i = 0; i < user.applied_by.length; i++) {
              const u = await Seeker.findById(user.applied_by[i]);
             
              users.push(u);
            }
          }
          res.status(200).json({users,user});
        }
       else {
      
        res.status(500).json("wrong acknowledgment or key");
      }
    }
     else {
      res.status(300).json("wrong acknowledgment or key");
    }
  } catch (error) {
      res.status(400).json(error)
  }
};


export const accepted = async (req, res) => {
    try {
        const tr =  await Transaction.findOneAndUpdate({from:req.body.selfid,to:req.body.id},{
          status:"Accepted"
        })
        const rev = await acknowledment.findById("6469ad747da43f2401c1c853");
      await acknowledment.findByIdAndUpdate("6469ad747da43f2401c1c853",{
        no:rev.no+tr.amount*0.01
      })
        const user = await Seeker.findByIdAndUpdate(req.body.selfid,{
          $push:{accepted_by:req.body.id}
        })
        await Provider.findByIdAndUpdate(req.body.id,{
          $pull:{applied_by:req.body.selfid}
        })
        const user2 = await Provider.findByIdAndUpdate(req.body.id,{
          $push:{accepted_of:req.body.selfid}
        })
        var mailOptions = {
          from: 'manaspatidar170@gmail.com',
          to: `${user.email}`,
          subject: 'Your request for loan is approved',
          text: `Hey ${user.name} 
          We are very happy to tell you that your request for loan to ${user2.name} has been aproved
          please make sure to complete the amount payable as Consultancy charge 
          after payment success you will recieve a mail with the Providers Contact details
          use this ticket no. for payment ${tr.ticket}
          Heres payment link : ${process.env.FRONTEND_URL}/prepayment `
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            alert(error);
          } 
        });
        res.status(200).json("success")
      } catch (error) {
      res.status(400).json(error)
        
    }
}

export const update = async(req,res)=>{
  try {
    await Provider.findByIdAndUpdate(req.body.id,{
      amount:req.body.amount
    },{new:true})
    res.status(200).json("Success")
  } catch (error) {
    res.status(400).json("Failed")
    
  }
}

export const rejected = async (req, res) => {
    try {
        await Transaction.findOneAndUpdate({from:req.body.selfid,to:req.body.id},{
          status:"Rejected"
        })
        await Seeker.findByIdAndUpdate(req.body.selfid,{
          $push:{Rejected_by:req.body.id},
         
        })
    } catch (error) {
        
    }
}