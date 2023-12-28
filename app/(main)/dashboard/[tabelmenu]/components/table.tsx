"use client"
 
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, CheckCircle2, ChevronDown, Minus, MoreHorizontal, PenIcon, Pencil, Trash2 } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCallback, useState } from "react"
import { AlertMessage, PesertaData, UserPos, posData } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { checkedDelete } from "@/actions/peserta/delete"

interface TableContentProps{
  dataTable: PesertaData[]
  posData: posData[]
  userPos: any
}

const TableContent = ({dataTable, userPos, posData}: TableContentProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [editMode, setEditMode] = useState<number | null>(null)

  // check state
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  
    // delete state
  const [checkAll, setCheckAll] = useState<string[]>([])
  const [selectedDelete, setSelectedDelete] = useState<number | null>()
  

  const posID = userPos.id
  
  const posColumns: ColumnDef<PesertaData>[] = posData.map((posItem) => ({
    id: posItem.namaPos,
    header: posItem.namaPos,
    cell: ({ row }) => (
      <div>
        {row.original.pos
          .filter((posData) => posData.id === posItem.id)
          .map((posData) => (
            <div key={posData.id}>
              {
                posData.id
                ? <CheckCircle2 className="w-4 h-4 text-neutral-500"/>
                : <Minus className="w-4 h-4 text-neutral-500"/>
              }
            </div>
          ))}
      </div>
    ),
  }));

  // Delete prosedure
    const oncheckAll = useCallback(() =>{
        setIsCheckAll(!isCheckAll)
        setCheckAll(
            isCheckAll 
            ? [] 
            : dataTable 
                ? dataTable
                    .filter((item: any) => item.pos.some((posItems:any) => posItems.id === posID))
                    .map((item: any) => item.id)
                : []
        )
        
    },[dataTable, isCheckAll, posID])
    
   
    const onSingleCheck = (value: boolean, itemId: string) => {
        const isChecked = value
        if (isChecked) {
            setCheckAll((prevItems) => [...prevItems, itemId]);
        } else {
            setCheckAll((prevItems) => prevItems.filter((id) => id !== itemId));
        }
    }
    
    // use patch because bring more than 1 iD
    const onDeleteChecked = async() =>{
        setIsLoading(true)

        // await axios
        // .patch(`/api/peserta`, {data: checkAll, posId: posId.id})
        // .then (() => {
        //     toast.success(AlertMessage.removeSuccess) 
        //     mutate(menu) 
        //     router.refresh()
        // })
        // .catch (() =>{
        //     toast.error(AlertMessage.removeFailed)
        // })
        // .finally(() => {
        //     setIsLoading(false)
        //     setSelectedDelete(null)
        //     setCheckAll([])
        // })

        try {
          const responDelete = await checkedDelete(checkAll, posID)
          if(responDelete){
            toast.success(AlertMessage.removeSuccess)
          }
        } catch (error) {
          toast.error(AlertMessage.removeFailed)
        } finally{
          setIsLoading(false)
        }
    }

  const columns: ColumnDef<PesertaData>[] = 
  [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            oncheckAll()
            table.toggleAllPageRowsSelected(!!value)
          }}
          // onChange={oncheckAll}
        />
      ),
      cell: ({ row }) => {
        const pesertaData = row.original
        if(pesertaData.pos.some((item: any) => item.id === posID)) {
          return (
            <Checkbox
              checked={row.getIsSelected()}
              // onChange={(e) => onSingleCheck(e, pesertaData.id)} 
              onCheckedChange={(value) => {
                row.toggleSelected(!!value)
                onSingleCheck(value, pesertaData.id)
              }}
            />
          )
        } 
        
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "noPeserta",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No Peserta
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => 
        <div 
          className="
            font-bold
            ml-4
        ">
            { row.getValue("noPeserta")}
        </div>
    },
    ...posColumns,
    {
      accessorKey: "waktu",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Waktu
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("waktu")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
  
      cell: ({row}) => {
        const dataRow = row.original
        if (dataRow.pos.some(pos => pos.id === posID)){
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  className="
                    space-x-1
                    cursor-pointer
                    text-neutral-600
                    hover:text-white
                    hover:bg-gray-400
                  "
                  onClick={() => navigator.clipboard.writeText(dataRow.id)}
                >
                  <Pencil
                    className="
                      w-3
                      h-3
                    "
                  />
                  <p>{`Ubah peserta ini ${dataRow.id}`}</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="
                      space-x-1
                      cursor-pointer
                      text-neutral-600
                      hover:text-white
                      hover:bg-gray-400
                  "
                >
                  <Trash2
                    className="
                      w-3
                      h-3
                    "
                  />
                  <p>Delete peserta ini</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
        
        return null
      },
    },
  ]

  const table = useReactTable({
      data: dataTable,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
  })


  

    // const onSingleDelete =async(id: string, i: number) => {
    //     setIsLoading(true)
    //     setSelectedDelete(i)
    //     const pesertaId = id

    //     await axios.delete(`/api/peserta/${pesertaId}`)
    //     .then (() => {
    //         toast.success(AlertMessage.removeSuccess)
    //         mutate(menu) 
    //         router.refresh()
    //     })
    //     .catch (() =>{
    //         toast.error(AlertMessage.removeFailed)
    //     })
    //     .finally(() => {
    //         setIsLoading(false)
    //         setSelectedDelete(null)
    //         setEditMode(null)
    //     })
    
    // }


  return (
    <>
      
      
        <div 
            className="
                w-full
                p-4
                shadow-md
                rounded-lg
                bg-white
        ">
            <h1
                className="
                    font-bold
                    text-lg
                    tetx-neutral-700
                "
            >
                Menu title
                <div>
                  {JSON.stringify(checkAll)}
                  {/* {JSON.stringify(dataTable)} */}
                </div>
            </h1>
            <div 
              className="
                flex 
                items-center 
                py-4
              "
            >
              <Input
                  placeholder="Cari no peserta..."
                  value={(table.getColumn("noPeserta")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                      table.getColumn("noPeserta")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
              />
              <div
                className="
                  w-full
                  flex
                  gap-2
                  items-center
                  justify-end
                "
              >
                <div 
                  className="
                    w-full
                    text-right
                    cursor-pointer
                    text-sm
                    text-neutral-600
                  "
                >
                  <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                      table.setPageSize(Number(e.target.value))
                    }}
                  >
                    {[5, 10, 20, 30, 50].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                          Filter 
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                  column.toggleVisibility(!!value)
                                }
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                   )}
                                </TableHead>
                            )
                            })}
                        </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                           
                          >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell 
                                  key={cell.id}
                                >
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                </TableCell>
                
                            ))}
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                          >
                            No results.
                          </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div 
              className="
                flex 
                items-center 
                justify-end 
                space-x-2 
                py-4
            ">
                <div className="flex-1 text-sm text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length} / {" "}
                  {table.getFilteredRowModel().rows.length} ditandai.
                </div>
                <div className="flex gap-2">
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                  >
                      Previous
                  </Button>
                  <span 
                    className="
                      flex 
                      items-center 
                      gap-1 
                      text-sm
                  ">
                    <strong>
                      {table.getState().pagination.pageIndex + 1} /{' '}
                      {table.getPageCount()}
                    </strong>
                  </span>
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                  >
                      Next
                  </Button>
                </div>
            </div>
            <div>
              {
                // (table.getIsAllPageRowsSelected() || 
                // table.getIsSomePageRowsSelected()) && 
                checkAll.length > 0 &&
                (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={onDeleteChecked}
                  >
                    <Trash2
                      className="w-4 h-4"
                    />
                  </Button>
                )
              }
            </div>
        </div>
    </>
  )
}

export default TableContent
