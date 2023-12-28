'use client'

import ButtonForm from "@/components/form/butonForm";
import InputForm from "@/components/form/inputForm";
import { duplicateValidate, existValidate } from "@/lib/validate";
import { InputPesertaComponent } from "@/types";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

interface GroupInputProps{
    userKategori: string
    userPos: any
}

const GroupInputPeserta = ({userKategori, userPos}:GroupInputProps) => {

    const [isLoading, setIsLoading]  = useState<boolean>(false)
    const [isError, setIsError] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)

    const [inputPeserta, setInputPeserta] = useState<InputPesertaComponent[]>([])

    const [validateMsg, setValidateMsg] = useState()
    const [duplicateMsg, setDuplicatMsg] = useState()
    

    const { pending } = useFormStatus()
    const posId = userPos.id
    const jumlahInput = 4

    function initialPesertaInput(){
        for(let i=0; i<jumlahInput; i++){
            const fieldName = `nopeserta${i+1}`
            const newInputComponent: InputPesertaComponent = {
                id: fieldName,
                [fieldName]: ""
            }
            
            newInputComponent.time = [
                {
                    hour: '',
                    minute: '',
                    second:'',
                    millisecond: '',
                },
            ]
             
            
            setInputPeserta((prevInputComponents) => [
                ...prevInputComponents, 
                newInputComponent
            ])
        }
    }

    const reset = () =>{
        setInputPeserta([])
        initialPesertaInput()
    }

    const resetValidateMsg = () =>{
        if(isEmpty) {
            setValidateMsg(undefined)
            setIsEmpty(false)
        }
    }

    const onInputPeserta = (e: React.ChangeEvent<HTMLInputElement>) =>{
        
        const {value, name, id} = e.target
        const updateFieldData = inputPeserta.map((field) =>{
            if(field.id === id) {
                return {...field, [name]: value}
            }

            return field
        })
        
        setInputPeserta(updateFieldData)
    }

    useEffect(() =>{
        setInputPeserta([])
        initialPesertaInput()
    },[])
    

    useEffect(() => {
        setIsError(validateMsg && Object.keys(validateMsg).length > 0 
        || duplicateMsg && Object.keys(duplicateMsg).length > 0
        ? true 
        : false)
    }, [validateMsg, duplicateMsg])

    return (
        <form action="">
            {/* {JSON.stringify(userPos)} */}
            <div 
                className="
                    w-full
                    p-4
                    border
                    space-y-4
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
                    {`Peserta Baru ${userKategori} (${userPos.namaPos})`} 
                </h1>
                <div
                    className="
                        grid
                        grid-cols-2
                        gap-4
                        gap-y-8
                        justify-between
                        py-4
                    "
                >
                    {
                        inputPeserta.map((pesertaField, index: number)=>(

                        <div
                            key={index}
                            className="
                                space-y-3
                            "
                        >
                            <InputForm
                                id={pesertaField.id}
                                name={pesertaField.id}
                                type="number"
                                value={pesertaField[pesertaField.id] }
                                label="No Peserta"
                                disabled= {isLoading}
                                validateMsg={validateMsg}
                                isError = {isError}
                                secondValidateMsg={duplicateMsg}
                                isDoubleValidate
                                onChange={(e) => {
                                    onInputPeserta(e)
                                    existValidate({e, model: "peserta", setValidateMsg, validateMsg, setIsError, isEdit:posId})
                                    duplicateValidate(e, inputPeserta, setDuplicatMsg, duplicateMsg, setIsError)
                                    resetValidateMsg()
                                }}   
                            />
                            {
                                userPos.posFinish && (
                                    <div
                                        className="
                                            flex
                                            gap-1
                                            items-center
                                        "
                                    >
                                        <InputForm
                                            id="waktu1"
                                            type="number"
                                            label="Jam"
                                            isWaktu
                                            className="
                                                appearance-none
                                            "
                                        />
                                        <p>:</p>
                                        <InputForm
                                            id="waktu2"
                                            type="number"
                                            label="Menit"
                                            isWaktu
                                            className="
                                                appearance-none
                                            "
                                        />
                                        <p>:</p>
                                        <InputForm
                                            id="waktu3"
                                            type="number"
                                            label="Detik"
                                            isWaktu
                                            className="
                                                appearance-none
                                            "
                                        />
                                    </div>
                                )
                            }
                        </div>
                        ))

                    }
                    
                </div>
                <ButtonForm
                    varian="ghost"
                    disabled={isLoading || pending || isError}
                    className="
                        w-full
                        py-2
                        font-bold
                        border-2
                        text-white
                        border-neutral-800
                        bg-gray-500
                        hover:bg-gray-500/20
                        hover:border-neutral-400
                    "
                >
                    Simpan
                </ButtonForm>
            </div>    
        </form>
    );
}
 
export default GroupInputPeserta;