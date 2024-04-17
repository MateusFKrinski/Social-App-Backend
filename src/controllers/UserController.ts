import {Request, Response} from "express";
import prismaClient from "../database/prismaClient";
import {hashSync} from "bcrypt";
import {$Enums} from ".prisma/client";

type UserDataType = {
    id?: string
    full_name: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    created_at?: Date | string
    updated_at?: Date | string | null
}

export class UserController {
    async create(request: Request, response: Response) {
        const {full_name, username, email, password}: UserDataType = request.body

        if (!full_name) return response.status(400).json({error: "FULL NAME IS UNDEFINED"})
        if (!username) return response.status(400).json({error: "USERNAME IS UNDEFINED"})
        if (!email) return response.status(400).json({error: "EMAIL IS UNDEFINED"})
        if (!password) return response.status(400).json({error: "PASSWORD IS UNDEFINED"})

        const userEmailIfExists = await prismaClient.user.findUnique({where: {user_email: email}})
        const userUsernameIfExists = await prismaClient.user.findUnique({where: {user_username: username}})

        if (!!userEmailIfExists?.user_email) return response.status(400).json({error: "THIS EMAIL ALREADY EXISTS"})
        if (!!userUsernameIfExists?.user_username) return response.status(400).json({error: "THIS USERNAME ALREADY EXISTS"})

        const hashedPassword = hashSync(password, 10)

        const user = await prismaClient.user.create({
            data: {
                user_full_name: full_name,
                user_username: username,
                user_email: email,
                user_password: hashedPassword,
            },
        })

        return response.status(201).json(user)
    }

    async read(request: Request, response: Response) {
        const id = request.params.id
        const user = await prismaClient.user.findUnique({where: {user_id: id}})

        if (!user?.user_id) return response.status(404).json({error: "ID IS NOT VALID"})

        const userData = {
            user_id: user?.user_id,
            user_email: user?.user_email,
            user_username: user?.user_username,
            user_full_name: user?.user_full_name,
            user_role: user?.user_role,
            user_created_at: user?.user_created_at,
            user_updated_at: user?.user_updated_at
        }

        return response.status(200).json(userData)
    }

    async update(request: Request, response: Response) {
        const id = request.params.id
        const {full_name, username}: UserDataType = request.body
        const user = await prismaClient.user.findUnique({where: {user_id: id}})

        if (!user?.user_id) return response.status(404).json({error: "ID IS NOT VALID"})

        if (full_name && !user?.user_full_name) return response.status(400).json({error: "FULL NAME IS NOT VALID"})
        if (username && !user?.user_username) return response.status(400).json({error: "USERNAME IS NOT VALID"})

        const updatedUser = await prismaClient.user.update({
            where: {
                user_id: id
            },
            data: {
                user_full_name: !!full_name ? full_name : user?.user_username,
                user_username: !!username ? username : user?.user_username,
                user_updated_at: new Date()
            }
        })

        return response.status(200).json(updatedUser)
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id
        const user = await prismaClient.user.findUnique({where: {user_id: id}})

        if (!user?.user_id) return response.status(400).json({error: "ID IS NOT VALID"})

        await prismaClient.user.delete({
            where: {
                user_id: id
            }
        })

        return response.status(200).json({deleted: true})
    }
}