import {Response, Request} from "express";
import prismaClient from "../database/prismaClient";
import {ValidateDate} from "../utils/DateHandling";

type userProfileDataType = {
    id?: string
    father_id: string
    avatar?: Buffer | null
    bio?: string | null
    birth: string
    phone: string
    active?: boolean
    gender: "M" | "F" | "N" | "O"
    created_at?: Date | string
    updated_at?: Date | string | null
};

export class UserProfileController {
    async create(request: Request, response: Response) {
        const {
            avatar,
            bio,
            birth,
            father_id,
            gender,
            phone,
        }: userProfileDataType = request.body
        const user = await prismaClient.user.findUnique({where: {user_id: father_id}})
        const userProfileExistent = await prismaClient.userProfile.findUnique({where: {user_profile_father_id: father_id}})

        if (!birth) return response.status(400).json({error: "BIRTH IS UNDEFINED"});
        if (!father_id)
            return response.status(400).json({error: "FATHER PROFILE IS UNDEFINED"});
        if (!gender) return response.status(400).json({error:"GENDER IS UNDEFINED"});
        if (!phone) return response.status(400).json({error: "PHONE IS UNDEFINED"});
        if (userProfileExistent?.user_profile_id) return response.status(400).json({error: "FATHER ID IS NOT VALID"})
        if (!user?.user_id) return response.status(400).json({error:"USER ID IS NOT VALID"});
        if (!ValidateDate(birth)) return response.status(400).json({error: "BIRTH IS INVALID"});
        if (avatar && !Buffer.isBuffer(avatar))
            return response.status(400).json({error: "AVATAR BUFFER IS NOT VALID"});

        const userProfile = await prismaClient.userProfile.create({
            data: {
                user_profile_avatar: avatar,
                user_profile_bio: bio,
                user_profile_birth: new Date(birth),
                user_profile_father_id: father_id,
                user_profile_gender: gender,
                user_profile_phone: phone,
            },
        });

        return response.status(201).json(userProfile);
    }

    async read(request: Request, response: Response) {
        const id = request.params.id
        const userProfile = await prismaClient.userProfile.findUnique({where: {user_profile_id: id}})

        if (!userProfile?.user_profile_id) return response.status(400).json({error: "ID IS NOT VALID"})

        return response.status(200).json(userProfile)
    }

    async update(request: Request, response: Response) {
        const id = request.params.id
        const {avatar, bio, gender} = request.body
        const userProfile = await prismaClient.userProfile.findUnique({where: {user_profile_id: id}})

        if (!userProfile?.user_profile_id) return response.status(400).json({error: "ID IS NOT VALID"})
        if (avatar && !Buffer.isBuffer(avatar)) return response.status(400).json({error: "AVATAR BUFFER IS NOT VALID"});

        const updatedUserProfile = await prismaClient.userProfile.update({
            where: {
                user_profile_id: id
            },
            data: {
                user_profile_avatar: !!avatar ? avatar : userProfile?.user_profile_avatar,
                user_profile_bio: !!bio ? bio : userProfile?.user_profile_bio,
                user_profile_gender: !!gender ? gender : userProfile?.user_profile_gender,
                user_profile_updated_at: new Date()
            }
        })

        return response.status(200).json(updatedUserProfile)
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id
        const userProfile = await prismaClient.userProfile.findUnique({where: {user_profile_id: id}})

        if (!userProfile?.user_profile_id) return response.status(400).json({error: "ID IS NOT VALID"})

        const deletedUserProfile = await prismaClient.userProfile.delete(
            {
                where: {
                    user_profile_id: id
                }
            }
        )

        return response.status(200).json({deleted: true})
    }
}
