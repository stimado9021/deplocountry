import { Router } from "express";
import { LogOutControllerSession,RegisterControllerSession,LoginControllerSession } from "../../Controllers/Auth/Auth.controller.js";

const router = Router()


router.post("/login",LoginControllerSession)
router.post("/register",RegisterControllerSession)
router.delete("/logOut",LogOutControllerSession)



export default router;