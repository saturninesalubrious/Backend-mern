import { Router } from "express";
import { registerUser } from "../cotrollers/userController.js";
import { upload } from "../middlewares/multermiddlware.js";
import { validateUser } from "../middlewares/userValidationError.js";

const router = Router()

router.route("/registeredUser").post(upload.fields([{name: "avatar", maxCount: 1}, {name: "coverImage", maxCount: 1}]),validateUser,registerUser)

export default router
