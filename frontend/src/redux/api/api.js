import axios from "axios"
import {createAsyncThunk} from "@reduxjs/toolkit"


const BACKEND_URL="http://localhost:9000"

export const fechContact=createAsyncThunk("fechContact",async(data)=>{
        return await axios.post(`${BACKEND_URL}/login`,data);
})
export const newContact = createAsyncThunk("newContact", async({ contact, token },{rejectWithValue}) => {
        // console.log(token);
        try {
          const responce= await axios.post(`${BACKEND_URL}/newContact`, contact, {
            headers: {
              'Authorization': `${token}`
            }
          });
        
          return responce.data;
        } catch (err) {
          console.log(err.response);
          return rejectWithValue(err.response?err.response.data:"uncknown error")
        }
     
});
export const newGroup= createAsyncThunk("newGroup",async({group,token},{rejectWithValue})=>{
  const { GroupName,profilePic,User} =group
  const formdata=new FormData();
  console.log("profilePic");
  if(profilePic==null){
    console.log(profilePic);
    formdata.append("profilePic",null);
  }
  else{
    formdata.append("profilePic",profilePic,profilePic.name);
  }

  formdata.append('GroupName',GroupName)
  formdata.append('User',User)
  try{
    const responce= await axios.post(`${BACKEND_URL}/newGroup`,formdata, {
      headers: {
        'Authorization': `${token}`
      }
    });
    return responce.data;
  }
  catch(err){
    console.log(err.response);
    return rejectWithValue(err.response?err.response.data:"uncknown error")
  }
});


export const getData = createAsyncThunk("getData", async ( token , { rejectWithValue }) => {

  try {
    const response = await axios.get(`${BACKEND_URL}/getData`, {
      headers: {
        'Authorization': `${token}`
      }
    });
    console.log(response);
    return response.data;
  } catch (err) { 
    console.error(err.response);
    return rejectWithValue(err.response ? err.response.data : "unknown error");
  }
});
