import GroupInputPeserta from "../components/dashboard-inputPesertaGroup";
import CardGroup from "../components/dashboard-card";
import Datatable from "../(panitia)/components/datatable";
import TableUser from "../(admin)/component/TableUser";
import TablePeserta from "../(admin)/component/TablePeserta";
import TableKategori from "../(admin)/component/TableKategori";
import getDataByMenu from "@/actions/getData";

import { getPos, getPosName } from "@/actions/pos/get";
import { getPeserta } from "@/actions/peserta/get";
import { Suspense, createElement } from "react";
import { SkeletonDemo } from "../(panitia)/components/table-skeleton";
import { adminUser, panitiaUser } from "@/app/initUser";
import { Role } from "@prisma/client";

interface MainPageProps{
    params:{
        tabelmenu: string
    }
}

const TableComponent: any = {
  user: TableUser,
  peserta: TablePeserta,
  kategori: TableKategori,
}

const MainPage = async({params}: MainPageProps) => {
    const dataPeserta = await getPeserta(params.tabelmenu)
    const userPos = await getPosName(params.tabelmenu)
    const getPosData =  await getPos(params.tabelmenu)

    const userRole = panitiaUser.role
    const currentUser = adminUser

    const data = await getDataByMenu(params.tabelmenu)


    return (
        <div
            className="
                grid
                grid-cols-3
                gap-4
            "
        >
            <div className="col-span-2">
            {
                userRole === Role.ADMIN && 
                (
                    // (typeof TableComponent[params.tabelmenu] !== "undefined") && data && data.length > 0 
                    // ? createElement(TableComponent[params.tabelmenu], {data, currentUser})
                    // : null

                    (typeof TableComponent[params.tabelmenu] !== "undefined") && createElement(TableComponent[params.tabelmenu], {data, currentUser})
                )
            }
            {
                userRole === Role.PANITIA &&
                <Datatable
                    dataTable={dataPeserta}
                    posData={getPosData}
                    userPos={userPos}
                />

            }
            </div>

            
            {
                userRole === Role.PANITIA &&
                <div className="space-y-4 col-span-1">
                    <CardGroup data={dataPeserta}/>
                    <GroupInputPeserta 
                        userKategori={params.tabelmenu}
                        userPos = {userPos} 
                    />
                </div>
            }
            
        </div>
    )
}
 
export default MainPage;