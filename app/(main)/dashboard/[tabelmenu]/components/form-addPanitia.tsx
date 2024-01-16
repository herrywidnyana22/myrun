'use client'

import { getAllKategori } from "@/actions/kategori/get";
import { addPanitia } from "@/actions/panitia/add";
import { CheckboxForm } from "@/components/form/checkboxForm";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { formatForm } from "@/lib/formatter";
import { cn } from "@/lib/utils";
import { confirmPassValidate, existValidate, passValidate, requiredValidate, usernameFormatValidate } from "@/lib/validate";
import { Save } from "lucide-react";
import { ElementRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import InputForm from "@/components/form/inputForm";
import ButtonForm from "@/components/form/butonForm";
import { AlertMessage } from "@/types";

const AddPanitia = () => {
    const [kategoriData, setKategoriData] = useState<any>(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isAdminChecked, setAdminChecked] = useState<boolean>(false)
    const [selectedPos, setSelectedPos] = useState<any[]>([])
    const [validateMsg, setValidateMsg] = useState()
    const [pass, setPass] = useState("")

    const refClose = useRef<ElementRef<"button">>(null)
    
    const onSelectedPos = (kategoriId: string, posId: string) =>{
        // kosongkan dulu sesuai kategori
        selectedPos !== null && onRemovePos(kategoriId)

        // format objek {kategoriid: posId}
        const newObject = {[kategoriId]: posId}
        
        const duplicateObject = selectedPos.find(obj => obj[kategoriId] === posId)
        if(duplicateObject) return

        setSelectedPos(prev => [...prev, newObject])
    }
    
    const onRemovePos = (kategoriId: string) => {
        setSelectedPos(prev => 
            prev.filter(obj => Object.keys(obj)[0] !== kategoriId))
    }

    const onSubmit = async(formData: FormData) =>{
        setIsLoading(true)
    
        const data = formatForm(formData)
        // const data = Object.fromEntries(formData)
        console.log({data})

        try {
            const responAddPanitia = await addPanitia(data)
            if(responAddPanitia.data){
                toast.success(responAddPanitia.msg)
                refClose.current?.click()
            } else {
                toast.success(responAddPanitia.msg)
            }
            console.log({responAddPanitia})
        } catch (error: any) {
            toast.error(error)
        } finally{
            setIsLoading(false)
        }
    }

    const handleChange = () =>{
        setAdminChecked(!isAdminChecked)
    }
    useEffect(() =>{
        const kategoriData = async() =>{
            try {
                const getData = await getAllKategori()

                if(!getData) {
                    toast.error("Belum ada Kategori")
                } else {
                    setKategoriData(getData)
                }
            } catch (error: any) {
                toast.error(error.message)
            }
        }

        kategoriData()

    }, [])
    

    return (
        <form 
            action={onSubmit}
            className="mt-4"
        >
            {/* {JSON.stringify({isLoading})} */}
            {/* {JSON.stringify({kategoriData})} */}
            <div
                className="
                    grid 
                    grid-cols-2 
                    gap-4 
                    text-left
                "
            >
                <InputForm
                    id="nama"
                    name="nama" 
                    type="text"
                    label="Nama"
                    disabled={isLoading}
                    validateMsg={validateMsg}
                    onChange={(e) => requiredValidate(e, setValidateMsg, validateMsg, setIsError)}
                    isError={isError}
                />
                <InputForm
                    id="username"                   
                    name="username"                   
                    type="text"
                    label="Username"
                    disabled={isLoading}
                    validateMsg={validateMsg}
                    onChange={(e) => {
                        existValidate({e, model: "panitia", setValidateMsg, validateMsg, setIsError})
                        requiredValidate(e, setValidateMsg, validateMsg, setIsError)
                        usernameFormatValidate(e, setValidateMsg, validateMsg, setIsError)
                    }}
                    isError={isError}
                />
                <InputForm
                    id="password"
                    name="password" 
                    type="password"
                    label="Password"
                    disabled={isLoading}
                    validateMsg={validateMsg}
                    onChange={(e) => {
                        setPass(e.target.value)
                        requiredValidate(e, setValidateMsg, validateMsg, setIsError)
                        passValidate(e, setValidateMsg, validateMsg, setIsError)
                    }}
                    isError={isError}
                />
                <InputForm
                    id="confPassword" 
                    name="confPassword" 
                    type="password"
                    label="Confirm Password"
                    disabled={isLoading}
                    validateMsg={validateMsg}
                    onChange={(e) => {
                        requiredValidate(e, setValidateMsg, validateMsg, setIsError)
                        confirmPassValidate(e, pass, setValidateMsg, validateMsg, setIsError)
                    }}
                    isError={isError}
                />

                <div>
                    <label className="
                        text-sm
                        text-slate-600
                        font-bold
                    ">
                        Role
                    </label>
                    <div className="
                        flex 
                        gap-3
                        items-center
                        mb-5
                    ">
                        <div className="
                            flex 
                            gap-1
                            items-center
                        ">
                            <input
                                id="admin"
                                value='ADMIN'
                                type="radio"
                                name="role"
                                disabled={isLoading}
                                onChange={handleChange}
                                className="h-4 w-4"
                            />
                            <label>
                                Admin
                            </label>
                        </div>
                        <div className="
                            flex 
                            gap-1
                            items-center
                        ">    
                            <input 
                                id="panitia"
                                value='PANITIA'
                                type="radio"
                                name="role"
                                defaultChecked={true}
                                disabled={isLoading}
                                onChange={handleChange}
                                className="h-4 w-4"
                            />
                            <label>
                                Panitia
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {
                !isAdminChecked && 
            <>
                <label 
                    className="
                        mt-6 
                        text-left 
                        font-bold 
                        text-slate-600
                    ">
                        Tugas Jaga
                </label>
                <p 
                    className="
                        text-sm 
                        text-gray-500/100 
                        mt-1
                    ">
                        Pilih pos yg akan dijaga oleh panitia
                </p>
                <div className={cn(`
                    flex
                    justify-between
                    border
                    border-dashed 
                    mt-2
                    rounded-md
                    p-4`,
                    selectedPos.length > 0 
                    ? "border-gray-300 "
                    : "border-rose-500 "
                    
                )}>
                    <div className="
                        w-full
                        grid
                        grid-cols-2
                        gap-6
                    ">
                    {
                        kategoriData && kategoriData.map((kategori: any, i: number) =>(
                        <div key={i} className="flex flex-col">
                            <CheckboxForm
                                // name dan value tidak perlu, 
                                // karnea akan diambil dari radio pos

                                // value={kategori.id}
                                // name= "namaKategori"
                                checked={
                                    selectedPos.some((obj) => 
                                        Object.keys(obj).includes(kategori.id)
                                    )
                                } 
                                id="namaKategori"
                                type="checkbox"
                                label={kategori.namaKategori}
                                disabled={isLoading}
                                onChange={() => onRemovePos(kategori.id)}
                            />
                            <div className="ml-6">
                            {
                                
                                kategori.pos.map((pos: any, index: number) =>(
                                 <CheckboxForm
                                        key={index}
                                        id="namaPos"
                                        value={pos.id}
                                        checked={
                                            selectedPos.some(obj => 
                                                Object.values(obj).includes(pos.id))
                                        } 
                                        name={kategori.id}
                                        type="radio"
                                        label={pos.namaPos}
                                        disabled={isLoading || (pos.panitiaId !== null)}
                                        onChange={() => onSelectedPos(kategori.id, pos.id)}
                                    />
                                ))
                            }
                            </div>
                        </div>
                        ))
                    }

                        
                    </div>
                    
                </div>  
            </>
            }
            <DialogFooter>
                <div
                    className="
                        flex
                        w-full
                        justify-between
                        items-center
                        mt-6
                    "
                >
                    <DialogClose ref={refClose} asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <ButtonForm
                        disabled={isLoading || isError}
                        icon={<Save className="w-4 h-5"/>}
                    >
                        Simpan
                    </ButtonForm>

                </div>
            </DialogFooter>
        </form>
    );
}
 
export default AddPanitia;