import {Request, Response} from "express";
import prismaClient from "../database/prismaClient";

type CommentDataType = {
    id?: string
    father_id?: string
    post_id: string
    author_id: string
    content: string
    images?: Buffer | null
    like?: number
    created_at?: string
    updated_at?: string | null
}

export class CommentController {
    async create(request: Request, response: Response) {
        const {father_id, post_id, author_id, content, images}: CommentDataType = request.body
        const userProfile = await prismaClient.userProfile.findUnique({where: {user_profile_id: author_id}})
        const existentComments = await prismaClient.postComment.findUnique({where: {post_comment_id: father_id}})
        const post = await prismaClient.post.findUnique({where: {post_id: post_id}})

        if (!post_id) return response.status(400).json({error: "POST ID IS UNDEFINED"})
        if (!author_id) return response.status(400).json({error: "AUTHOR ID IS UNDEFINED"})
        if (!content) return response.status(400).json({error: "CONTENT IS UNDEFINED"})

        if (!userProfile?.user_profile_id) return response.status(400).json({error: "AUTHOR ID IS NOT VALID"})
        if (father_id && !existentComments?.post_comment_id) return response.status(400).json({error: "FATHER COMMENT NONEXISTENT"})
        if (!post?.post_id) return response.status(400).json({error: "POST ID IS NOT VALID"})

        const comment = await prismaClient.postComment.create({
            data: {
                post_comment_father_id: father_id,
                post_comment_post_id: post_id,
                post_comment_author_id: author_id,
                post_comment_content: content,
                post_comment_images: images
            }
        })

        return response.status(201).json(comment)
    }

    async read(request: Request, response: Response) {
        const id = request.params.id
        const postComment = await prismaClient.postComment.findUnique({where: {post_comment_id: id}})

        if (!postComment?.post_comment_id) return response.status(400).json({error: "ID IS NOT VALID"})

        return response.status(200).json(postComment)
    }

    async readAllForPost(request: Request, response: Response) {
        const postId = request.params.postId
        const postComment = await prismaClient.postComment.findMany({
            where: {
                post_comment_post_id: postId
            }
        })

        if (!postComment) return response.status(400).json({error: "DIDN'T FIND ANY DATA FOR THESE REFERENCES"})

        return response.status(200).json(postComment)
    }

    async update(request: Request, response: Response) {
        const id = request.params.id
        const {content, images}: CommentDataType = request.body
        const postComment = await prismaClient.postComment.findUnique({where: {post_comment_id: id}})

        if (!postComment?.post_comment_id) return response.status(400).json({error: "ID IS NOT VALID"})

        const updatedComment = await prismaClient.postComment.update(
            {
                where: {
                    post_comment_id: id
                }, data: {
                    post_comment_content: !!content ? content : postComment?.post_comment_content,
                    post_comment_images: !!images ? images : postComment?.post_comment_images,
                    post_comment_updated_at: new Date()
                }
            }
        )

        return response.status(200).json(updatedComment)
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id
        const postComment = await prismaClient.postComment.findUnique({where: {post_comment_id: id}})

        if (!postComment?.post_comment_id) return response.status(400).json({error: "ID IS NOT VALID"})

        await prismaClient.postComment.delete(
            {
                where: {
                    post_comment_id: id
                }
            }
        )

        return response.status(200).json({deleted: true})
    }
}
