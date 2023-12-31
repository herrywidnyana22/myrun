
import { existData } from "@/actions/validate/existData";
import { ValidateMessage, validationType } from "@/types"
import { AlertMessage } from "@/types"


interface ErrorMessages {
  [key: string]: string;
}

export const existValidate = async({ 
    e, 
    model, 
    setValidateMsg, 
    validateMsg,
    setIsError,
    dataID, 
    isEdit
}: validationType) => {

    const { value, id } = e.target
    let error: ErrorMessages  = {}

    const fieldState = {...validateMsg}
    delete fieldState[id]
    setValidateMsg(fieldState)
    setIsError(false)

    let isExist
    if(isEdit) {
        isExist = await existData(value, model, dataID, id)
    } else{
        isExist = await existData(value, model, dataID)
    }

    if(isExist){
       error[id] = ValidateMessage.exist
       setIsError(true)
    }

    setValidateMsg((prev: any) => ({...prev, ...error}))
}


export const duplicateValidate = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: any,
    setValidateMsg: any, 
    validateMsg: any,
    setIsError: any
) =>{
    const { value, id, name } = e.target

    if(value === "" || value === null) return

    let error: ErrorMessages  = {}
    const fieldState = {...validateMsg}
    delete fieldState[id]
    setValidateMsg(fieldState)
    setIsError(false)
    

    const updateData = data.map((field: any) =>{
        if(id === field.id){
            // masukan data ke state
            return {...field, [name]: value}        }

        return field 

    })

    // grouping data

    const posValues = updateData.map((field: any) => {
        if (name.includes("nopeserta")){
            return field[field.id]
        }

        return field[name]
    })

    const duplicateValues = posValues.filter((value: any, i: number, arr: any) =>
        value !== null && value !== "" && arr.indexOf(value) !== i
    );

    updateData.forEach((field: any) => {
        let fieldValue = ""
        if (name.includes("nopeserta")){
            fieldValue =  field[field.id]
        } else {
            fieldValue =  field[name]
        }

       

        if (duplicateValues.includes(fieldValue)) {
            error[field.id] = ValidateMessage.sameField
            setValidateMsg((prev: any) => ({...prev, ...error}))
            setIsError(true)
            
        } else {
            setValidateMsg((prev: any) => {
                const newState = { ...prev }
                delete newState[field.id]
                return newState
            })
            setIsError(false)
        }
        
    })

}

export const isGroupEmpty = (
    data: any,
    setValidateMsg: any,
    setIsError: any
) =>{
    const  error: ErrorMessages  = {}
    let isEmpty = true
    for (const field in data){
        if(data[field] !== '' && data[field] !== null) {
            return isEmpty = false
        } else {
            error[field] = ValidateMessage.groupRequired
            
        }
    }

    if(isEmpty) {
        setValidateMsg(error)
        setIsError(true)
        return true
    } else {
        return false
    }

}

