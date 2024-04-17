import {Response, Request} from "express";
import prismaClient from "../database/prismaClient";

type UserRelationsType = {
    id?: string
    follower_id?: string
    followed_id?: string
    mutual: boolean
    created_at?: Date | string
    updated_at?: Date | string | null
}

export class UserRelationsController {
    async create(request: Request, response: Response) {
        const {follower_id, followed_id}: UserRelationsType = request.body
        const userProfileFollower = await prismaClient.userProfile.findUnique({where: {user_profile_id: follower_id}})
        const userProfileFollowed = await prismaClient.userProfile.findUnique({where: {user_profile_id: followed_id}})
        const follower = await prismaClient.userRelations.findMany({where: {user_relation_follower_id: follower_id}})

        if (!follower_id) return response.status(400).json({error: "FOLLOWER ID IS UNDEFINED"})
        if (!followed_id) return response.status(400).json({error: "FOLLOWED ID IS UNDEFINED"})
        if (follower_id == followed_id) return response.status(400).json({error: "IT IS NOT POSSIBLE TO CREATE A RELATION WITH YOURSELF"})
        if (!userProfileFollower?.user_profile_id) return response.status(400).json({error: "FOLLOWER ID IS INVALID, NONEXISTENT"})
        if (!userProfileFollowed?.user_profile_id) return response.status(400).json({error: "FOLLOWED ID IS INVALID, NONEXISTENT"})

        let alreadyRelation = false
        follower.forEach(function (value) {
            if (value.user_relation_followed_id == followed_id) alreadyRelation = true
        })
        if (alreadyRelation) return response.status(400).json({error: "USER RELATION ALREADY EXIST"})

        const userRelation = await prismaClient.userRelations.create({
            data: {
                user_relation_follower_id: follower_id,
                user_relation_followed_id: followed_id
            }
        })

        return response.status(201).json(userRelation)
    }

    async read(request: Request, response: Response) {
        const id = request.params.id
        const userRelation = await prismaClient.userRelations.findUnique({where: {user_relation_id: id}})

        if (!userRelation?.user_relation_id) return response.status(400).json({error:"ID IS NOT VALID"})

        return response.status(200).json(userRelation)
    }

    async readAll(request: Request, response: Response) {
        const id = request.params.id
        const userRelationFollower = await prismaClient.userRelations.findMany({where: {user_relation_follower_id: id}})
        const userRelationFollowed = await prismaClient.userRelations.findMany({where: {user_relation_followed_id: id}})

        if (!userRelationFollower) return response.status(400).json({error: "ID IS NOT VALID"})

        const followMe: string | any[] = []
        const iFollow: string | any[] = []

        userRelationFollower.forEach((value) => {
            iFollow.push(value.user_relation_followed_id)
        })
        userRelationFollowed.forEach((value) => {
            followMe.push(value.user_relation_follower_id)
        })

        return response.status(200).json({
            iFollow: iFollow,
            followMe: followMe
        })
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id
        const userRelation = await prismaClient.userRelations.findUnique({where: {user_relation_id: id}})

        if (!userRelation?.user_relation_id) return response.status(400).json({error: "ID IS NOT VALID"})

        await prismaClient.userRelations.delete({
            where: {
                user_relation_id: id
            }
        })

        return response.status(200).json({deleted: true})
    }

}