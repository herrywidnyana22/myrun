export function formatURL(value:string) {
    const capitalizeWords = (str: any) => {
        return str.replace(/\b\w/g, (match: any) => match.toUpperCase());
    }

    const formatedData = decodeURIComponent(value)
    const capitalizeData = capitalizeWords(formatedData)

    return capitalizeData
}

export function formatForm(formData: any) {
    const toJsonObject = Object.fromEntries(formData)
    const JSONData = JSON.stringify(toJsonObject)

    // const formData = data

    const formDataObject: { [key: string]: any } = {}
    for (const [key, value] of formData.entries()) {
        if (
            key === 'nama' || 
            key === 'username' || 
            key === 'password' || 
            key === 'confPassword' ||
            key === 'role'
        ) {
            formDataObject[key] = value;
        } else {
            if (formDataObject['namaKategori'] === undefined) {
                formDataObject['namaKategori'] = [];
                formDataObject['posId'] = [];
            }
            formDataObject['namaKategori'].push(key);
            formDataObject['posId'].push(value);
        }
    }

    // return JSON.stringify(formDataObject);
    return formDataObject;
}

export function dataFormat(data: any, dataState: any){
    // ubah format data dari server, tambahkan field error buat validasi
    const newData = data && data.map((dataItem: any) =>({
        ...dataItem,
        error: {}
    }))
    
    return dataState(newData)
}