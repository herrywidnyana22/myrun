import GroupInputPeserta from "../components/dashboard-inputPesertaGroup";
import TableContent from "./components/table";
import MenuDashboard from "../components/dashboard-menu";

import { getPos, getPosName } from "@/actions/pos/get";
import { getPeserta } from "@/actions/peserta/get";
import { Suspense } from "react";
import { SkeletonDemo } from "./components/table-skeleton";
import { getKategoriUser } from "@/actions/kategori/get"

interface MainPageProps{
    params:{
        tabelmenu: string
    }
}

const MainPage = async({params}: MainPageProps) => {
    const dataPeserta = await getPeserta(params.tabelmenu)
    const getPosID = await getPosName(params.tabelmenu)
    const getPosData =  await getPos(params.tabelmenu)
    const userKategori = await getKategoriUser()

    const menuPanitia = userKategori.flatMap((item) => 
      item.pos.map((posItem) => ({
          label: posItem.kategori.namaKategori,
          href: `/dashboard/${posItem.kategori.namaKategori.toLowerCase()}`,
          active: `/dashboard/${posItem.kategori.namaKategori.toLowerCase()}`
      })
    ))

    return (
        <>
            <MenuDashboard userMenu = {menuPanitia}/>
            <Suspense
                fallback={<SkeletonDemo/>}
            >
                <TableContent
                    dataTable={dataPeserta}
                    posData={getPosData}
                    userPos={getPosID}
                />
            </Suspense>

            {/* INPUT GROUP */}
            <GroupInputPeserta/>
        </>
    )
}
 
export default MainPage;