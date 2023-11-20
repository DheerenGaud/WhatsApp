const jwt = require("jsonwebtoken")
const User= require("../model/user")
const Group= require("../model/group")
const Data= require("../model/data")
require("dotenv").config();

exports.Varification=async(req, res, next)=>{
    const token = req.headers.authorization;
    // console.log(token);
    const user=jwt.verify(token,process.env.JWT_SECREAT,(err,res)=>{
      if(err){
        console.log(err);
        return false
      }
        return res;
    })

    if(user===false){
      return res.status(401).json({ status: "error", msg: 'Plese go For login' });
    }
    else{
      req.body.user_id=user.user_id;
      next();
    }

}
exports.getContactData=async(contacts,res)=>{
  try {
    const contactData=await Promise.all(contacts.map(async(data)=>{
      const dataofUser=await Data.findOne({_id:data.data_id});
      if(!data.group_id){
        const contactUser=await User.findOne({_id:data.user_id});
        return {
          Notification:data.Notification,data_id:data.data_id,data:dataofUser,user_id:data.user_id,Name:contactUser.Name,profilePic:contactUser.profilePic,email:contactUser.email
        }
      }
      else{
        const contactGroup=await Group.findOne({_id:data.group_id});
           return {
               Notification:data.Notification,data_id:data.data_id,data:dataofUser,group_id:data.group_id,Name:contactGroup.GroupName,profilePic:contactGroup.profilePic,
           }       }
   }));
    return contactData;
  } catch (error) {
    res.status(500).json({status:"error",msg:"Internal Error"})
  }
}
