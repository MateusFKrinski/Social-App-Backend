import {Router} from "express";
import {CommentController} from "../controllers/CommentController";

const CommentRoute = Router()

CommentRoute.post("/post/commentaries", new CommentController().create)
CommentRoute.get("/post/commentaries/:id", new CommentController().read)
CommentRoute.get("/post/all/commentaries/:postId", new CommentController().readAllForPost)
CommentRoute.put("/post/commentaries/:id", new CommentController().update)
CommentRoute.delete("/post/commentaries/:id", new CommentController().delete)

export default CommentRoute