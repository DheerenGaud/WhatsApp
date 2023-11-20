import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux"
import '../style/chatbord.css';
import {setData} from "../redux/slice/chatSlice"

export default function Side() {

   
    const [currentMsg ,setCurrentMsg]= useState("");
    const user=useSelector((state)=>state.login)
    const dispatch=useDispatch();

    const [contacts, setContacts] = useState([
        { id: 1, name: 'Vincent Porter', status: 'offline' },
        { id: 2, name: 'Aiden Chavez', status: 'online' },
        { id: 3, name: 'Mike Thomas', status: 'online' },
        { id: 4, name: 'Christian Kelly', status: 'offline' },
        { id: 5, name: 'Monica Ward', status: 'online' },
        { id: 6, name: 'Dean Henry', status: 'offline' },
       
        { id: 4, name: 'Christian Kelly', status: 'offline' },
        { id: 5, name: 'Monica Ward', status: 'online' },
        { id: 6, name: 'Dean Henry', status: 'offline' },
       
        { id: 4, name: 'Christian Kelly', status: 'offline' },
        { id: 5, name: 'Monica Ward', status: 'online' },
        { id: 6, name: 'Dean Henry', status: 'offline' },
        { id: 4, name: 'Christian Kelly', status: 'offline' },
        { id: 5, name: 'Monica Ward', status: 'online' },
       
       
      ]);

      const handleChange=(e)=>{
        setCurrentMsg(e.target.value)
      }
    
      const [selectedContact, setSelectedContact] = useState({
        id: 2,
        name: 'Aiden Chavez',
        status: 'online',
      });
    
      const [messages, setMessages] = useState([
        { sender: 'Aiden Chavez', text: 'Hi there!', time: '10:10 AM' },
        { sender: 'You', text: 'Hello Aiden! How are you?', time: '10:12 AM' },
        { sender: 'Aiden Chavez', text: 'I\'m good! How about you?', time: '10:15 AM' },
      ]);
    
      const [searchTerm, setSearchTerm] = useState('');
    
      const handleContactClick = (contact) => {
        setSelectedContact(contact);
        dispatch(setData(contact))

      };
    
      const handleSendMessage = () => {
        const newMessage = {
          sender: 'You',
          text:currentMsg,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setCurrentMsg("")
        setMessages([...messages, newMessage]);
      };
    
      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };
    
      useEffect(() => {
        const filteredContacts = contacts.filter(contact =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setContacts(filteredContacts);
       }, [searchTerm]);


      useEffect(()=>{
        setContacts(user.contacts);

      },[user.contacts])


  return (
    <div id="plist" className="people-list">

    <div className="input-group">
        <div className="input-group-prepend">
            <span className="input-group-text p-3"><i className="fa fa-search"></i></span>
        </div>
        <input type="text" className="form-control" placeholder="Search..."  value={searchTerm}
  onChange={handleSearch}  />
    </div>
    <ul className="list-unstyled chat-list  mb-0 overflow-y-scroll " style={{height:'88vh'}} data-bs-smooth-scroll="true">
    {contacts.map(contact => (
  <li
    key={contact.id}
    className={`clearfix ${selectedContact.id === contact.id ? 'active' : ''}`}
    onClick={() => handleContactClick(contact)}
  >
    <img
      src={`${contact.profilePic}`}
      alt="avatar"
    />
    <div className="about">
      <div className="name">{contact.Name}</div>
      <div className={`status ${contact.status === 'online' ? 'online' : 'offline'}`}>
        <i className={`fa fa-circle ${contact.status === 'online' ? 'online' : 'offline'}`}></i>{' '}
        {contact.status === 'online' ? 'online' : 'offline'}
      </div>
    </div>
  </li>
))}
    </ul>
</div>
  )
}
