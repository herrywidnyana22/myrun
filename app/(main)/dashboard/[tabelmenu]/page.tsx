import GroupInputPeserta from "../components/dashboard-inputPesertaGroup";
import TableContent from "./components/table";
import CardGroup from "../components/dashboard-card";

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
        <div
            className="
                grid
                grid-cols-3
                gap-4
            "
        >
            <Suspense
                fallback={<SkeletonDemo/>}
            >
                <div className="col-span-2">
                    <TableContent
                        dataTable={dataPeserta}
                        posData={getPosData}
                        userPos={getPosID}
                    />
                </div>
            </Suspense>

            {/* INPUT GROUP */}
            <div className="space-y-4 col-span-1">
                <CardGroup data={dataPeserta}/>
                <GroupInputPeserta menu={params.tabelmenu}/>
            </div>
        </div>
    )
}
 
export default MainPage;