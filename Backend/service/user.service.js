import { Usermodel } from "../Models/User.models.js";

//user create ho raha h
export const createuser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("email and password are required");
  }
  //   const existeduser = await Usermodel.find({
  //     $or:[{username},{email}]
  //   }

  //   )

  const existeduser = await Usermodel.findOne({ email });
  if (existeduser) {
    throw new Error("user already exist!!");
  }

  const User = await Usermodel.create({
    email,
    password,
  });

  return User;
};



export const getalluser = async( {userid})=>{

  if(!userid) {
    throw new Error("userid is not provided")
  }



  const alluser = await Usermodel.find({
    _id:{
      $ne:userid
    },

  })


  return alluser

}