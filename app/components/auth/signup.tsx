import { Fragment, useEffect, useRef } from 'react';
import { Link, useFetcher } from '@remix-run/react';

import signUp from "~/styles/components/auth.signup.css"
import type { AuthError } from '~/utils/session.server';
import type { LinksFunction } from '@remix-run/node';

export let links: LinksFunction = () => {
    return [
        {
            rel: "stylesheet",
            href: signUp,
        },
    ]
}

export function SignUp() {
    const signUp = useFetcher();
    const ref = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (signUp.state === "idle"
            && signUp.data?.ok) {
            ref.current !== null && ref.current.reset();
        }
    }, [signUp]);

    let filterData: any | undefined = undefined;
    let errEmail: any | undefined = undefined
    let errPassword: any | undefined = undefined
    let errConfirm: any | undefined = undefined
    let errNotMatch: any | undefined = undefined

    let errorInfo =
        (signUp.data as AuthError)?.errorFields;

    filterData =
        errorInfo?.find((error) => error["email"] !== undefined);
    errEmail = filterData?.email;

    filterData =
        errorInfo?.find((error) => error["password"] !== undefined);
    errPassword = filterData?.password;

    filterData =
        errorInfo?.find((error) => error["confirmPassword"] !== undefined);
    errConfirm = filterData?.confirmPassword;

    filterData = errorInfo?.find((error) => error["notMatch"] !== undefined);
    errNotMatch = filterData?.notMatch;

    return (
        <Fragment>
            <section>
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                <div className="signup">
                    <div className="content">
                        <h2>Sign Up</h2>
                        <signUp.Form ref={ref} method='post' action="/register" className='form' noValidate>
                            <div className="inputBx">
                                <input type="email" id="email" name="email" required />
                                <label htmlFor='email'>Email</label>
                                {errEmail && <h3>{errEmail}</h3>}
                            </div>
                            <div className="inputBx">
                                <input type="password" id="password" name="password" required />
                                <label htmlFor='password'>Password</label>
                                {errPassword && <h3>{errPassword}</h3>}
                            </div>
                            <div className="inputBx">
                                <input type="password" id="confirm" name="confirm" required />
                                <label htmlFor='confirm'>Confirm Password</label>
                                {errConfirm && <h3>{errConfirm}</h3>}
                                {errNotMatch && <h3>{errNotMatch}</h3>}
                            </div>
                            <div className="links">
                                <Link to="/login">Already have an account?</Link>
                            </div>
                            <div className="inputBx">
                                <button type="submit">Register</button>
                            </div>
                        </signUp.Form>
                        {
                            signUp.data !== undefined
                            && <h1>{signUp.data?.errorCode}</h1>
                        }
                    </div>
                </div>
            </section>
        </Fragment>
    )
}