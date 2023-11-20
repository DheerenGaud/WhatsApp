const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");

require("dotenv").config();
const Router = express.Router();
const User = require("../model/user");
const Contacts = require("../model/contact");
const Data = require("../model/data");
const Group = require("../model/group");
const { Varification, getContactData } = require("../middleware/index");

//for profile pic
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profilePic");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

Router.post("/login", async (req, res) => {
  const { sub, given_name, email, picture } = req.body;
  try {
    const user = await User.findOne({ sub });
    if (user) {
      const userContact = await Contacts.findOne({ user_id: user._id });
      //  console.log(userContact.contacts);
      const token = jwt.sign(
        { user_id: user._id.toString() },
        process.env.JWT_SECREAT,
        {
          expiresIn: 3600,
        }
      );
      let contactData = [];
      contactData = await getContactData(userContact.contacts, res);
      const data = {
        token: token,
        contacts: contactData,
      };
      res
        .status(200)
        .json({ status: "ok", msg: "User Successfully Found", data: data });
    } else {
      User.create({
        Name: given_name,
        sub: sub,
        email: email,
        profilePic: picture,
      })
        .then((result) => {
          Contacts.create({ user_id: result._id, contacts: [] })
            .then(() => {
              const token = jwt.sign(
                { user_id: result._id.toString() },
                process.env.JWT_SECREAT,
                {
                  expiresIn: 3600,
                }
              );
              const data = {
                token: token,
                contscts: [],
              };
              res
                .status(200)
                .json({ status: "ok", msg: "New User Created ", data: data });
            })
            .catch((err) => {
              console.log(err);
              res
                .status(500)
                .json({
                  status: "error",
                  msg: "Error occure while crating empty contact ",
                });
            });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({
              status: "error",
              msg: "Error occure while crating New User ",
            });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Error" });
  }
});

Router.post("/newContact", Varification, async (req, res) => {
  // console.log(req.body);
  const user_id = req.body.user_id;
  const email = req.body.email;
  try {
    User.findOne({ email: email })
      .then(async (result) => {
        if (result) {
          const contact = await Contacts.findOne({ user_id });
          const userExist = contact.contacts.find(
            (data) => data.user_id == result._id
          );

          if (!userExist) {
            const useContact = await Contacts.findOne({ user_id: result._id });
            const chekUserExist = useContact.contacts.find(
              (data) => data.user_id == user_id
            );

            if (!chekUserExist) {
              const newData = await Data.create({
                data_type: "normal",
                datas: {
                  user_id1: user_id + "1",
                  user_id2: result._id.toString() + "2",
                },
              });
              contact.contacts.push({
                data_id: newData._id,
                user_id: result._id,
              });
            } else {
              contact.contacts.push({
                data_id: chekUserExist.data_id,
                user_id: result._id,
              });
            }

            await contact.save();
            let contactData = [];
            contactData = await getContactData(contact.contacts, res);
            res
              .status(200)
              .json({
                status: "ok",
                msg: "Successfully created new contact",
                contacts: contactData,
              });
          } else {
            res
              .status(401)
              .json({ status: "error", msg: "User Alredy in Contacts" });
          }
        } else {
        //   console.log(result);
          res
            .status(401)
            .json({ status: "error", msg: "This email is Not exsist" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ status: "error", msg: " Internal Error" });
      });
  } catch (error) {
    res.status(500).json({ status: "error", msg: " Internal Error" });
  }
});

Router.post("/newGroup",upload.single("profilePic"),Varification,async (req, res) => {
    try {
      const profilePic = req.file ? req.file.filename : "https://tse1.mm.bing.net/th?id=OIP.aSSH6QmhubP7ovQ2ctz1rAHaHa&pid=Api&P=0&h=180";
    //   console.log("user_id > " + req.body.user_id);
      const UserArray = req.body.User.split(",");
      const users = UserArray.map((userId) => ({
        user_id: userId.trim(),
        timeOfJoin: Date.now(),
      }));
      const Admin = [
        {
          user_id: req.body.user_id,
          timeOfJoin: Date.now(),
        },
      ];
    //   console.log(Admin);
      const newGroup = await Group.create({
        Admin: Admin,
        User: users,
        profilePic,
        GroupName: req.body.GroupName,
        count: UserArray.length,
      });
      const usersForData = UserArray.map((userId, i) => ({
        user_id: userId.trim() + (i + 1),
      }));
      //c reateing group data
      const GroupData = await Data.create({
        data_type: "group",
        group_id: newGroup._id,
        datas: { users: usersForData },
      });

      UserArray.push(req.body.user_id);

      UserArray.map(async (user_id) => {
        // console.log("user_id => " + user_id);
        const userContact = await Contacts.findOne({ user_id: user_id });
        userContact.contacts.push({
          data_id: GroupData._id,
          group_id: newGroup._id,
        });
        await userContact.save();
      });
      await GroupData.save();
      await newGroup.save();
      const userInfo = await Contacts.findOne({ user_id: req.body.user_id });
      let contactData = [];
      contactData = await getContactData(userInfo.contacts, res);
      res
        .status(200)
        .json({
          status: "ok",
          msg: "Successfully created new Group",
          contacts: contactData,
        });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "ok", msg: "Error while Creating new Group" });
    }
  }
);


Router.get("/getData",Varification,async(req,res)=>{
  const user_id= req.body.user_id;
  try {
    const userContact= await Contacts.findOne({user_id})
    let contactData = [];
    contactData = await getContactData(userContact.contacts, res);
    res.status(200).json({status: "ok",msg: "Successfully findData ",contacts: contactData,});
  } catch (error) {
    res.status(500).json({ status: "error", msg: " Internal Error" });
  }
})
module.exports = Router;
