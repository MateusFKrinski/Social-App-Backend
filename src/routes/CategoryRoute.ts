import {Router} from "express";
import {CategoryController} from "../controllers/CategoryController";

const CategoryRoute = Router()

CategoryRoute.post("/category", new CategoryController().create)
CategoryRoute.get("/category/:id", new CategoryController().read)
CategoryRoute.get("/category/show/all", new CategoryController().readAll)
CategoryRoute.put("/category/:id", new CategoryController().update)
CategoryRoute.delete("/category/:id", new CategoryController().delete)

export default CategoryRoute