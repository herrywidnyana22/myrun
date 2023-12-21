export function formatURL(value:string) {
    const capitalizeWords = (str: any) => {
        return str.replace(/\b\w/g, (match: any) => match.toUpperCase());
    }

    const formatedData = decodeURIComponent(value)
    const capitalizeData = capitalizeWords(formatedData)

    return capitalizeData
}