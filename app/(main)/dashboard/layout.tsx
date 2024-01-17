import MenuDashboard from "./components/dashboard-menu"

import { getPosName } from "@/actions/pos/get"
import { getKategoriUser } from "@/actions/kategori/get"
import { adminUser, panitiaUser } from "@/app/initUser"
import { Role } from "@prisma/client"


interface MainLayoutProps{
    params:{
        tabelmenu: string
    }
    children: React.ReactNode
}

const user = panitiaUser

const MainLayout = async({
    children,
    params
}: MainLayoutProps)  =>{
    const userKategori = await getKategoriUser()

    const homeMenu = [{
      label: "Home",
      href: "/dashboard",
      active: "/dashboard"
    }]
    
    const menuAdmin = [
      {
        label: "User",
        href: "/dashboard/user",
        active: "/dashboard/user"
      }, {
        label: "Kategori",
        href: "/dashboard/kategori",
        active: "/dashboard/kategori"
      }, {
        label: "Peserta",
        href: "/dashboard/peserta",
        active: "/dashboard/peserta"
      }, 
    ]

    const menuPanitia = userKategori.flatMap((item) => 
      item.pos.map((posItem) => ({
          label: posItem.kategori.namaKategori,
          href: `/dashboard/${posItem.kategori.namaKategori.toLowerCase()}`,
          active: `/dashboard/${posItem.kategori.namaKategori.toLowerCase()}`
      })
    ))

    let menuItem

    if(user.role === Role.ADMIN){
      menuItem = [...homeMenu, ...menuAdmin]
    } else if (user.role === Role.PANITIA){
      menuItem = [...homeMenu, ...menuPanitia]
    } else {
      return null
    }

    return(
      
      <div
        className="
          relative
          h-auto
          mx-auto
          space-y-4
          items-center
          gap-4
          p-4
          px-8
          md:max-w-screen-2xl
        "
      >
        <MenuDashboard userMenu = {menuItem}/>
        { children }
      </div>
          
    )
}

export default MainLayout