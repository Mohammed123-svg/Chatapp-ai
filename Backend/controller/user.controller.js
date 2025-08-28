import { createuser, getalluser } from "../service/user.service.js";
import { Usermodel } from "../Models/User.models.js";
import { validationResult } from "express-validator";
import { Apiresponse } from "../Utils/Response.js";

import redisclient from "../service/redis.service.js";

//controller m logic wala part h aur express validator valid karega data a raha sahi h y nahi

export const createusercontroller = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await createuser(req.body);
    const token = await user.generatetoken();
    delete user._doc.password;
    return res
      .status(201)
      .json(
        new Apiresponse(
          200,
          { users: user, token },
          "user successfully created"
        )
      );
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
// login controller
export const loginuser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    // const user = await Usermodel.findOne({  
    //   $or: [{ email }, { _id }],
    // });
    const user = await Usermodel.findOne({ email }).select("+password"); //search  user and then add password to comapre the password for login
    if (!user) {
      return res.status(401).json({ errors: "invalid credentatils" });
    }

    const ispasswordvalid = await user.ispasswordvalid(password);
    if (!ispasswordvalid) {
      return res.status(401).json({ errors: "invalid password" });
    }
    const token = await user.generatetoken();
    delete user._doc.password;
    return res
      .status(201)
      .json(
        new Apiresponse(200, { login: user, token }, " user login successfully")
      );
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const profilecontroller = async (req, res) => {
  return res
    .status(201)
    .json(
      new Apiresponse(201, { profileuser: req.user }, "profile of user  !!")
    );
};

export const logoutuser = async (req, res) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    await redisclient.set(token, "logout", "EX", 60 * 60 * 24);
    // console.log("token is :",token);

    //  if (!token) {

    // }

    return res
      .status(201)
      .json(new Apiresponse(200, "user logout succesfully"));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getallusercontroller = async (req, res) => {
  try {
    const userid = req.user._id;

    const alluser = await getalluser({ userid: userid });

    return res.status(200).json({
      users: alluser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
