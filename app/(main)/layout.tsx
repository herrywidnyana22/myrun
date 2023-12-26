import userMenu from "@/hooks/useMenu"
import GroupInputPeserta from "./dashboard/components/dashboard-inputPesertaGroup"
import MenuDashboard from "./dashboard/components/dashboard-menu"
import { getKategoriUser } from "@/actions/kategori/get"
import { UserKategori } from "@/types"

const MainLayout = async({
    children
}:{
    children: React.ReactNode
}) =>{
    const userKategori = await getKategoriUser()

    const menuPanitia = userKategori.flatMap((item) => 
      item.pos.map((posItem) => ({
          label: posItem.kategori.namaKategori,
          href: `/dashboard/${posItem.kategori.namaKategori.toLowerCase()}`,
          active: `/dashboard/${posItem.kategori.namaKategori.toLowerCase()}`
      })
    ))

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