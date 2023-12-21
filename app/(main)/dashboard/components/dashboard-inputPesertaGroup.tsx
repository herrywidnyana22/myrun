import ButtonForm from "@/components/form/butonForm";
import InputForm from "@/components/form/inputForm";

const GroupInputPeserta = () => {
    return (
        <div 
            className="
                w-full
                p-4
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
                Menu title
            </h1>
            <div
                className="
                    flex
                    flex-wrap
                    justify-between
                    py-4
                "
            >
                <InputForm
                    id="noPeserta1"
                    type="number"
                    label="No Peserta"
                />
                <InputForm
                    id="noPeserta1"
                    type="number"
                    label="No Peserta"
                />
                <InputForm
                    id="noPeserta1"
                    type="number"
                    label="No Peserta"
                />
                <InputForm
                    id="noPeserta1"
                    type="number"
                    label="No Peserta"
                />
                
            </div>
            <ButtonForm
                varian="ghost"
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
    );
}
 
export default GroupInputPeserta;