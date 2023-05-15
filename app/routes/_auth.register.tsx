import invariant from 'tiny-invariant';
import { json, redirect } from '@remix-run/node';
import type {
    ActionArgs
    , LinksFunction
    , LoaderArgs
} from '@remix-run/node';
import type { V2_MetaFunction } from "@remix-run/react";
import { SignUp, links as register } from "~/components/auth/signup"
import type { EmailPasswordCredential } from '~/utils/session.server';
import { getUserId } from '~/utils/session.server';
import { createUserSession, isAuthError } from '~/utils/session.server';
import { registerWithEmailAndPassword } from '~/utils/session.server';
import type { TypedDictionary } from '~/utils/common.type';
import { normalizeError } from '~/utils/common.utils';
import type { User } from 'firebase/auth';

export const meta: V2_MetaFunction = () => {
    return [{ title: "Remix App | Hands On - Register" }]
}

export let links: LinksFunction = () => {
    return [
        ...register(),
    ]
}

export let loader = async ({ request }: LoaderArgs) => {
    const userId = await getUserId(request);
    if (userId) return redirect("/");
    return json({});
}

export let action = async ({ request }: ActionArgs) => {
    let formData = await request.formData()

    let email = formData.get("email")
    let password = formData.get("password")
    let confirmPassword = formData.get("confirm")

    const errors: TypedDictionary = {
        email: email ? null : "Email is required",
        password: password ? null : "Password is required",
        confirmPassword: confirmPassword ? null : "Confirm Password is required",
        notMatch: password === confirmPassword ? null : "Password not matched"
    }

    const hasErrors = Object.values(errors).some((errorMessage) => errorMessage)
    console.log(errors)
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

    let user = await registerWithEmailAndPassword(credential)
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
