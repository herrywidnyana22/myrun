import { getPeserta } from "@/actions/peserta/get";
import GroupInputPeserta from "../components/dashboard-inputPesertaGroup";
import TableContent from "./components/table";

interface MainPageProps{
    params:{
        // sesuai nama folder siku
        tabelmenu: string
    }
}

const MainPage = async({params}: MainPageProps) => {
    const dataPeserta = await getPeserta(params.tabelmenu)
    console.log(dataPeserta)
    return (
        <>
            {JSON.stringify(dataPeserta)}
            <TableContent
                dataTable={dataPeserta!}
            />

            {/* INPUT GROUP */}
            <GroupInputPeserta/>
        </>
    )
}
 
export default MainPage;