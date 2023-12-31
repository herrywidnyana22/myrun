import MenuDashboard from "./dashboard/components/dashboard-menu"

import { getPosName } from "@/actions/pos/get"
import { getKategoriUser } from "@/actions/kategori/get"


interface MainLayoutProps{
    params:{
        tabelmenu: string
    }
    children: React.ReactNode
}

const MainLayout = async({
    children,
    params
}: MainLayoutProps)  =>{
    const userKategori = await getKategoriUser()
    

    const menuPanitia = userKategori.flatMap((item) => 
      item.pos.map((posItem) => ({
          label: posItem.kategori.namaKategori,
          href: `/dashboard/${posItem.kategori.namaKategori.toLowerCase()}`,
          active: `/dashboard/${posItem.kategori.namaKategori.toLowerCase()}`
      })
    ))

    const userPos = await getPosName(params.tabelmenu)

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
        <MenuDashboard userMenu = {menuPanitia}/>
        { children }
      </div>
          
    )
}

export default MainLayout