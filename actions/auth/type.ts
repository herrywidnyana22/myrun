import { z } from "zod"
import { Panitia } from "@prisma/client"
import { initLogin } from "./init"
import { ActionState } from "@/lib/createAction"

export type InputLogin = z.infer<typeof initLogin>

export type ReturnTypeLogin = ActionState<InputLogin, Panitia>
