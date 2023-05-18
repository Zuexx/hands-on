import { auth } from './firebase';
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import {
    confirmPasswordReset,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import type { User } from 'firebase/auth';

require("dotenv").config();

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set!");
}

type EmailPasswordCredential = {
    email: string,
    password: string
}

type AuthError = {
    errorCode?: string,
    errorMessage?: string,
    errorFields?: []
}

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        name: "__session",
        secure: process.env.NODE_ENV === "production",
        secrects: [sessionSecret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 5,
        httpOnly: true
    }
});

const loginWithEmailAndPassword = async ({ email, password }: EmailPasswordCredential) => {
    let user =
        await signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => userCredential.user)
            .catch(function (error): AuthError {
                let errorCode = error.code
                let errorMessage = error.message
                if (errorCode === "auth/weak-password") {
                    errorMessage = "The password is too weak"
                }
                return { errorCode, errorMessage }
            });

    return user;
}

const registerWithEmailAndPassword = async ({ email, password }: EmailPasswordCredential) => {
    let user =
        await createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => userCredential.user)
            .catch(function (error): AuthError {
                let errorCode = error.code
                let errorMessage = error.message
                if (errorCode === "auth/weak-password") {
                    errorMessage = "The password is too weak"
                }
                return { errorCode, errorMessage }
            });

    return user;
}

const passwordReset = async (email: string) => {
    return await sendPasswordResetEmail(auth, email)
}

const confirmThePasswordReset = async (
    oobCode: string, newPassword: string
) => {
    if (!oobCode && !newPassword) return;

    return await confirmPasswordReset(auth, oobCode, newPassword)
}

const getUserSession = (request: Request) => {
    return getSession(request.headers.get("Cookie"));
}

const getUserId = async (request: Request) => {
    let session = await getUserSession(request);
    if (!session)
        return null;

    let userId = session.get("userId");
    if (!userId || typeof userId !== "string")
        return null;
    return userId;
}

const requireUserId = async (
    request: Request,
    redirectTo: string = new URL(request.url).pathname) => {
    let session = await getUserSession(request);
    let userId = session.get("userId");
    if (!userId || typeof userId !== "string") {
        let searchParams = new URLSearchParams([
            ["redirectTo", redirectTo]
        ]);
        throw redirect(`/login?${searchParams}`);
    }
    return userId;
}

const getUser = async (request: Request) => {
    let userId = auth.currentUser?.email
    if (typeof userId !== "string") {
        return null;
    }

    try {
        let user = auth.currentUser
        onAuthStateChanged(auth, (user) => user)
        return user;
    } catch {
        throw logout(request);
    }
}

const logout = async (request: Request) => {
    signOut(auth);
    let session = await getSession(
        request.headers.get("Cookie")
    );
    return redirect("/login", {
        headers: {
            "Set-Cookie": await destroySession(session)
        }
    });
}

const createUserSession = async (
    userId: string | null,
    redirectTo: string) => {
    let session = await getSession();
    session.set("userId", userId);
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await commitSession(session)
        }
    });
}

const isAuthError = (user: User | AuthError) => {
    if (user === undefined)
        return false;

    let error = (user as AuthError).errorCode !== undefined;
    return error;
}

export {
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    passwordReset,
    confirmThePasswordReset,
    getUser,
    getUserId,
    requireUserId,
    logout,
    createUserSession,
    isAuthError,
    type EmailPasswordCredential,
    type AuthError
}