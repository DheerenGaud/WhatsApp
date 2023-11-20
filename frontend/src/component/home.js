import React from 'react'
import Side from './side'
import Chat from './chat'
import "../style/chatbord.css"
export default function home() {
  return (
    <div className="container-full">
        <div className="col-lg-12">
        <div className="card chat-app">
         <Side/> 
         <Chat /> 
         </div>
        </div>
        </div> 
  )
}
