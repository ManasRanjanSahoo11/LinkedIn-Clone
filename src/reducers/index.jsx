import { combineReducers } from "redux";

import userReducer from './userReducer'
import articleReducer from "./articleReducer";

const rootReducers = combineReducers({
    userState: userReducer,
    articleState: articleReducer
})

export default rootReducers;