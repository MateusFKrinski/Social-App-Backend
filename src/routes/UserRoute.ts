import {Router} from "express";
import {UserController} from "../controllers/UserController";

const UserRoute = Router()

UserRoute.post("/user/", new UserController().create)
UserRoute.get("/user/:id", new UserController().read)
UserRoute.put("/user/:id", new UserController().update)
UserRoute.delete("/user/:id", new UserController().delete)

export default UserRoute