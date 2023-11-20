
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import {useDispatch,useSelector} from "react-redux"
import {fechContact} from "../redux/api/api"
import {setUserInfo} from "../redux/slice/loginSlice"
import { useNavigate } from 'react-router-dom';



export default (params) => {
  const navigate = useNavigate();

  const dispatch =useDispatch();
  const data=useSelector((state)=>state.login)

  console.log(data);
  const LoginSuccess=(res)=>{
    const decoded=jwtDecode(res.credential)
    dispatch(setUserInfo(decoded));
    dispatch(fechContact(decoded));
    console.log(decoded);
  }

  const LogInError=(err)=>{
   console.log(err);
  }

  return (
    <>
     <GoogleLogin  onSuccess={LoginSuccess} onError={LogInError}/>
     <img src={data.profilePic} alt="alternative-text" />
     <button onClick={()=>{navigate("/newGroup")}}>new Group</button>
     <button onClick={()=>{navigate("/newContact")}}>new Contact</button>
     </>
  );
}
