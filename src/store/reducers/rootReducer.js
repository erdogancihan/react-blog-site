import {combineReducers} from "redux";
import articles from "./articlesReducer"
import messages from "./messagesReducer"
import users from "./usersReducer";
import language from "./languageReducer"

const rootReducer=combineReducers({
    articles,
    messages,
    users,
    language
})
export default rootReducer;