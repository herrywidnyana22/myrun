'use client'

import { adminUser } from "@/app/initUser";
import InputForm from "@/components/form/inputForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { existValidate } from "@/lib/validate";
import { AlertMessage, ResponProps, TableProps } from "@/types";
import { ArrowUpDown, ChevronDown, Loader2, Trash2 } from "lucide-react";
import { ElementRef, useCallback, useEffect, useRef, useState } from "react";
import OpsiAction from "../../(panitia)/components/opsiAction";
import { getAllKategori } from "@/actions/kategori/get";
import { editUser } from "@/actions/panitia/edit";
import { toast } from "sonner";

const TableUser = ({data, currentUser}: TableProps) => {
    const [dataTable, setDataTable] = useState(data)
    const [searchValue, setSearchValue] = useState("")

    const [dataEdited, setDataEdited] = useState<any>()
    const [userSelected, setUserSelected] = useState<any>()
    

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isCheckAll, setIsCheckAll] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    // validate state
    const [validateMsg, setValidateMsg] = useState()
    const [isEmpty, setIsEmpty] = useState(false)

    const [selectedPos, setSelectedPos] = useState<any[]>([])
    
        // delete state
    const [checkAll, setCheckAll] = useState<string[]>([])

    const refForm = useRef<ElementRef<"form">>(null)
    const refInput = useRef<{ [key: string]: HTMLInputElement | null }>({})

    const onSave = async() =>{
        
    }

    const editModeOn = async(selectedId: string, userIndex: number) => {
        const dataKategori = await getAllKategori()
        setUserSelected(dataKategori)

        const inputElement = refInput.current[selectedId]
        setDataEdited(selectedId)

        const userEdited = dataTable[userIndex]
        const newSelectedKategoriPos = [...selectedPos]

        userEdited.pos.forEach((pos: any) => {
            const existDataIndex = newSelectedKategoriPos.findIndex(
                (entry) => entry(pos.kategori.id) === pos.id
            )

            if (existDataIndex !== -1){
                newSelectedKategoriPos.splice(existDataIndex, 1)
            } else{
                const newEnty = {
                    [pos.kategori.id]: pos.id
                }

                newSelectedKategoriPos.push(newEnty)
            }
        })

        setSelectedPos(newSelectedKategoriPos)
        

        if(dataEdited === selectedId){
            setIsLoading(true)
            const dataFilter = dataTable.filter((selected) => selected.id === selectedId)

            try {
                const actionEdit = await editUser(selectedId, dataFilter) as ResponProps
                if(!actionEdit.data){
                    toast.error(actionEdit.msg)
                }
            } catch (error: any) {
                toast.error(error.msg)
            }

            
        }

        // setTimeout(() => {
        //     inputElement?.focus()
        //     inputElement?.select()
        // })

        

        console.log({dataKategori})


    }

    const isSelectedAll = dataTable.length - 1 > 0 && dataTable.length - 1 === checkAll.length

    const onSingleCheck = (value: any, itemId: string) => {
        const isChecked = value
        if (isChecked) {
            setCheckAll((prevItems) => [...prevItems, itemId]);
        } else {
            setCheckAll((prevItems) => prevItems.filter((id) => id !== itemId));
        }
    }

     const onDeleteChecked = async() =>{
        setIsLoading(true)

        // try {
        //     const responDelete = await checkedDelete(checkAll, posID)
        //     if(responDelete){
        //         toast.success(AlertMessage.removeSuccess)
        //     }
        // } catch (error) {
        //     toast.error(AlertMessage.removeFailed)
        // } finally{
        //     setIsLoading(false)
        // }
    }

    const onSingleDelete =async(id: string) => {
        setIsLoading(true)
        const pesertaId = id

        // try {
        //     const responDeleted = await singleDeleted(pesertaId)

        //     if(responDeleted){
        //         toast.success(AlertMessage.removeSuccess)
        //     }

        // } catch (error) {
        //     toast.error(AlertMessage.removeFailed)
        // } finally{
        //     setIsLoading(false)
        // }
    
    }

    const resetValidateMsg = () =>{
        setValidateMsg(undefined)
        setIsEmpty(false)
    }

    const onCancelEdit = () =>{
        const refPeserta = refInput.current[dataEdited]
        setDataEdited("")
        setDataTable(data)
        setIsError(false)
        setIsLoading(false)
        if (refPeserta) {
            refPeserta.value = '';
            refPeserta.blur()
            resetValidateMsg()
        }
    }

      // Delete prosedure
    const oncheckAll = useCallback(() =>{
        setIsCheckAll(!isCheckAll)
        setCheckAll(
            isCheckAll 
            ? [] 
            : dataTable 
                ? dataTable
                    .filter((item: any) =>  item.id !== currentUser.id)
                    .map((item: any) => item.id)
                : []
        )
        
    },[dataTable, isCheckAll, currentUser])


    useEffect(() => {
        setCheckAll([])
        setDataTable(data)
        setSearchValue("")
    }, [data])
    
    console.log({currentUser})
    console.log({data})
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
                data.length > 0 
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
                        {/* {JSON.stringify({checkAll})} */}
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
                                                    (checkAll.length > 0 && checkAll.length < dataTable.length - 1) && 
                                                    "indeterminate"
                                                } 
                                                onCheckedChange={() => oncheckAll()}
                                            />
                                        </TableHead>
                                        <TableHead className="text-center w-[210px]">
                                            <Button
                                                variant="ghost"
                                                onClick={() => {}}
                                                type="button"
                                            >
                                                Nama
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-center w-[200px]">
                                            Username
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Kategori
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Pos
                                        </TableHead>
                                        <TableHead className="text-center w-[110px]">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                {
                                    dataTable.length > 0
                                    ?   
                                        <TableBody>
                                        {
                                            dataTable.map((user, userIndex) => (
                                            <TableRow
                                                key={user.id}
                                                className={checkAll.includes(user.id) ? 'bg-neutral-50' : ''}
                                            >
                                                <TableCell>
                                                {
                                                    user.id !== adminUser.id &&
                                                    (<Checkbox
                                                        id={user.id}
                                                        name={user.id}
                                                        disabled={isLoading}
                                                        checked={checkAll.includes(user.id)}
                                                        onCheckedChange={(e) => onSingleCheck(e, user.id)}
                                                    />)
                                                }
                                                </TableCell>
                                                <TableCell 
                                                    className="pl-8"
                                                >
                                                    <InputForm
                                                        id={`nama-${user.id}`}
                                                        ref={(el) => (refInput.current[user.id] = el)}
                                                        name={dataEdited}
                                                        type="text"
                                                        readOnly={!(dataEdited === user.id && dataEdited !== "")}
                                                        label={user.namaPanitia!}
                                                        disabled= {isLoading}
                                                        validateMsg={validateMsg}
                                                        isError = {isError}
                                                        onChange={(e) => {
                                                            existValidate({e, model: "user", setValidateMsg, validateMsg, setIsError, dataID:user.id, isEdit: true})
                                                            resetValidateMsg()
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell 
                                                    className="pl-8"
                                                >
                                                    <InputForm
                                                        id={`username-${user.id}`}
                                                        ref={(el) => (refInput.current[user.id] = el)}
                                                        name={dataEdited}
                                                        type="text"
                                                        readOnly={!(dataEdited === user.id && dataEdited !== "")}
                                                        label={user.username!}
                                                        disabled= {isLoading}
                                                        validateMsg={validateMsg}
                                                        isError = {isError}
                                                        onChange={(e) => {
                                                            existValidate({e, model: "user", setValidateMsg, validateMsg, setIsError, dataID:user.id, isEdit: true})
                                                            resetValidateMsg()
                                                        }}
                                                    />
                                                </TableCell>                                                
                                                <TableCell 
                                                    className="pl-8"
                                                >
                                                    kategori
                                                </TableCell>
                                                <TableCell 
                                                    className="pl-8"
                                                >
                                                    pos
                                                </TableCell>
                                                <TableCell>
                                                {
                                                    user.id !==  currentUser.id && 
                                                    <OpsiAction
                                                        deleteAction={() => onSingleDelete(user.id)}
                                                        editModeOn={() => editModeOn(user.id, userIndex)}
                                                        onCancel={onCancelEdit}
                                                        condition = {dataEdited === user.id}
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
                        {checkAll.length} / {" "+dataTable.length}
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
    );
}
 
export default TableUser;