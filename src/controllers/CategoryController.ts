import {Request, Response} from "express";
import prismaClient from "../database/prismaClient";

type CategoryDataType = {
    id?: string
    group_id: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string | null
}

export class CategoryController {
    async create(request: Request, response: Response) {
        const {name, group_id}: CategoryDataType = request.body
        const CategoryGroup = await prismaClient.postCategoryGroup.findUnique({where: {post_category_group_id: group_id}})

        if (!name) return response.status(400).json({error: "NAME IS UNDEFINED"})
        if (!group_id) return response.status(400).json({error: "CATEGORY GROUP IS UNDEFINED"})
        if (!CategoryGroup?.post_category_group_id) return response.status(404).json({error: "CATEGORY GROUP ID IS NOT VALID"})

        const category = await prismaClient.postCategory.create({
            data: {
                post_category_group_id: group_id,
                post_category_name: name
            }
        })

        return response.status(201).json(category)
    }

    async read(request: Request, response: Response) {
        const id = request.params.id
        const category = await prismaClient.postCategory.findUnique({where: {post_category_id: id}})

        if (!category?.post_category_id) return response.status(404).json({error: "ID IS NOT VALID"})

        return response.status(200).json(category)
    }

    async readAll(request: Request, response: Response) {
        const categoryGroup = await prismaClient.postCategory.findMany()

        return response.status(200).json(categoryGroup)
    }

    async update(request: Request, response: Response) {
        const id = request.params.id
        const {name, group_id}: CategoryDataType = request.body
        const category = await prismaClient.postCategory.findUnique({where: {post_category_id: id}})
        const categoryGroup = await prismaClient.postCategoryGroup.findUnique({where: {post_category_group_id: group_id}})

        if (!category?.post_category_id) return response.status(404).json({error: "ID IS NOT VALID"})
        if (group_id && !categoryGroup?.post_category_group_id) return response.status(404).json({error: "CATEGORY GROUP ID IS NOT VALID"})

        const updatedCategory = await prismaClient.postCategory.update({
            where: {
                post_category_id: id
            },
            data: {
                post_category_name: !!name ? name : category?.post_category_name,
                post_category_group_id: !!group_id ? group_id : category?.post_category_group_id,
                post_category_updated_at: new Date()
            }
        })

        return response.status(200).json(updatedCategory)
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id
        const category = await prismaClient.postCategory.findUnique({where: {post_category_id: id}})

        if (!category?.post_category_id) return response.status(404).json({error: "ID IS NOT VALID"})

        await prismaClient.postCategory.delete({
            where: {post_category_id: id}
        })

        return response.status(200).json({deleted: true})
    }
}