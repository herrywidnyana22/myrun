'use client'

import { TableProps } from "@/types";

const TablePeserta = ({data, currentUser}: TableProps) => {
    console.log({currentUser})

    return (
        <div>
            {"User" + currentUser.role}
        </div>
    );
}
 
export default TablePeserta;