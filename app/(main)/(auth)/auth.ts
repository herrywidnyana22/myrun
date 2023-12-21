import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '../../../auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getLoginUser } from '../../../actions/auth/get';
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from '../../../lib/db';
import { Role } from '@prisma/client';

const login = async(credentials: any) =>{
    try {
        const user = await db.panitia.findUnique({
            where:{
                username: credentials.username
            }
        })

        if (!user || !user?.hashPassword) {
            throw new Error("Invalid username..!")
        }

        const isPasswordTrue = await bcrypt.compare(
            credentials.password,
            user.hashPassword
        )

        if(!isPasswordTrue){
            throw new Error("Invalid password..!")
        }


        // const sessionUser = {
        //     id: user.id,
        //     name: user.username,
        //     image: user.image,
        //     role: user.role as Role
        // }

        return user
                
    } catch (error) {
        throw new Error("Login gagal, ada kesalahan...")
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            // name: 'credentials',
            // credentials: {
            //     username: { label: 'username', type: 'text' },
            //     password: { label:'password',type: 'password' }
            // },
            async authorize(credentials) {
                try {
                    const actionLogin =  await login(credentials)
                    return actionLogin
                } catch (error) {
                    return null
                }
            }
        })
    ],
});