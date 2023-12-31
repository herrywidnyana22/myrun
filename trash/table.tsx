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
import { ArrowUpDown, Check, CheckCircle2, ChevronDown, Loader2, Minus, MoreHorizontal, Pencil, Trash2, X } from "lucide-react"
 
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
import { ElementRef, useCallback, useEffect, useRef, useState } from "react"
import { AlertMessage, PesertaData, UserPos, posData } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { checkedDelete, singleDeleted } from "@/actions/peserta/delete"
import { useFormStatus } from "react-dom"
import { cn } from "@/lib/utils"
import InputForm from "@/components/form/inputForm"
import { existValidate } from "@/lib/validate"

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
  const [pesertaData, setPesertaData] = useState(dataTable)

  const [pesertaEdited, setPesertaEdited] = useState<any>()
  const [noPesertaTest, setNoPesertaTest] = useState<any>()
  // check state
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  // validate state
  const [validateMsg, setValidateMsg] = useState()
  const [duplicateMsg, setDuplicatMsg] = useState()
  const [isEmpty, setIsEmpty] = useState(false)
  
    // delete state
  const [checkAll, setCheckAll] = useState<string[]>([])
  
  const posID = userPos.id

  // const refForm = useRef<ElementRef<"form">>(null)
  // const refInput = useRef<ElementRef<"input">>(null)
  const refForm = useRef<{ [key: string]: HTMLFormElement | null }>({});
  const refInput = useRef<{ [key: string]: HTMLInputElement | null }>({});
  
  const posColumns: ColumnDef<PesertaData>[] = posData.map((posItem) => ({
    id: posItem.namaPos,
    header: posItem.namaPos,
    cell: ({ row }) => (
      <div>
        {
          row.original.pos
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
  }))

  // Delete prosedure
  const oncheckAll = useCallback(() =>{
      setIsCheckAll(!isCheckAll)
      setCheckAll(
          isCheckAll 
          ? [] 
          : pesertaData 
              ? pesertaData
                  .filter((item: any) => item.pos.some((posItems:any) => posItems.id === posID))
                  .map((item: any) => item.id)
              : []
      )
      
  },[pesertaData, isCheckAll, posID])
  
  
  const onSingleCheck = (value: any, itemId: string) => {
      const isChecked = value
      if (isChecked) {
          setCheckAll((prevItems) => [...prevItems, itemId]);
      } else {
          setCheckAll((prevItems) => prevItems.filter((id) => id !== itemId));
      }

      console.log({value})
  }
  
  // use patch because bring more than 1 iD
  const onDeleteChecked = async() =>{
    setIsLoading(true)

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

  const onSingleDelete =async(id: string) => {
    setIsLoading(true)
    const pesertaId = id

    try {
      const responDeleted = await singleDeleted(pesertaId)

      if(responDeleted){
        toast.success(AlertMessage.removeSuccess)
      }

    } catch (error) {
      toast.error(AlertMessage.removeFailed)
    } finally{
      setIsLoading(false)
    }
  
  }

  const editModeOn = (pesertaID: string) => {
    const inputElement = refInput.current[pesertaID]
    setPesertaEdited(pesertaID)

    setTimeout(() => {
        inputElement?.focus()
        inputElement?.select()
    })
  }

  const handleNoPesertaChange = async (e: any) => {
    e.preventDefault();
    const { value, name } = e.target;
    console.log("Before setNoPesertaTest");
    await setNoPesertaTest(value);
    console.log("After setNoPesertaTest");
    const inputElement = refInput.current[pesertaEdited];
    inputElement?.focus();
  };

  function anyfunction(value: string) {
    console.log({value});
  }

  const onSave = async(formData: FormData) =>{
    const noPeserta = refInput.current[pesertaEdited]?.value
    // existValidateOnTable({value:noPeserta, id:pesertaEdited, model: "peserta", setValidateMsg, validateMsg, setIsError, isEdit:posID})
    console.log({noPeserta})
  }

  const onCancelEdit = () =>{
    setPesertaEdited("")
    setPesertaData(dataTable)
  }

  const resetValidateMsg = () =>{
      if(isEmpty) {
          setValidateMsg(undefined)
          setIsEmpty(false)
      }
  }
  

  useEffect(() => {
    setCheckAll([])
    setPesertaData(dataTable)
  }, [dataTable])


  const columns: ColumnDef<PesertaData>[] = 
  [
    {
      id: "select",
      header: ({ table }) => {
        const pesertaInPos = dataTable.filter((item) => {
          return item.pos.some((pos) => pos.id === posID)
        })
        const isSelectedAll = pesertaInPos.length > 0 && pesertaInPos.length === checkAll.length

        return (
          <Checkbox
            disabled={isLoading}
            checked={isSelectedAll || table.getIsSomePageRowsSelected() && "indeterminate"} 
            onCheckedChange={() => oncheckAll()}
          />
        )
      },
      cell: ({ row }) => {
        const pesertaData = row.original
        const isSelected = checkAll.includes(pesertaData.id);

        if(pesertaData.pos.some((item: any) => item.id === posID)) {
          return (
            <Checkbox
              disabled={isLoading}
              checked={isSelected}
              onCheckedChange={(e) => onSingleCheck(e, pesertaData.id)} 
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
      cell: ({ row }) => {
        const data = row.original
        const editMode = pesertaEdited === data.id && pesertaEdited !== ""
        return (
          <div 
            className="
              font-bold
              ml-4
          ">
            <form
              ref={(el) => (refForm.current[data.id] = el)} 
              action={onSave}
            >
              <InputForm
                ref={(el) => (refInput.current[data.id] = el)}
                id={data.id}
                name={pesertaEdited}
                type="number"
                readOnly={!editMode}
                label={row.getValue("noPeserta")}
                validateMsg={validateMsg}
                secondValidateMsg={duplicateMsg}
                onChange={(e) => handleNoPesertaChange(e)}
              />
            </form>
            
          </div>
        )
      }
        
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
      cell: ({ row }) => {
        const pesertaData = row.original
        const editMode = pesertaEdited === pesertaData.id && pesertaEdited !== ""
        return(
          <div className="lowercase">
            {row.getValue("waktu")}
          </div>
        )
      }
    },
    {
      id: "actions",
      enableHiding: false,
  
      cell: ({row}) => {
        const dataRow = row.original
        const pesertaID = dataRow.id
        if (dataRow.pos.some(pos => pos.id === posID)){
          return (
            <DropdownMenu>
                <div className="text-center">
                  <span className="sr-only">Open menu</span>
                  {
                    pesertaEdited === pesertaID 
                    ? (
                        <div className="space-x-2">
                          <Button
                            // onClick={() => refForm.current[pesertaID]?.requestSubmit()}
                            type="submit"
                            variant="outline" 
                            className="
                              h-8 
                              w-8 
                              p-0 
                              hover:bg-green-400 
                              hover:text-white
                            "
                          >
                            <Check 
                              className="h-4 w-4" 
                            />
                          </Button>
                          <Button
                            onClick={onCancelEdit} 
                            variant="outline" 
                            className="
                              h-8 
                              w-8 
                              p-0 
                              hover:bg-rose-400 
                              hover:text-white
                            "
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    : (
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                      )
                  }
                </div>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuItem
                  className="
                    space-x-1
                    cursor-pointer
                    text-neutral-600
                    hover:text-white
                    hover:bg-orange-300
                  "
                  onClick={() => editModeOn(pesertaID)} 
                >
                  <Pencil
                    className="
                      w-3
                      h-3
                    "
                  />
                  <p>Ubah peserta ini</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onSingleDelete(dataRow.id)}
                  className="
                    space-x-1
                    cursor-pointer
                    text-neutral-600
                    hover:text-white
                    hover:bg-rose-400
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
      data: pesertaData,
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
                  {/* {JSON.stringify(checkAll)} */}
                  {/* {JSON.stringify(pesertaEdited)}
                  {JSON.stringify(pesertaData)} */}
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
                  {table.getRowModel().rows?.length
                   
                  ? (
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
                    ) :(
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
                  {checkAll.length} / {" "}
                  {dataTable.length} ditandai.
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
                    disabled={isLoading}
                    variant="destructive"
                    size="sm"
                    onClick={onDeleteChecked}
                  >
                    {
                      isLoading
                      ? <Loader2 className="h-4 w-4 animate-spin" /> 
                      : <Trash2 className="w-4 h-4"/>
                    }
                    
                  </Button>
                )
              }
            </div>
        </div>
    </>
  )
}

export default TableContent
