import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux"
import '../style/chatbord.css';


const Sidebar = () => {
  
    const [currentMsg ,setCurrentMsg]= useState("");
    const user=useSelector((state)=>state.login)

    const [contacts, setContacts] = useState([
        { id: 1, name: 'Vincent Porter', status: 'offline' },
        { id: 2, name: 'Aiden Chavez', status: 'online' },
        { id: 3, name: 'Mike Thomas', status: 'online' },
        { id: 4, name: 'Christian Kelly', status: 'offline' },
        { id: 5, name: 'Monica Ward', status: 'online' },
        { id: 6, name: 'Dean Henry', status: 'offline' },
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
        // Filtering contacts based on the search term
        const filteredContacts = contacts.filter(contact =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        // Update the contacts list with the filtered results
        setContacts(filteredContacts);
      }, [searchTerm]);

      // useEffect(()=>{
      //     setContacts(user.contacts);
      // },[])


  return (
    <div className="container">
        <div className="col-lg-12">
            <div className="card chat-app">
                <div id="plist" className="people-list">

                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fa fa-search"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Search..."  value={searchTerm}
                  onChange={handleSearch}  />
                    </div>
                    <ul className="list-unstyled chat-list mt-2 mb-0">
                    {contacts.map(contact => (
                  <li
                    key={contact.id}
                    className={`clearfix ${selectedContact.id === contact.id ? 'active' : ''}`}
                    onClick={() => handleContactClick(contact)}
                  >
                    <img
                      src={`https://bootdey.com/img/Content/avatar/avatar${contact.id}.png`}
                      alt="avatar"
                    />
                    <div className="about">
                      <div className="name">{contact.name}</div>
                      <div className={`status ${contact.status === 'online' ? 'online' : 'offline'}`}>
                        <i className={`fa fa-circle ${contact.status === 'online' ? 'online' : 'offline'}`}></i>{' '}
                        {contact.status === 'online' ? 'online' : 'offline'}
                      </div>
                    </div>
                  </li>
                ))}
                    </ul>
                </div>
                <div className=" chat">
                    <div className="chat-header clearfix">
                        <div className="row">
                            <div className="col-lg-6">
                                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                <img
                               src={`https://bootdey.com/img/Content/avatar/avatar${selectedContact.id}.png`}
                              alt="avatar"
                                  />                                </a>
                                <div className="chat-about">
                                    <h6 className="m-b-0">{selectedContact.name}</h6>
                                    <small>Last seen: 2 hours ago</small>
                                </div>
                            </div>
                            <div className="col-lg-6 hidden-sm text-right">
                                <a href="javascript:void(0);" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></a>
                                <a href="javascript:void(0);" className="btn btn-outline-primary"><i className="fa fa-image"></i></a>
                                <a href="javascript:void(0);" className="btn btn-outline-info"><i className="fa fa-cogs"></i></a>
                                <a href="javascript:void(0);" className="btn btn-outline-warning"><i className="fa fa-question"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="chat-history ">
                        <ul className="m-b-0">
                        {messages.map((message, index) => (
                    <li key={index} className="clearfix" >
                      <div className={`message-data ${message.sender === 'You' ? ' text-right' : ''}`}>
                        <div  className={`message-data-time ${message.sender === 'You' ? 'float-right' : ' '}`}>{message.time}</div>
                      </div>
                      <div className={`message ${message.sender === 'You' ? 'other-message float-right' : 'my-message'}`}>
                        {message.text}
                      </div>
                    </li>
                  ))}
                        </ul>
                    </div>
                    <div className="chat-message  position-sticky">
                        <div className="input-group mb-0 ">
                            <div className="input-group-prepend">
                            <span className="input-group-text" onClick={ handleSendMessage}>
                      <i className="fa fa-send"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter text here..."
                    value={currentMsg}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                        e.target.value = '';
                      }
                    }}
                  />
                   </div>
                    </div>
                </div>
            </div>
    </div>
    </div>
  );
};

export default Sidebar;
