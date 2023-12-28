'use client'

import CardItem from "@/components/CardItem";
import { PesertaData } from "@/types";
import { Flag, Footprints, Medal, Timer } from "lucide-react";
import { useState } from "react";

interface cardGroupProps{
    data: PesertaData[]
}

const  CardGroup= ({data}: cardGroupProps) => {
    const [totalPeserta, setTotalPeserta] = useState(data ? data.length : 0)
    const [fastestLap, setFastestLap] = useState<PesertaData[] | null >(null)

    const convertTimeToSortableFormat = (time: any) => {
        // Implementasi logika konversi waktu ke bilangan bulat di sini
        // Misalnya, Anda dapat mengonversi waktu ke dalam jumlah milidetik.
        return time === ":::" ? Infinity : Date.parse(`1970-01-01T${time}`);
    };

    // Urutkan array data berdasarkan waktu yang telah diubah
    const sortedData = data.sort((a, b) => {
        const timeA = convertTimeToSortableFormat(a.waktu);
        const timeB = convertTimeToSortableFormat(b.waktu);
        return timeA - timeB
    })

    const fastestPesertaData = sortedData[0]

    // {
    //     "id": "652992ae7a99922ac1b5ec62",
    //     "noPeserta": "2",
    //     "waktu": "0",
    //     "kategori": {
    //         "id": "649150ddee778183c0079cee",
    //         "namaKategori": "Remaja"
    //     },
    //     "pos": [
    //         {
    //             "id": "649150ddee778183c0079cef",
    //             "namaPos": "Pos 3"
    //         }
    //     ]
    // }

    return (
        <div    
            className="
                grid
                grid-cols-2
                gap-4
            "
        >
            <CardItem
                title="Top 1"
                value={fastestPesertaData ? fastestPesertaData.noPeserta : "Belum ada yg finish"}
                icon={<Medal className="w-[30px] h-[30px]"/>}
            />
            <CardItem
                title="Best Time"
                value={fastestPesertaData ? fastestPesertaData.waktu : "Belum ada yg finish"}
                icon={<Timer className="w-[30px] h-[30px]"/>}
            />
            <CardItem
                title="Total Peserta"
                value={totalPeserta}
                icon={<Footprints className="w-[30px] h-[30px]"/>}
            />
            <CardItem
                title="Pesera Finish"
                value={totalPeserta}
                icon={<Flag className="w-[30px] h-[30px]"/>}
                desc="ini adalaha desk"
            />
        </div>
    );
}
 
export default CardGroup;