'use client'

import ButtonForm from "@/components/form/butonForm";
import InputForm from "@/components/form/inputForm";
import { duplicateValidate, existValidate, isGroupNotEmpty, requiredValidate, validateRange } from "@/lib/validate";
import { ElementRef, useEffect, useRef, useState } from "react";
import { addKategori } from "@/actions/kategori/add";
import { toast } from "sonner";
import { AlertMessage, ResponProps } from "@/types";
import { Save } from "lucide-react";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


 export interface InputPosComponent {
  id: string;
  name: string;
  posFinish: boolean | any;
  value: string;
  [key: string]: string | any[]
}

export interface AddKategoriDataFormat {
  namaPos: InputPosComponent[]
  namaKategori: string
  jumlahPos: string | number
}

const AddKategori = () => {
    const [jumlahPos, setJumlahPos] = useState<number | string>("")
    const [inputPos, setInputPos] = useState<InputPosComponent[] | any[]>([])
    

    const [duplicateMsg, setDuplicatMsg] = useState()
    const [validateMsg, setValidateMsg] = useState()

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    
    const refClose = useRef<ElementRef<"button">>(null)

    const handleJumlahPos = (e: any) => {
        resetValidate()
        
        const value = e.target.value
        
        setJumlahPos(value)
        setInputPos([])
        const maxPos = 10
        const minPos = 1

        if(validateRange(
            e, 
            setDuplicatMsg, 
            duplicateMsg, 
            setIsError, 
            minPos, 
            maxPos
        )) return null

        for(let i=0; i<value; i++){
            const fieldName = `namaPos-${i+1}`
            const newInputComponent: InputPosComponent | any = {
                id: fieldName,
                name: fieldName,
                posFinish: value == i+1 ? true : false,
                value: "",
                [fieldName]: ""
            }

            setInputPos((prevInputComponents) => [
                ...prevInputComponents, 
                newInputComponent
            ])
        }
    }

    const resetValidate = () =>{
        setValidateMsg(undefined)
        setDuplicatMsg(undefined)
    }

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {value, name, id} = e.target
        let updateFieldData
        
        if(name === "posFinish"){
            updateFieldData = inputPos.map((field) => ({ ...field, posFinish: false }))
            updateFieldData = updateFieldData.map((field) =>{
                if(field.id === id) {
                    return {
                        ...field, 
                        posFinish:true
                    }
                }

                return field
            })
        } else {
            updateFieldData = inputPos.map((field) =>{
                if(field.id === id) {
                    return {
                        ...field, 
                        value, 
                        [name]: value
                    }
                }

                return field
            })
        }

        
        
        setInputPos(updateFieldData)
    }

    const handleNamaPos = (e: React.ChangeEvent<HTMLInputElement>) =>{
        duplicateValidate(
            e, 
            inputPos, 
            setDuplicatMsg, 
            duplicateMsg, 
            setIsError
        )

        requiredValidate(e, setValidateMsg, validateMsg, setIsError)
    }


    const onSubmit = async(formData: FormData) =>{
        setIsLoading(true)
        const valuesInput = Object.fromEntries(formData)
        const namaKategori = formData.get("namaKategori") as string

        if (isGroupNotEmpty(valuesInput, setValidateMsg, setIsError)){
            setIsLoading(false)
            return toast.error("Ada kesalahan...!")
        }
        
        const data: AddKategoriDataFormat = {
            namaPos: inputPos,
            namaKategori,
            jumlahPos: jumlahPos as number
        }

        try {
            const responAddKategori = await addKategori(data) as ResponProps
            if(responAddKategori.data){
                toast.success(AlertMessage.addSuccess)
                refClose.current?.click()
            } else{
                toast.error(responAddKategori.msg)
            }
        } catch (error: any) {
            toast.success(error.msg)
        } finally{
            setIsLoading(false)
        }
        
    }

    useEffect(() => {
        setIsError(validateMsg && Object.keys(validateMsg).length > 0 
        || duplicateMsg && Object.keys(duplicateMsg).length > 0
        ? true 
        : false)
    }, [validateMsg, duplicateMsg])

        
    return (
        <form
            action={onSubmit}
        >
            <div className="mb-2">
            {/* {JSON.stringify({isError})} */}
            </div>
            <div
                className="
                    flex
                    gap-2
                    py-2
                "
            >
                <div className="w-2/3">
                    <InputForm
                        id="namaKategori"
                        name="namaKategori"
                        type="text"
                        label="Nama Kategori"
                        disabled={isLoading}
                        isError = {isError}
                        validateMsg={validateMsg}
                        secondValidateMsg={duplicateMsg}
                        isDoubleValidate
                        onChange={(e) => {
                            requiredValidate(e, setDuplicatMsg, duplicateMsg, setIsError)
                            existValidate({
                                e, 
                                model: "kategori", 
                                setValidateMsg, 
                                validateMsg, 
                                setIsError, 
                                isEdit: false
                            })
                        }}
                    />
                </div>
                <div className="w-1/3">
                    <InputForm
                        id="jumlahPos"
                        name="jumlahPos"
                        type="number"
                        label="Jumlah Pos"
                        value={jumlahPos}
                        disabled={isLoading}
                        isError = {isError}
                        validateMsg={validateMsg}
                        secondValidateMsg={duplicateMsg}
                        isDoubleValidate
                        onChange={(e) => {
                            handleJumlahPos(e)
                            requiredValidate(e, setValidateMsg, validateMsg, setIsError)
                        }}
                    />
                </div>
            </div>
            
            <div                
                className="
                    grid 
                    max-h-[150px]
                    grid-cols-2 
                    gap-x-6
                    gap-y-2
                    pt-2
                    overflow-x-auto
                "
            >
                {
                    inputPos.map((inputField, i) => (
                        <div
                            key={i} 
                            className="
                                flex 
                                items-center 
                                gap-2
                            "
                        >
                            <input
                                type="radio" 
                                id={inputField.id}
                                name="posFinish"
                                defaultChecked = {jumlahPos == i+1}
                                onChange={(e) => onInput(e)}
                            />
                            <InputForm
                                id={inputField.id}
                                name={inputField.id}
                                type="text"
                                value={inputField.value}
                                label={(jumlahPos as number) > i+1 ? `Nama Pos ${i+1}` : `Nama Pos Finish`}
                                disabled={isLoading}
                                isError = {isError}
                                validateMsg={validateMsg}
                                secondValidateMsg={duplicateMsg}
                                isDoubleValidate
                                onChange={(e) => {
                                    onInput(e)
                                    handleNamaPos(e)
                                }}
                            />
                        </div>
                    ))
                }
                
            </div>
            <DialogFooter>
                <div
                    className="
                        flex
                        w-full
                        justify-between
                        items-center
                        mt-4
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
 
export default AddKategori;