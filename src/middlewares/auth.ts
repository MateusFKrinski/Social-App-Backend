import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";

type TokenPayload = {
    id: string,
    iat: number,
    exp: number
}

export function AuthMiddleware(
    request: Request, response: Response, next: NextFunction
) {
    const {authorization} = request.headers

    if (!authorization) response.status(401).json({error: "TOKEN NOT PROVIDED"})

    // @ts-ignore
    const [, token] = authorization.split("")

    try {
        const decoded = verify(token, "63c9db6295112d0d983b848efe53420d")
        const {id} = decoded as TokenPayload

        request.userId = id

        next()
    } catch (error) {
        return response.status(401).json({error: "TOKEN INVALID"})
    }
}