'use client'

import InputForm from "@/components/form/inputForm"
import OpsiAction from "./opsiAction"

import { ArrowUpDown, Check, CheckCircle2, ChevronDown, Loader2, Minus, MoreHorizontal, Pencil, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { ElementRef, createRef, useCallback, useEffect, useRef, useState } from "react"
import { AlertMessage, PesertaData, ResponProps, posData } from "@/types"
import { checkedDelete, singleDeleted } from "@/actions/peserta/delete"
import { toast } from "sonner"
import { existValidate } from "@/lib/validate"
import { editPeserta } from "@/actions/peserta/edit"


interface TableContentProps{
  dataTable: PesertaData[]
  posData: posData[]
  userPos: any
}

const Datatable = ({dataTable, userPos, posData}: TableContentProps) => {
    const [pesertaData, setPesertaData] = useState(dataTable)
    const [searchValue, setSearchValue] = useState("")

    const [pesertaEdited, setPesertaEdited] = useState<any>()
    // check state
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isCheckAll, setIsCheckAll] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    // validate state
    const [validateMsg, setValidateMsg] = useState()
    const [isEmpty, setIsEmpty] = useState(false)
    
        // delete state
    const [checkAll, setCheckAll] = useState<string[]>([])

    const [time, setTime] = useState<any>([]);
    
    const posID = userPos.id

    const refForm = useRef<ElementRef<"form">>(null)
    const refInput = useRef<{ [key: string]: HTMLInputElement | null }>({})
 
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
    }
    
    // use patch because bring more than 1 iD
    const onDeleteChecked = async() =>{
        setIsLoading(true)

        try {
            const responDelete = await checkedDelete(checkAll, posID) as ResponProps
            if(responDelete.data){
                toast.success(responDelete.msg)
            }
        } catch (error: any) {
            toast.error(error.msg)
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

    const handleInputPeserta = (e: React.ChangeEvent<HTMLInputElement>, noPeserta: string) =>{
        // dapatkan no peserta yg diinput
        // const recentNoPeserta = refInput.current[pesertaEdited]?.value
        existValidate({e, model: "peserta", setValidateMsg, validateMsg, setIsError, dataID:posID, isEdit: true})
        resetValidateMsg()
        // }
    }

    const handleInputTimeChange = (prevTime: any, value: string, index: number) => {

        const newTime = [...time]
        newTime[index] = value
        setTime(newTime)
    }

    const onSave = async() =>{
        setIsLoading(true)
        const noPeserta = refInput.current[pesertaEdited]?.value
        const data = {
            noPeserta,
            waktu: time.join(":")
        }
        const kategoriID = userPos.kategori.id
        try {
            await editPeserta(pesertaEdited, kategoriID, posID, data)
            toast.success(AlertMessage.editSuccess)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
            onCancelEdit()
        }
    }

    const onCancelEdit = () =>{
        const refPeserta = refInput.current[pesertaEdited]
        setPesertaEdited("")
        setPesertaData(dataTable)
        setIsError(false)
        setIsLoading(false)
        setTime([])
        if (refPeserta) {
            refPeserta.value = '';
            refPeserta.blur()
            resetValidateMsg()
        }
    }

    const resetValidateMsg = () =>{
        setValidateMsg(undefined)
        setIsEmpty(false)
    }

    const pesertaInPos = dataTable.filter((item) => {
        return item.pos.some((pos) => pos.id === posID)
    })
    
    const isSelectedAll = pesertaInPos.length > 0 && pesertaInPos.length === checkAll.length

    useEffect(() => {
        const filteredData = dataTable.filter(item =>
            item.noPeserta?.includes(searchValue)
        )
        setPesertaData(filteredData)

    },[searchValue, dataTable])

    useEffect(() => {
        setCheckAll([])
        setPesertaData(dataTable)
        setSearchValue("")
    }, [dataTable])


    return (
        <div 
            className="
                w-full
                p-4
                shadow-md
                rounded-lg
                bg-white
        ">
            {
                dataTable.length > 0 
                ? <>
                    <h1
                        className="
                            font-bold
                            text-lg
                            tetx-neutral-700
                        "
                    >
                        Menu title
                        <div>
                        {/* {JSON.stringify(pesertaData)} */}
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
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
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
                        show
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                Filter 
                                <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                filter hide
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    </div>
                    <div className="rounded-md border">
                        <form
                            id="datatable-form"
                            ref={refForm} 
                            action={onSave}
                        >
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            <Checkbox
                                                id="select-all"
                                                name="select-all"
                                                disabled={isLoading}
                                                checked={
                                                    isSelectedAll || 
                                                    (checkAll.length > 0 && checkAll.length < pesertaInPos.length) && 
                                                    "indeterminate"
                                                } 
                                                onCheckedChange={() => oncheckAll()}
                                            />
                                        </TableHead>
                                        <TableHead className="text-center w-[50px]">
                                            <Button
                                                variant="ghost"
                                                onClick={() => {}}
                                                type="button"
                                            >
                                                No Peserta
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        {
                                            posData.map((posItem) => (
                                            <TableHead
                                                key={posItem.id}
                                                className="text-center"
                                            >
                                                {posItem.namaPos}
                                            </TableHead>
                                            ))
                                        }
                                        <TableHead className="text-center w-[250px]">
                                            <Button
                                                variant="ghost"
                                                onClick={() => {}}
                                            >
                                                Waktu
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                {
                                    pesertaData.length > 0
                                    ?   <TableBody>
                                        {
                                            pesertaData.map((pesertaItem) => (
                                            <TableRow
                                                key={pesertaItem.id}
                                            >
                                                <TableCell>
                                                {
                                                    pesertaItem.pos.some((item: any) => item.id === posID) &&
                                                    (<Checkbox
                                                        id={pesertaItem.id}
                                                        name={pesertaItem.id}
                                                        disabled={isLoading}
                                                        checked={checkAll.includes(pesertaItem.id)}
                                                        onCheckedChange={(e) => onSingleCheck(e, pesertaItem.id)} 
                                                    />)
                                                }
                                                </TableCell>
                                                <TableCell 
                                                    className="pl-8"
                                                >
                                                    <InputForm
                                                        id={pesertaItem.id}
                                                        ref={(el) => (refInput.current[pesertaItem.id] = el)}
                                                        name={pesertaEdited}
                                                        type="number"
                                                        readOnly={!(pesertaEdited === pesertaItem.id && pesertaEdited !== "")}
                                                        label={pesertaItem.noPeserta!}
                                                        disabled= {isLoading}
                                                        validateMsg={validateMsg}
                                                        isError = {isError}
                                                        onChange={(e) => handleInputPeserta(e, pesertaItem.noPeserta!)}
                                                    />
                                                </TableCell>
                                                {
                                                    posData.map((posItem) => (
                                                        <TableCell
                                                            key={posItem.id}
                                                            
                                                        >
                                                            <div
                                                                className="
                                                                    flex 
                                                                    justify-center
                                                                "
                                                            >

                                                            {
                                                                
                                                                pesertaItem.pos.find((posStatus: any) => posStatus.id === posItem.id)
                                                                ? <CheckCircle2 className="w-5 h-5 text-neutral-500"/>
                                                                : null
                                                            }
                                                            </div>
                                                        </TableCell>
                                                    ))
                                                }
                                                
                                                <TableCell
                                                    className="flex items-center"
                                                >
                                                {
                                                    pesertaItem.waktu?.split(':').map((timeItem, i) => (
                                                        <div 
                                                            key={i} 
                                                            className="
                                                                flex 
                                                                items-center
                                                            "
                                                        >
                                                            {
                                                                userPos.posFinish && 
                                                                <InputForm
                                                                    id={`${pesertaItem.id}_${timeItem}_${i}`}
                                                                    name=""
                                                                    label={timeItem}
                                                                    value={pesertaEdited === pesertaItem.id ? time[i] : ""}
                                                                    disabled= {isLoading}
                                                                    readOnly={!(pesertaEdited === pesertaItem.id && pesertaEdited !== "")}
                                                                    onChange={(e) => handleInputTimeChange(pesertaItem.waktu, e.target.value, i )}
                                                                />
                                                            }
                                                            
                                                            <span>
                                                            {
                                                                pesertaItem.waktu?.split.length! >= i && ":"
                                                            }
                                                            </span>
                                                        
                                                        </div>
                                                    ))
                                                }
                                                </TableCell>
                                                <TableCell className="text-center">
                                                {
                                                    pesertaItem.pos.some((item: any) => item.id === posID) &&
                                                    <OpsiAction
                                                        deleteAction={() => onSingleDelete(pesertaItem.id)}
                                                        editModeOn={() => editModeOn(pesertaItem.id)}
                                                        onCancel={onCancelEdit}
                                                        condition = {pesertaEdited === pesertaItem.id}
                                                        disabled = {isLoading || isError}
                                                    />
                                                }
                                                </TableCell>
                                            </TableRow>

                                            ))
                                            
                                        }
                                        </TableBody>
                                    : <p className="text-center px-2 py-4">No Peserta tidak ditemukan</p>
                                }
                                
                            </Table>
                        </form>
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
                            {checkAll.length} / {" "+pesertaData.length}
                        </div>
                        <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {}}
                            disabled={true}
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
                            0 /{' '}0
                            </strong>
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {}}
                            disabled={true}
                        >
                            Next
                        </Button>
                        </div>
                    </div>
                    <div>
                    {
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
                </>
                : <p className="text-center">Belum ada data</p>
            }
            
            
        </div>
    )
}

export default Datatable