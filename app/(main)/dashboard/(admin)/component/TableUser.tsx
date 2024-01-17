'use client'

import { TableProps } from "@/types";

const TableUser = ({data, currentUser}: TableProps) => {
    console.log({currentUser})
    return (
        <div>
            {"User" + currentUser.role}
        </div>
    );
}
 
export default TableUser;