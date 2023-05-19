import type { TypedDictionary } from "./common.type";

const normalizeError = async (errors: TypedDictionary) => {
    const filterdKeys = Object.keys(errors).filter((k) => errors[k] !== null)
    if (!filterdKeys)
        return [];

    return filterdKeys.map((k) => ({ [k]: errors[k] }))
}

export {
    normalizeError
}