import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Userschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // agar password modified nahi huva h to next return kardo
  this.password = await bcrypt.hash(this.password, 10);
  next();
});




Userschema.methods.ispasswordvalid = async function (password) {
  return await bcrypt.compare(password, this.password);
};

Userschema.methods.generatetoken = function () {
  return jwt.sign(
    {
      email: this.email,
      _id: this._id,
    },
    process.env.JWT_SECRET,{
      expiresIn:"24h"
    }
  );
};

export const Usermodel = mongoose.model("User", Userschema);
