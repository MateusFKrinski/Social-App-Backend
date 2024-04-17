import express from "express";
import UserRoute from "./UserRoute"
import UserProfileRoute from "./UserProfileRoute";
import CategoryRoute from "./CategoryRoute";
import CategoryGroupRoute from "./CategoryGroupRoute";
import PostRoute from "./PostRoute";
import CommentRoute from "./CommentRoute";
import UserRelationsRoute from "./UserRelationsRoute";
import AuthorizationRoute from "./AuthorizationRoute";

const routes = express.Router()

// UserProfile, Post, Comment -> Images

routes.use(UserRoute)
routes.use(UserProfileRoute)
routes.use(CategoryGroupRoute)
routes.use(CategoryRoute)
routes.use(PostRoute)
routes.use(CommentRoute)
routes.use(UserRelationsRoute)
routes.use(AuthorizationRoute)

export default routes