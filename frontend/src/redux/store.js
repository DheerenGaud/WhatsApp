import {configureStore} from "@reduxjs/toolkit";
import login from "./slice/loginSlice"
import newContact from "./slice/newContact"
import newGroup from "./slice/newGroup"
import chat from "./slice/chatSlice"

export default configureStore({
    reducer:{
        login,
        newContact,
        newGroup,
        chat
    }
})