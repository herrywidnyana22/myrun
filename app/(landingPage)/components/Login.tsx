'use client'

import ButtonForm from "@/components/form/butonForm";
import InputForm from "@/components/form/inputForm";
import { authenticate } from "@/lib/loginAction";
import { useFormState, useFormStatus } from "react-dom";

const Login = () => {

    // const [errorMessage, dispatch] = useFormState(authenticate, undefined)
    const { pending } = useFormStatus()

    return (
        <form
            // action={authenticate}
            className="
                flex
                flex-col
                gap-4
            "
        >
            <InputForm
                id="username"
                type="text"
                label="Username"
            />
            <InputForm
                id="password"
                type="password"
                label="Password"
            />
            <ButtonForm
                // disabled={pending}
            >
                Login
            </ButtonForm>
        </form>
    )
}
 
export default Login;