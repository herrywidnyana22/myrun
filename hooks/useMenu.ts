'use client'

import { getKategoriUser } from '@/actions/kategori/get'
import { UserKategori } from '@/types'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'


const userMenu = async() => {
    const pathName = usePathname()
    const userKategori = await getKategoriUser()
    
    const menuItem:UserKategori[] = userKategori
    const menuPanitia = useMemo(() =>
        menuItem && menuItem.flatMap((item: any) => 
            item.pos.map((posItem: any) => ({
                label: posItem.kategori.namaKategori,
                href: `/dashboard/${posItem.kategori.namaKategori.toLowerCase()}`,
                active: pathName === `/dashboard/${posItem.kategori.namaKategori.toLowerCase()}`
            }))
    ), [menuItem, pathName])

    return menuPanitia
}

export default userMenu
