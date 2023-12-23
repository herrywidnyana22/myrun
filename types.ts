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