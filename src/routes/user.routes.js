import { Router } from "express";

const router = Router()

router.route("/registeredUser").post(registerUser)

export default router