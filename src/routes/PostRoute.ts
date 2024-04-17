import {Router} from "express";
import {PostController} from "../controllers/PostController";

const PostRoute = Router()

PostRoute.post("/post", new PostController().create)
PostRoute.get("/post/:id", new PostController().read)
PostRoute.put("/post/:id", new PostController().update)
PostRoute.delete("/post/:id", new PostController().delete)

export default PostRoute