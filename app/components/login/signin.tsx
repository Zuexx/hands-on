import { Fragment, useEffect, useRef } from 'react';
import { useFetcher } from '@remix-run/react';

export default function SignIn() {
    const signIn = useFetcher();
    const ref = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (signIn.state === "idle"
            && signIn.data?.ok) {
            ref.current !== null && ref.current.reset();
        }
    }, [signIn]);

    return (
        <Fragment>
            <h1>Sign In Page</h1>
            <signIn.Form ref={ref} method='post' action="/login">
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
                <button type="submit">Sign In</button>
                {
                    signIn.data !== undefined
                    && <h1>{signIn.data.errorCode}</h1>
                }
            </signIn.Form>
        </Fragment>
    )
}