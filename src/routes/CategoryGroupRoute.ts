import {Router} from "express";
import {CategoryGroupController} from "../controllers/CategoryGroupController";

const CategoryGroupRoute = Router()

CategoryGroupRoute.post("/group/category", new CategoryGroupController().create)
CategoryGroupRoute.get("/group/category/:id", new CategoryGroupController().read)
CategoryGroupRoute.get("/group/all/category", new CategoryGroupController().readAll)
CategoryGroupRoute.put("/group/category/:id", new CategoryGroupController().update)
CategoryGroupRoute.delete("/group/category/:id", new CategoryGroupController().delete)

export default CategoryGroupRoute