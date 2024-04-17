import {Request, Response} from "express";
import prismaClient from "../database/prismaClient";
import {compare} from "bcrypt";
import {sign, verify} from "jsonwebtoken";

type TokenPayload = {
    id: string,
    iat: number,
    exp: number
}

export class AuthController {
    async getAuth(request: Request, response: Response) {
        const {email, password} = request.body

        if (!email) return response.status(400).json({error: "EMAIL IS UNDEFINED"})
        if (!password) return response.status(400).json({error: "PASSWORD IS UNDEFINED"})

        const user = await prismaClient.user.findUnique({where: {user_email: email}})

        if (!user) return response.status(404).json({error: "USER NOT FOUND"})

        const isValidPassword = await compare(password, user.user_password)

        if (!isValidPassword) return response.status(400).json({error: "INVALID PASSWORD"})

        const token = sign({id: user.user_id}, "63c9db6295112d0d983b848efe53420d", {expiresIn: "1d"})

        return response.status(200).json({user: {id: user.user_id, email}, token})
    }

    async getUserByToken(request: Request, response: Response) {
        const {token} = request.body

        if (!token) return response.status(400).json({error: "TOKEN IS UNDEFINED"})

        const decoded = verify(token, "63c9db6295112d0d983b848efe53420d")
        const {id} = decoded as TokenPayload

        const user = await prismaClient.user.findUnique({where: {user_id: id}})

        if (!user) return response.status(400).json({error: "TOKEN IS NOT VALID"})

        return response.status(200).json({id, email: user.user_email})
    }
}