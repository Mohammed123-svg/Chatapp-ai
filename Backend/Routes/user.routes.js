import { Router } from "express";
import {
  createusercontroller,
  getallusercontroller,
  loginuser,
  logoutuser,
  profilecontroller,
} from "../controller/user.controller.js";
import { body } from "express-validator";
import { authenticateduser } from "../middleware/auth.midddleware.js";
const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("email must be valid email address"), //y body middleware h
  body("password")
    .isLength({ min: 3 })
    .withMessage("password must be 3 character long"),

  createusercontroller
);
router.post(
  "/login",
  body("email").isEmail().withMessage("email must be valid email address"), //y body middleware h
  body("password")
    .isLength({ min: 3 })
    .withMessage("password must be 3 character long"),
  loginuser
);

//protected route
router.get("/profile",authenticateduser,profilecontroller)
router.get("/logout",authenticateduser,logoutuser)
router.get("/allusers",authenticateduser,getallusercontroller)

export default router;
