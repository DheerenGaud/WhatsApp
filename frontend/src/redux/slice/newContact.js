import { createSlice } from "@reduxjs/toolkit";
import {newContact} from "../api/api"
import {setUserContact} from "./loginSlice"

export const newContactSlice =  createSlice({
    name:'newContact',
    initialState:{
        email:"",
        msg:"",
        error:null
    },
    reducers:{
        handleChange:(state,action)=>{
            const { name, value } = action.payload.target;
            state[name] = value;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(newContact.fulfilled, (state, action) => {
            console.log(action);
            alert(action.payload.msg)
          });
        builder.addCase(newContact.rejected, (state, action) => {
            console.log(action);
            alert(action.payload.msg)
           })
    }
})

export const { handleChange } = newContactSlice.actions
export default newContactSlice.reducer