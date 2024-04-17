import {Router} from "express"
import {AuthController} from "../controllers/AuthController";

const AuthorizationRoute = Router()

AuthorizationRoute.post("/auth/user/", new AuthController().getAuth)
AuthorizationRoute.post("/auth/get/user/token", new AuthController().getUserByToken)

export default AuthorizationRoute