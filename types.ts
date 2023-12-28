import { Peserta, Panitia, Pos, Kategori } from "@prisma/client";

// export type PesertaData = Peserta & { pos: Pos[], kategori: Kategori[] }

export type PesertaData = {
    kategori: {
      id: string;
      namaKategori: string;
    } | null;

    pos: {
      id: string;
      namaPos: string;
    }[];

    id: string;
    noPeserta: string | null;
    waktu: string | null;
}

export type UserPos={
    id: string;
    kategori: {
        namaKategori: string;
    }
    namaPos: string;
    posFinish: boolean | null
}

export type posData={
    id: string;
    namaPos: string;
}

export type UserKategori = {
    pos: {
        kategori: {
            id: string;
            namaKategori: string;
        };
        id: string;
        namaPos: string;
    }[];
    id: string;
    namaPanitia: string
}

export type InputPesertaComponent = {
  id: string;
  [key: string]: string | any[]
}

export const ValidateMessage = {
    required: "Wajib diisi..!",
    
    exist: "Data sudah ada..!",
    sameField: "Tidak boleh sama..!",

    invalid : "Invalid...!",
    notSame : "Password tidak sama...!",

    passMin: "Minimal 8 karakter",
    passUpcase: "Minimal mengandung huruf kapital",
    passNumber: "Wajib mengandung angka",

    groupRequired: "Salah satu wajib diisi"
}

export const AlertMessage = {
    getSuccess: "Data berhasil ditemukan",
    addSuccess : "Data berhasil ditambahkan",
    removeSuccess : "Data berhasil dihapus",
    editSuccess : "Data berhasil diupdate",

    getFailed: "Gagal menemukan data ",
    addFailed : "Data gagal ditambahkan",
    removeFailed : "Data gagal dihapus",
    editFailed : "Data gagal diupdate",

    loginSuccess: "Logged in...",
    loginFailed: "Wrong Password or Username"
}

export type validationType = {
    e: React.ChangeEvent<HTMLInputElement>
    model: string
    setValidateMsg?: any
    validateMsg?: any
    setIsError?: any
    isEdit: string
}