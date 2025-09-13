import { ProjectModel } from "../Models/Project.models.js";
import {
  addotherusertoproject,
  createproject,
  getallprojectbyuserid,
  getprojectbyid,
} from "../service/project.service.js";
import { validationResult } from "express-validator";

export const createprojectcontroller = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    const userid = req.user._id;

    const newproject = await createproject({ name, userid });

    res.status(201).json({ project: newproject });
  } catch (error) {
    console.log(error);

    res.status(400).send(error.message);
  }
};

export const getproject = async (req, res) => {
  try {
    // console.log(req.user._id);

    const userId = req.user?._id;

    if (!userId) {
      throw new Error("id nahi mil rahi ");
    }
    const getproject = await getallprojectbyuserid(userId);
    return res.status(200).json({
      projects: getproject,
    });
  } catch (error) {
    console.log(error);

    res.status(400).send(error.message);
  }
};

export const addusertoproject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { projectid, users } = req.body;

    // console.log(req.user._id);
    const userid = req.user._id;

    const project = await addotherusertoproject({
      projectid,
      users,
      currentuserid: userid,
    });

    return res.status(200).json({
      project,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

export const getprojecbyidcontroller = async (req, res) => {
  try {
    const { projectid } = req.params;

    const project = await getprojectbyid(projectid);

    return res.status(200).json({
      projectdetails: project,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};





