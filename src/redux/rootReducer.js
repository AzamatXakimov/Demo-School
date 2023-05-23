import { combineReducers } from "redux";
import {TokenReducer} from "./token/tokenReducer"

export const RootRedusers = combineReducers({
    token: TokenReducer,
})