"use server"

import { db } from "@/lib/db"
import { Role } from '@prisma/client';

import bcrypt from 'bcrypt';

export const getLoginUser = async(username: string, password: string) =>{
    try {
        const user = await db.panitia.findUnique({
            where:{
                username
            }
        })

        if (!user || !user?.hashPassword) {
            throw new Error("Invalid username..!")
        }

        const isPasswordTrue = await bcrypt.compare(
            password,
            user.hashPassword
        )

        if(!isPasswordTrue){
            throw new Error("Invalid password..!")
        }


        const sessionUser = {
            id: user.id,
            name: user.username,
            image: user.image,
            role: user.role as Role
        }

        return sessionUser
                
    } catch (error) {
        throw new Error("Login gagal, ada kesalahan...")
    }
}
