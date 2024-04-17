import {Router} from "express";
import {UserProfileController} from "../controllers/UserProfileController";

const UserProfileRoute = Router()

UserProfileRoute.post("/user/profile", new UserProfileController().create)
UserProfileRoute.get("/user/profile/:id", new UserProfileController().read)
UserProfileRoute.put("/user/profile/:id", new UserProfileController().update)
UserProfileRoute.delete("/user/profile/:id", new UserProfileController().delete)

export default UserProfileRoute