'use client'

import { TableProps } from "@/types";

const TableKategori = ({data, currentUser}: TableProps) => {
    console.log({currentUser})

    return (
        <div>
            {"Katgeori " + currentUser.role}
        </div>
    );
}
 
export default TableKategori;