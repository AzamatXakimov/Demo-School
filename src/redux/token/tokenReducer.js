import {ADD_TOKEN, DELETE_TOKEN} from "./tokenTypes";

const initialStateToken = {
    token: localStorage.getItem("token") || ""
};

export const TokenReducer = (state=initialStateToken, action) => {
    switch  (action.type) {
        case ADD_TOKEN:
            return {
                ...state, 
                token: action.payload,
            };
        case DELETE_TOKEN: 
            return {
                ...state,
                token: "",
            };
        default: return state
    }
}