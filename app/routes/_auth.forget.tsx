import invariant from 'tiny-invariant';
import { useActionData } from '@remix-run/react';
import { Fragment } from 'react';
import { json, redirect } from '@remix-run/node';
import type { LinksFunction, LoaderArgs, V2_MetaFunction, ActionArgs } from '@remix-run/node';

import forgetPassword from "~/styles/routes/auth.forgetpassword.css"
import type { AuthError } from '~/utils/session.server';
import { getUserId } from '~/utils/session.server';
import type { TypedDictionary } from '~/utils/common.type';
import { normalizeError } from '~/utils/common.utils';
import { passwordReset } from '~/utils/session.server';

export let links: LinksFunction = () => {
    return [
        {
            rel: "stylesheet",
            href: forgetPassword,
        },
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

    let errors: TypedDictionary = {
        email: email ? null : "Email is required",
    }

    const hasErrors =
        Object.values(errors).some((errorMessage) => errorMessage)

    if (hasErrors)
        return json({
            errorCode: "auth/field-validation-failed",
            errorMessage: "Send Reset Password Email Error",
            errorFields: [...await normalizeError(errors)]
        })

    invariant(typeof email === "string", "Email must be a string")

    try {
        await passwordReset(email);
    } catch (error: any) {
        return json({
            errorCode: error.code,
            errorMessage: "User not found, try again!",
            errorFields: [{ email: "User not found, try again!" }]
        });
    }

    return json({
        successCode: "auth/send-password-reset-email",
        successMessage: `Please check your email for the reset password link.`
    })
}

export const meta: V2_MetaFunction = () => {
    return [{ title: "Remix App | Hands On - Forget Password" }]
}

export default function ForgetPassword() {
    const actionData = useActionData();

    let errorInfo =
        (actionData as AuthError)?.errorFields;

    let filterData: any | undefined = undefined;
    let errEmail: any | undefined = undefined

    filterData =
        errorInfo?.find((error) => error["email"] !== undefined);
    errEmail = filterData?.email;

    return (
        <Fragment>
            <section>
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                <div className="forget">
                    <div className="content">
                        <h2>Forget Password</h2>
                        <form method='post' className='form' noValidate>
                            <div className="inputBx">
                                <input type="email" id="email" name="email" required />
                                <label htmlFor='email'>Email</label>
                                {errEmail && <h3>{errEmail}</h3>}
                            </div>
                            <div className="inputBx">
                                <button type="submit">Reset Your Password</button>
                            </div>
                        </form>
                        {
                            actionData?.successCode && (
                                <h1> {actionData?.successMessage}</h1>
                            )
                        }
                    </div>
                </div>
            </section>
        </Fragment >
    )
}