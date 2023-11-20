import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./component/login"
import NewGroup from "./component/newGroup"
import NewContact from "./component/newContact"
import Home from "./component/home"
import ChatBord from "./component/sideBar"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getData } from './redux/api/api';

function App() { 
     const navigate=useNavigate();
     const dispatch=useDispatch();
   
     const loginStatus=window.localStorage.getItem("loginStatus");
     useEffect(async()=>{
          if (!loginStatus) {
            navigate("/login")
          }
          else{
            const token=window.localStorage.getItem("token");
            console.log(token);
            await dispatch(getData(token))
          }
     },[])


  return (
  <>
        <Routes >
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/newContact" exact element={<NewContact/>}></Route>
          <Route path="/newGroup" exact element={<NewGroup/>}></Route>
          <Route path="/home" exact element={<Home/>}></Route>
          </Routes >
 </>
  );

}

export default App;

