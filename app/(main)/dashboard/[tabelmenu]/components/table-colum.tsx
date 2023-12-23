'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { PesertaData } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

export const ColumnTable:ColumnDef<PesertaData>[] =[
    {
        id: "select",
        header: ({table}) =>(
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() || 
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Pilih semua"
            />
        ),

        cell: ({row}) =>{
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        },
        enableSorting: false,
        enableHiding: false
    },{
        accessorKey: "noPeserta",
        header: "No Peserta",
        cell: ({row}) =>{
            <div
                className="capitalize"
            >
                { row.getValue("noPeserta")}
            </div>
        }
    },{
        accessorKey: "pos",
        header: "Pos"
    }, {
        accessorKey: "waktu",
        header: "Waktu"
    }, {
        accessorKey: "aksi",
        header: "Opsi"
    }

]