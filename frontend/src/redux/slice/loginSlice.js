import { createSlice } from "@reduxjs/toolkit";
import {fechContact,getData,newContact} from "../api/api"
export const logInSlice =  createSlice({
    name:'login',
    initialState:{
       Name:"",
       profilePic:"",
       email:"",
       contacts:[],
       token:""
    },
    reducers:{
        setUserInfo:(state,action)=>{
              state.Name=action.payload.given_name;
              state.profilePic=action.payload.picture;
              state.email=action.payload.email;
        },
        setUserContact:(state,action)=>{
          console.log(action.payload);
          state.contacts=action.payload
          }
    },    
        extraReducers:(builder)=>{
         builder.addCase(fechContact.fulfilled, (state, action) => {
            console.log(action.payload.data);
            state.token=action.payload.data.data.token
            state.contacts=action.payload.data.data.contacts
            window.localStorage.setItem("token", action.payload.data.data.token);
            window.localStorage.setItem("loginStatus", true);
          });
         builder.addCase(fechContact.rejected, (state, action) => {
            console.log(action.payload.data);
            alert(action.payload.data.data)
          });

         builder.addCase(newContact.fulfilled,(state, action)=>{
          state.contacts=action.payload.contacts
        })

         builder.addCase(getData.fulfilled,(state,action)=>{
          state.contacts=action.payload.contacts
         })
         builder.addCase(getData.pending,(state,action)=>{
          alert("Loading....")
         })
         builder.addCase(getData.rejected,(state,action)=>{
          alert(action.payload.msg)
         })
    }
})

export const { setUserInfo ,setUserContact} = logInSlice.actions


export default logInSlice.reducer