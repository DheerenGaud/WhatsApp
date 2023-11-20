import { createSlice } from "@reduxjs/toolkit";

export const chatSlice =  createSlice({
    name:'chat',
    initialState:{
       Name:"",
       time:"",
       profilePic:"",
       Notification:-1,
       data:[],
       user_id:"",
       group_id:"",
       key:"",
       status:""
    },
    reducers:{
        setData:(state,action)=>{
            console.log(action.payload);
        }
    },
   
})

export const { setData } = chatSlice.actions
export default chatSlice.reducer