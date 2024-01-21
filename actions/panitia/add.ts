'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { AlertMessage, CustomError, respon } from "@/types";

import bcrypt from "bcrypt"
import { Role } from "@prisma/client";

export async function addPanitia(data: any){


//   data: '{"nama":"made testing","username":"testing","password":"Hehehe12345","confPassword":"Hehehe12345","role":"PANITIA"}'
    try {

        const {
            nama,
            username,
            password,
            confPassword,
            role,
        } = data

        console.log({nama})
        console.log({username})
        console.log({password})
        console.log({confPassword})
        console.log({role})


        let {namaKategori, posId} = data
        let addPanitia

        
        if (role === Role.ADMIN){
            if(!nama || !username || !password) {
                throw respon(400, 'error', 'Missing info')
            }
        }
        
        if (role === Role.PANITIA){ 
            if(!nama || !username || !password || !namaKategori || !posId){
                throw respon(400, 'error', 'Missing info')
            }
        }
        
        if (password !== confPassword) {
            throw respon(422, 'error', "Password dan confirm password tidak sama")
        }
        const hashedPass = await bcrypt.hash(password, 12)
        
        const cekData = await db.panitia.findUnique({
            where:{
                username: username
            }
        })

        if(cekData) {
            throw respon(409, 'error', "Username sudah terdaftar")
        }
        

        if(role === 'ADMIN') {

            addPanitia = await db.panitia.create({
                data: {
                    namaPanitia: nama,
                    username: username,
                    role: role,
                    hashPassword: hashedPass,
                    image: "null"
                }
            });
        } else {
            // Find existing kategori and pos records based on their IDs
            const existingKategori = await db.kategori.findMany({
                where: {
                    id: { in: namaKategori }
                }
            });

            const existingPos = await db.pos.findMany({
                where: {
                    id: { in: posId }
                }
            });

            // Check if all required kategori and pos records were found
            if (existingKategori && existingKategori.length !== namaKategori.length || existingPos.length !== posId.length) {
                throw respon(404, 'error', 'One or more required kategori or pos records not found');
            }

            addPanitia = await db.panitia.create({
                data: {
                    namaPanitia: nama,
                    username: username,
                    role: role,
                    hashPassword: hashedPass,
                    image: "null",
                    pos: {
                        connect: existingPos.map(pos => ({ 
                            id: pos.id 
                        }))
                    }
                },
                include: {
                    pos: true,
                }
            });
        }

        revalidatePath("/dashboard/")

        return respon(200,  'ok', AlertMessage.addSuccess, addPanitia)
        

    } catch (error:any) {
        if (error instanceof CustomError) {
            return respon(500, 'error', "Server Error...!")
        } else{
            return error
        }
    }
}