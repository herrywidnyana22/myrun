'use client'

import ButtonForm from "@/components/form/butonForm";
import InputForm from "@/components/form/inputForm";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { duplicateValidate, existValidate, isGroupEmpty, isGroupNotEmpty, requiredValidate, validateRange } from "@/lib/validate";
import { useEffect, useState } from "react";
import GroupInputPeserta from "../../components/dashboard-inputPesertaGroup";
import { addKategori } from "@/actions/kategori/add";
import { toast } from "sonner";
import { AlertMessage } from "@/types";
import { Save } from "lucide-react";


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
    const [isFieldErrors, setIsFieldErrors] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    

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
            setIsEmpty(true)
            
            console.log("group true")

            return toast.error("Ada kesalahan...!")

        }
        
        console.log({valuesInput})
        
        const data: AddKategoriDataFormat = {
            namaPos: inputPos,
            namaKategori,
            jumlahPos: jumlahPos as number
        }

        try {
            const responAddKategori = await addKategori(data)
            if(responAddKategori){
                toast.success(AlertMessage.addSuccess)
            }
        } catch (error) {
            toast.success(AlertMessage.addFailed)
        } finally{
            setIsLoading(false)
        }
        
    }

    const checkIsEmpty =  () =>{
        
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
            <div className="mb-5">
            {/* {JSON.stringify({isError})} */}
            {JSON.stringify({validateMsg})}
            {JSON.stringify({duplicateMsg})}
            </div>
            <div
                className="
                    flex
                    gap-2
                    pt-2
                    pb-4
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
                    pt-5
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
            <ButtonForm
                className="float-right mt-6"
                disabled={isLoading || isError}
            >
                <Save className="w-4 h-5"/>
                Simpan
            </ButtonForm>
        </form>
    );
}
 
export default AddKategori;