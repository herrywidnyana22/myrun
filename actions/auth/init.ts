import { z } from "zod"

export const initLogin = z.object({
    username: z.string({
        required_error: "Wajib diisi!",
        invalid_type_error: "Wajib diisi"
    }),
    password: z.string({
        required_error: "Wajib diisi!",
        invalid_type_error: "Wajib diisi"
    }),
})
