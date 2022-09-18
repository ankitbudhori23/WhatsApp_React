import { Avatar, IconButton} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./css/sidebar.css"
import { useStateValue } from './StateProvider';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import db from './firebase';
import {Link} from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';



function Sidebar_chat({id,name,addnewchat}) {
      
      // random number with seed
     const [seed, setSeed] = useState("");
      //      last message
     const [lastmessage, setLastMessage] = useState("");

     useEffect(()=>{
           setSeed(Math.floor(Math.random() * 999));

           db.collection("rooms").doc(id).collection("message").orderBy("timestamp","desc").
           onSnapshot(snapshot=>setLastMessage(snapshot.docs.map(doc=>doc.data())))
     },[])
     const [{user},dispatch] =useStateValue();
     const createchat=()=>{
           const room = prompt("Please Enter Room Name");
           if(room){
                 db.collection("rooms").doc(room).set({
                       name:room,
                       CreatedBy_Name:user.displayName,
                       CreatedBy_Email:user.email,
                       CreatedBy_Image:user.photoURL,
                       Created_On:firebase.firestore.FieldValue.serverTimestamp()
                 })
           }
     }
     
      return (
            !addnewchat ? (
                 <Link className="link" to={id}>
                  <MenuItem className="sidebar_chat">
                        <div className="chat_avatar">
                        <Avatar src={`https://avatars.dicebear.com/api/initials/${name}.svg`}/>  
                        </div>
                        <div className="chatinfo">
                              <h3>{name}</h3>
                              <p className='last-message'>{lastmessage[0]?.message}</p>
                        </div>
                  </MenuItem>
                  
                  </Link>
            ) :(
                 <div onClick={createchat} > 
                  <MenuItem className="add_chat">
                  <h2>Add New Chat</h2>
                  </MenuItem>
                  </div>
            )
      )
}
export default Sidebar_chat
