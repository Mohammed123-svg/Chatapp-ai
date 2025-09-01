import { Router } from "express";

import { body } from "express-validator";
import { addusertoproject, createprojectcontroller, getprojecbyidcontroller, getproject } from "../controller/project.controller.js";
import { authenticateduser } from "../middleware/auth.midddleware.js";

const router = Router();

router.post(
  "/createproject",
  body("name").isString().withMessage("name is required"),
  authenticateduser,
  createprojectcontroller
);


router.get("/getallproject",authenticateduser,getproject)

router.put("/add-user",authenticateduser,addusertoproject)



router.get("/getprojectby-id/:projectid",authenticateduser,getprojecbyidcontroller)

export default router;
