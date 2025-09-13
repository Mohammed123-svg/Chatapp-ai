import mongoose from "mongoose";
import { ProjectModel } from "../Models/Project.models.js";

export const createproject = async ({ name, userid }) => {
  if (!name || !userid) {
    throw new Error("name and id is required");
  }

  const existingproject = await ProjectModel.findOne({ name });
  if (existingproject) {
    throw new Error("project name already exists take new name");
  }

  const project = await ProjectModel.create({
    name,
    users: [userid],
  });

  return project;
};

// Ye function given userId ke saare projects database se laata hai
// jaha project ke 'users' array me ye userId present hota hai


export const getallprojectbyuserid = async (userid) => {
  if (!userid) {
    throw new Error("userid is required");
  }
  // Mujhe wo saare projects do jinke users array me ye userId maujood hai  this line is about //
  const project = await ProjectModel.find({
    users: userid,
  });

  return project;
};

// Ye function check karta hai ki current user project ka member hai ya nahi,
//  agar hai to naye users ko us project ke 'users' array me add karta hai (duplicate avoid karke).

  export const addotherusertoproject = async ({
    projectid,
    users,
    currentuserid,
  }) => {
    if (!projectid ) {
      throw new Error("project id  is required");
    }
    if (!users) {
      throw new Error("users  is required");
    }
    if (!currentuserid ) {
      throw new Error(" currentid  is required");
    }
 
                                                              
    if (!mongoose.Types.ObjectId.isValid(projectid)) {
      throw new Error("invalid project id");
    }

    if (
      !Array.isArray(users) ||
      users.some((id) => !mongoose.Types.ObjectId.isValid(id))
    ) {
      throw new Error("invalid user's  id in users array");
    }

    const project = await ProjectModel.findOne({
      _id: projectid,
      users: currentuserid,
    });

    if (!project) {
      throw new Error("user does not belong to this project");
    }

    const adduserttoproject = await ProjectModel.findByIdAndUpdate(
      {
        _id: projectid,
      },
      {
        $addToSet: {
          users: {
            $each: users,
          },
        },
      },

      {
        new: true,
      }
    );

    return adduserttoproject;
};




export const  getprojectbyid = async(projectid)=>{
  if(!projectid){
    throw new Error("projectid is required ")
  }
  if(!mongoose.Types.ObjectId.isValid(projectid)){
    throw new Error("projectid is not valid type")
  }



   const project = await ProjectModel.findOne({
    _id:projectid
   }).populate("users")




   return project;
}













