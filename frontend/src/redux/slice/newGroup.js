import { createSlice } from "@reduxjs/toolkit";
import {newGroup} from "../api/api"

export const newGroupSlice =  createSlice({
    name:'newContact',
    initialState:{
        GroupName:"",
        profilePic:null,
        User:[],
        error:null,

    },
    reducers:{
        handleProfileChange:(state,action)=>{
           state.profilePic=action.payload.target.files[0]
        },
        handleChange:(state,action)=>{
            const { name, value } = action.payload.target;
            state[name] = value;
        },
        handleUserChange:(state,action)=>{
            state.User=action.payload;
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(newGroup.fulfilled, (state, action) => {
            console.log(action);
            alert(action.payload.msg)
          });
        builder.addCase(newGroup.rejected, (state, action) => {
            console.log("action");
            alert(action.payload.msg)
           })
    }
})

export const { handleChange,handleProfileChange,handleUserChange} = newGroupSlice.actions
export default newGroupSlice.reducer