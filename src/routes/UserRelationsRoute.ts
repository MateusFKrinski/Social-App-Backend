import {Request, Response, Router} from "express";
import {UserRelationsController} from "../controllers/UserRelationsController";
import multer from "multer";

const UserRelationsRoute = Router()

UserRelationsRoute.post("/user/relations", new UserRelationsController().create)
UserRelationsRoute.get("/user/relations/:id", new UserRelationsController().read)
UserRelationsRoute.get("/user/all/relations/:id", new UserRelationsController().readAll)
UserRelationsRoute.delete("/user/relations/:id", new UserRelationsController().delete)

UserRelationsRoute.post("/teste", multer().single("file"), (request: Request, response: Response) => {
    const {test} = request.body

    console.log(test)

    response.status(200).json("vsf")
})
export default UserRelationsRoute