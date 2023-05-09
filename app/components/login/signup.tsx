import { Fragment, useEffect, useRef } from 'react';
import { useFetcher } from '@remix-run/react';

export default function SignUp() {
    const signUp = useFetcher();
    const ref = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (signUp.state === "idle"
            && signUp.data?.ok) {
            ref.current !== null && ref.current.reset();
        }
    }, [signUp]);

    return (
        <Fragment>
            <h1>Sign Up Page</h1>
            <signUp.Form method="post" action="/register">
                <p>
                    <label>
                        Email
                        <input type="email," name="email" />
                    </label>
                </p>
                <p>
                    <label>
                        Password
                        <input type="password" name="password" />
                    </label>
                </p>
                <p>
                    <label>
                        Confirm Password
                        <input type="password" name="confirm" />
                    </label>
                </p>
                <button type="submit">Sign Up</button>
                {
                    signUp.data !== undefined
                    && <h1>{signUp.data.errorCode}</h1>
                }
            </signUp.Form>
        </Fragment>
    )
}