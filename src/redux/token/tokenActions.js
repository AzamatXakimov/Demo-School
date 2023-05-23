import {ADD_TOKEN, DELETE_TOKEN} from "./tokenTypes";

export const addToken = (token) => {
    return {
        type: ADD_TOKEN,
        payload: token,
    }
}

export const deleteToken = () => {
    return {
        type: DELETE_TOKEN,
        payload: "",
    }
}