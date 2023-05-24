import { Provider } from "../models/Provider.js";
import { Seeker } from "../models/Seekers.js";
import { Transaction } from "../models/Transaction.js"

import nodemailer from "nodemailer"
import { Request } from "../models/request.js";
import { acknowledment } from "../models/acknowledment.js";

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MY_MAIL,
    pass: process.env.MAIL_PASS
  }
});

export const login = async (req, res) => {
    try {
        const tr = await Transaction.findOne({ticket:req.body.ticket})
        const u1 = await Seeker.findById(tr.from)
        const u2 = await Provider.findById(tr.to)
        res.status(200).json({from:tr.from,to:tr.to,amount:tr.amount,tr:{tr,u1,u2}});
    } catch (error) {
        res.status(400).json(error);
    }

}

export const success = async (req,res) =>{
    try {
      const tr = await Transaction.findOneAndUpdate({from:req.body.from,to:req.body.to},{
        status:"sanction done"
      })
      const rev = await acknowledment.findById("6469ad747da43f2401c1c853");
      await acknowledment.findByIdAndUpdate("6469ad747da43f2401c1c853",{
        no:rev.no+tr.amount*0.01
      })
        const user = await Seeker.findById(tr.from)
        const user2 = await Provider.findById(tr.to)

        var mailOptions = {
            from: 'manaspatidar170@gmail.com',
            to: `${user.email}`,
            subject: 'Here is your contact details',
            text: `Hey ${user.name} 
            We are very happy to tell you that your request for loan to ${user2.name} has been Sanctioned Succesfully
            Your Payment Was successfull
            Here is the Providers contact details
            Name: ${user2.name}
            Contact no.: ${user2.mobile}
            Email-id : ${user2.email}

            Note: The further Loan process should be caried out by you and the provider itself, Fine will not be responsible for and Problems caused in further process`
        };
        var mailOptions2 = {
            from: 'manaspatidar170@gmail.com',
            to: `${user2.email}`,
            subject: 'Here is your contact details',
            text: `Hey ${user2.name} 
            We are very happy to tell you that ${user.name} has done all the formalities and now you can contact them   
            Here is the Seekers contact details
            Name: ${user.name}
            Contact no.: ${user.mobile}
            Email-id : ${user.email}

            Note: The further Loan process should be caried out by you and the provider itself, Fine will not be responsible for and Problems caused in further process`
        };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
             alert(error)
            } 
          });
          transporter.sendMail(mailOptions2, function(error, info){
            if (error) {
              alert(error);
            }
          });
          res.status(200).json("success")
        } catch (error) {
      res.status(400).json(error)
        
    }
}

export const apply = async(req,res) =>{
  const {start,end,amount,id,ticket } = req.body

  try {
    await Request.create({
      start,end,amount,id,ticket
    })
    res.status(200).json("success")
  } catch (error) {
    res.status(400).json(error);
  }
}

export const admin = async(req,res) =>{
  try{
    if(req.body.key=="admin@123"){
      const tr = await Transaction.find({})
      const rating = await Request.find({})
      const u1 = await Seeker.count({})
      const u2 = await Provider.count({})
      const u3 = await Transaction.count({})
      const u = await Transaction.find({status:"sanction done"})
      var u4 = 0;
      for(var i=0;i<u.length;i++){
        u4 += u[i].amount;
      }
      const {no}= await acknowledment.findById("6469ad747da43f2401c1c853");
      res.status(200).json({tr,rating,info:{u1,u2,u3,u4,u5:no}});
    }
    else{
      res.status(300).json("invalid information")
    }
  }catch(error){
    res.status(400).json(error)
  }
}