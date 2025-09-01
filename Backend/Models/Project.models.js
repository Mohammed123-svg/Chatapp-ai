import mongoose from "mongoose";

const projectschema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
  ],
});






export const ProjectModel=mongoose.model("Project",projectschema)