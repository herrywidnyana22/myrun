'use client'

import { addPeserta } from "@/actions/peserta/add";
import ButtonForm from "@/components/form/butonForm";
import InputForm from "@/components/form/inputForm";
import { duplicateValidate, existValidate, isGroupEmpty } from "@/lib/validate";
import { AlertMessage, InputPesertaComponent, TimeFormat } from "@/types";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

interface GroupInputProps{
    userKategori: string
    userPos: any
}

const GroupInputPeserta = ({userKategori, userPos}:GroupInputProps) => {

    const [isLoading, setIsLoading]  = useState(false)
    const [isError, setIsError] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)

    const [inputPeserta, setInputPeserta] = useState<InputPesertaComponent[]>([])

    const [validateMsg, setValidateMsg] = useState()
    const [duplicateMsg, setDuplicatMsg] = useState()
    

    const { pending } = useFormStatus()
    const posID = userPos.id
    const kategoriID = userPos.kategori.id
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

    const onSubmit = async(formData: FormData) =>{
        
        setIsLoading(true)
        const noPeserta = Object.fromEntries(formData)

        if (isGroupEmpty(noPeserta, setValidateMsg, setIsError)){
            setIsLoading(false)
            setIsEmpty(true)
            return toast.error("Ada kesalahan...!")
        }
        
        let responAddPeserta
        try {
            responAddPeserta = await addPeserta(
                transformData(inputPeserta),
                kategoriID,
                posID, 
                userPos.posFinish
            )

            if(responAddPeserta){
                toast.success(AlertMessage.addSuccess)
            }
            
        } catch (error) {
            toast.error(AlertMessage.addFailed)
        } finally{
            setIsLoading(false)
            reset()
        }
        

        console.log(responAddPeserta)
        
    }

    const transformData = (data: TimeFormat[]): any[] =>{
        const result: any[] = [];

        // Iterate over each object in the inputData array
        data.forEach((inputObj) => {
            const id = inputObj.id;

            // Iterate over the properties of the current object
            for (const propName in inputObj) {
                if (propName !== 'id' && propName !== 'time') {
                    const newObj: any = { id };
                    newObj[propName] = inputObj[propName];

                    // Use type assertions to access properties of the 'time' object
                    const timeObj = inputObj['time'][0] as { hour: string; minute: string; second: string; millisecond: string };
                    newObj['time'] = timeObj.hour + ':' + timeObj.minute + ':' + timeObj.second + ':' + timeObj.millisecond;

                    result.push(newObj);
                }
            }
        })

        return result
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
        <form action={onSubmit}>
            {/* {JSON.stringify({isLoading})} */}
            {JSON.stringify({inputPeserta})}
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
                                    existValidate({e, model: "peserta", setValidateMsg, validateMsg, setIsError, dataID:posID, isEdit: false})
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