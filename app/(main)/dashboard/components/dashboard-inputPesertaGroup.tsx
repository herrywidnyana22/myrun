import ButtonForm from "@/components/form/butonForm";
import InputForm from "@/components/form/inputForm";

const GroupInputPeserta = ({menu}: {menu: string}) => {
    return (
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
                {`Peserta Baru ${menu}`} 
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
                <div
                    className="
                        space-y-3
                    "
                >
                    <InputForm
                        id="noPeserta1"
                        type="number"
                        label="No Peserta"
                    />
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
                </div>
                <InputForm
                    id="noPeserta2"
                    type="number"
                    label="No Peserta"
                />
                <InputForm
                    id="noPeserta3"
                    type="number"
                    label="No Peserta"
                />
                <InputForm
                    id="noPeserta4"
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