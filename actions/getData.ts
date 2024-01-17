import { PrismaClient, Role } from "@prisma/client"
// import getCurrentUser from "./getCurrentUser"
import { adminUser } from "@/app/initUser"
import { db } from "@/lib/db"


const getDataByMenu = async(menu: keyof PrismaClient | any) => {
    let data: any[]= []
    // const currentUser = await getCurrentUser()
    const role = adminUser.role

    if (role === Role.ADMIN) {
        try {
            switch (menu) {
                case "kategori":
                    data = await db.kategori.findMany({
                        include:{
                            pos:{
                                select:{
                                    id: true,
                                    namaPos: true,
                                    posFinish: true,
                                    panitia:{
                                        select:{
                                            id:true,
                                            namaPanitia: true
                                        }
                                    }
                                },
                                orderBy: {
                                    namaPos: 'asc'
                                }
                            },
                        }
                    })
                    break
                
                case "panitia":
                    data = await db.panitia.findMany({
                        select:{
                            id:true,
                            namaPanitia: true,
                            username: true,
                            role: true,
                            image: true,
                            pos:{
                                select:{
                                    id: true,
                                    namaPos: true,
                                    kategori: {
                                        select: {
                                            id: true,
                                            namaKategori: true
                                        }
                                    }
                                }
                            }
                        }
                    })
                break

                case "peserta":
                    data = []
                break
                    
                default:
                    break;
            }
    
            
            return data
    
        } catch (error) {
            return []
        }
    }

}


export default getDataByMenu