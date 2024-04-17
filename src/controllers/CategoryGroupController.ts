import {Request, Response} from "express";
import prismaClient from "../database/prismaClient";

type CategoryGroupDataType = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string | null
}

export class CategoryGroupController {
    async create(request: Request, response: Response) {
        const {name}: CategoryGroupDataType = request.body

        if (!name) return response.status(400).json({error: "NAME IS UNDEFINED"})

        const categoryGroup = await prismaClient.postCategoryGroup.create(
            {
                data: {
                    post_category_group_name: name
                }
            }
        )

        return response.status(201).json(categoryGroup)
    }

    async read(request: Request, response: Response) {
        const id = request.params.id
        const categoryGroup = await prismaClient.postCategoryGroup.findUnique({where: {post_category_group_id: id}})

        if (!id) return response.status(400).json({error: "ID IS UNDEFINED"})
        if (!categoryGroup?.post_category_group_id) return response.status(400).json({error: "ID IS NOT VALID"})

        return response.status(200).json(categoryGroup)
    }

    async readAll(request: Request, response: Response) {
        const categoryGroup = await prismaClient.postCategoryGroup.findMany()

        return response.status(200).json(categoryGroup)
    }

    async update(request: Request, response: Response) {
        const id = request.params.id
        const {name}: CategoryGroupDataType = request.body
        const categoryGroup = await prismaClient.postCategoryGroup.findUnique({where: {post_category_group_id: id}})

        if (!categoryGroup?.post_category_group_id) return response.status(400).json({error: "ID IS NOT VALID"})

        const updatedCategoryGroup = await prismaClient.postCategoryGroup.update(
            {
                where: {
                    post_category_group_id: id
                },
                data: {
                    post_category_group_name: !!name ? name : categoryGroup?.post_category_group_name,
                    post_category_group_updated_at: new Date()
                }
            }
        )

        return response.status(200).json(updatedCategoryGroup)
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id
        const categoryGroup = await prismaClient.postCategoryGroup.findUnique({where: {post_category_group_id: id}})

        if (!categoryGroup?.post_category_group_id) return response.status(400).json({error: "ID IS NOT VALID"})

        await prismaClient.postCategoryGroup.delete(
            {
                where: {
                    post_category_group_id: id
                }
            }
        )

        return response.status(200).json({deleted: true})
    }
}