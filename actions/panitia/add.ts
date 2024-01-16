'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { AlertMessage } from "@/types";

import bcrypt from "bcrypt"

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
        let {namaKategori, posId} = data
        let addPanitia

        console.log(data)
        console.log(data.nama)
        console.log({username})
        console.log({password})
        console.log({confPassword})
        console.log({role})
        console.log({namaKategori})
        console.log({posId})
        
        
        if (!nama || !username || !password || !namaKategori || !posId) throw new Error('Missing info')
        
        if (password !== confPassword) {
            throw new Error("Password dan confirm password tidak sama")
        }
        const hashedPass = await bcrypt.hash(password, 12)
        
        const cekData = await db.panitia.findUnique({
            where:{
                username: username
            }
        })

        if(cekData) {
            throw new Error("Username sudah terdaftar")
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
                throw new Error('One or more required kategori or pos records not found');
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

        return { 
            data: addPanitia, 
            msg: AlertMessage.addSuccess,
            status: 200
        }

    } catch (error:any) {
        return{
            msg: error.message
        }
    }

   
}