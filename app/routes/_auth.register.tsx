import invariant from 'tiny-invariant';
import { json } from '@remix-run/node';
import type {
    ActionArgs
} from '@remix-run/node';
import type { V2_MetaFunction } from "@remix-run/react";
import SignUp from "~/components/login/signup"
import type { EmailPasswordCredential } from '~/utils/session.server';
import { createUserSession, isAuthError } from '~/utils/session.server';
import { signUp } from '~/utils/session.server';
import type { TypedDictionary } from '~/utils/common.type';
import { normalizeError } from '~/utils/common.utils';
import type { User } from 'firebase/auth';

// import portfolio from "~/styles/routes/portfolio.css"

export const meta: V2_MetaFunction = () => {
    return [{ title: "Remix App | Hands On - Register" }]
}

// export let links: LinksFunction = () => {
//   return [
//     {
//       rel: "stylesheet",
//       href: portfolio,
//     },
//   ]
// }

// export let loader = async ({ request }: LoaderArgs) => {

// }

export let action = async ({ request }: ActionArgs) => {
    let formData = await request.formData()

    let email = formData.get("email")
    let password = formData.get("password")
    let confirmPassword = formData.get("confirm")

    const errors: TypedDictionary = {
        email: email ? null : "Email is required",
        password: password ? null : "Password is required",
        confirmPassword: confirmPassword ? null : "Confirm Password is required",
        notMatch: password === confirmPassword ? null : "Password and Confirm Password not matched"
    }

    const hasErrors = Object.values(errors).some((errorMessage) => errorMessage)
    if (hasErrors)
        return json({
            errorCode: "auth/field-validation-failed",
            errorMessage: "Register Form Error",
            errorFields: [...await normalizeError(errors)]
        })

    invariant(typeof email === "string", "Email must be a string")
    invariant(typeof password === "string", "Password must be a string")

    let credential: EmailPasswordCredential = {
        email, password
    }

    let user = await signUp(credential)
    if (isAuthError(user))
        return user
    else {
        const { uid } = user as User;
        return await createUserSession(uid, "/");
    }
}

export default function Register() {
    return (
        <SignUp />
    )
}
