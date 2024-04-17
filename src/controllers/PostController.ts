import {Request, Response} from "express";
import prismaClient from "../database/prismaClient";

type PostDataType = {
    id?: string
    category_id: string
    author_id: string
    content: string
    images?: Buffer | null
    like?: number
    created_at?: Date | string
    updated_at?: Date | string | null
}

export class PostController {
    async create(request: Request, response: Response) {
        const {category_id, author_id, content, images}: PostDataType = request.body
        const category = await prismaClient.postCategory.findUnique({where: {post_category_id: category_id}})
        const userProfile = await prismaClient.userProfile.findUnique({where: {user_profile_id: author_id}})

        if (!category_id) return response.status(400).json({error: "CATEGORY ID IS UNDEFINED"})
        if (!author_id) return response.status(400).json({error: "AUTHOR ID IS UNDEFINED"})
        if (!content) return response.status(400).json({error: "CONTENT IS UNDEFINED"})

        if (!category?.post_category_id) return response.status(400).json({error: "CATEGORY ID IS NOT VALID"})
        if (!userProfile?.user_profile_id) return response.status(400).json({error: "AUTHOR ID IS NOT VALID"})

        if (images && !Buffer.isBuffer(images)) return response.status(400).json({error: "AVATAR BUFFER IS NOT VALID"});

        const post = await prismaClient.post.create({
            data: {
                post_category_id: category_id,
                post_author_id: author_id,
                post_content: content,
                post_images: images
            }
        })

        return response.status(201).json(post)
    }

    async read(request: Request, response: Response) {
        const id = request.params.id
        const post = await prismaClient.post.findUnique({where: {post_id: id}})

        if (!!post?.post_id) return response.status(400).json({error: "ID IS NOT VALID"})

        return response.status(200).json(post)
    }

    async update(request: Request, response: Response) {
        const id = request.params.id
        const {category_id, content, images}: PostDataType = request.body
        const post = await prismaClient.post.findUnique({where: {post_id: id}})
        const category = await prismaClient.postCategory.findUnique({where: {post_category_id: category_id}})

        if (!!post?.post_id) return response.status(400).json({error: "ID IS NOT VALID"})
        if (category && !!category?.post_category_id) return response.status(400).json({error: "CATEGORY ID IS NOT VALID"})
        if (images && !Buffer.isBuffer(images))
            return response.status(400).json({error: "IMAGES BUFFER IS NOT VALID"});

        const updatedPost = await prismaClient.post.update({
            where: {
                post_id: id
            },
            data: {
                post_category_id: !!category_id ? category_id : post?.post_category_id,
                post_content: !!content ? content : post?.post_content,
                post_images: !!images ? images : post?.post_images,
                post_updated_at: new Date()
            }
        })

        return response.status(200).json(updatedPost)
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id
        const post = await prismaClient.post.findUnique({where: {post_id: id}})

        if (!!post?.post_id) return response.status(400).json({error: "ID IS NOT VALID"})

        const deletedPost = await prismaClient.post.delete(
            {
                where: {
                    post_id: id
                }
            }
        )

        return response.status(200).json({deleted: true})
    }
}