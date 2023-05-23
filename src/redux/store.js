import { createStore } from "redux";
import {RootRedusers} from "./rootReducer"

const store = createStore(RootRedusers)

export default store;