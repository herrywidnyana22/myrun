import GroupInputPeserta from "../components/dashboard-inputPesertaGroup";
import TableContent from "./components/table";

import { getPos, getPosName } from "@/actions/pos/get";
import { getPeserta } from "@/actions/peserta/get";
import { Suspense } from "react";
import { SkeletonDemo } from "./components/table-skeleton";

interface MainPageProps{
    params:{
        tabelmenu: string
    }
}

const MainPage = async({params}: MainPageProps) => {
    const dataPeserta = await getPeserta(params.tabelmenu)
    const getPosID = await getPosName(params.tabelmenu)
    const getPosData =  await getPos(params.tabelmenu)

    return (
        <>
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