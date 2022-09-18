import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@material-ui/icons/Mic';
import "./css/chat.css";
import { useParams } from 'react-router-dom';
import db, { storage } from './firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { useStateValue } from './StateProvider';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
// For more options
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
// For upload Photos
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


export default function Chat() {
            const Input = styled('input')({
            display: 'none',
            });
      // for more option in menu
      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      // For Emoji
      const [anchorEmoji, setAnchorEmoji] = React.useState(null);
      const openE = Boolean(anchorEmoji);
      const openEmoji = (event) => {
            setAnchorEmoji(event.currentTarget);
          };
          const closeEmoji = () => {
            setAnchorEmoji(null);
          };

          const addEmoji = (e) => {  
            let sy = e.unified.split("-");  
            let codesArray = [];  
            sy.forEach((el) => codesArray.push("0x" + el));  
            let emoji = String.fromCodePoint(...codesArray);  
            setInput(input + emoji);  
          };  
     
           
      const { roomId } = useParams();
      const [roomName,setRoomName]=useState("");
      const [messages,setMessages]=useState([]);
      const [{user},dispatch] =useStateValue();
      const[input,setInput]= useState("");
      // auto scroll to new message
      const messagesEnd = useRef(null);
      useEffect(()=>{
            if(roomId){ 
                  db.collection("rooms").doc(roomId).onSnapshot(snapshot=>{
                        setRoomName(snapshot.data().name);
                  });

                  db.collection("rooms").doc(roomId).collection("message").orderBy("timestamp","asc").
                  onSnapshot(snapshot=>{
                        setMessages(snapshot.docs.map(doc=>doc.data()))
                  });
            
            }
      },[roomId])
      // auto scroll to new message
      useEffect(()=>{
            messagesEnd.current?.scrollIntoView();
      },[messages]);

      const sendMessage=(e)=>{
            e.preventDefault();
            if(input==="")
            {
                  return alert("Please Enter your Message")

            }
            db.collection("rooms").doc(roomId).collection("message").doc(input).set({
                  message:input,
                  name:user.displayName,
                  email:user.email,
                  timestamp:firebase.firestore.FieldValue.serverTimestamp()
            });
            setInput("");
      }
    
     
      return (
            <div className="chat">
                  <div className="chat_header">
                        <IconButton>
                        <Avatar src={`https://avatars.dicebear.com/api/initials/${roomName}.svg`}/>
                        </IconButton>
                        <div className="chat_headerinfo">
                             <h3>{roomName}</h3>
                              <p>
                              {
                              new Date(messages[messages.length-1]?.timestamp?.seconds*1000).
                              toLocaleTimeString([],{timeStyle: 'short'})
                              }
                              </p>
                        </div>
                        <div className="chat_headerright">
                              <IconButton>
                                    <SearchIcon/>
                              </IconButton>
                              <IconButton>
                                    <AttachFileIcon/>
                              </IconButton>
                              <IconButton>
                                    <MoreVertIcon/>
                              </IconButton>

                        </div>
                  </div>

                  <div className="chat_body">
                        {
                        messages.map(message=>(
                             
                        <>    
                            
                              {user.displayName==message.name &&
                              <div className="chat_r">
                              
                              <span className="chat_name">{message.name}</span>
                              {message.message}
                              <span className="chat_time">
                                    {
                                          new Date(message.timestamp?.seconds*1000).
                                          toLocaleTimeString([],{timeStyle: 'short'})
                                    }
                              </span>
                              </div>}

                              {user.displayName!==message.name && 
                              <div className="chat_message">
                              
                              <span className="chat_name">{message.name}</span>
                              {message.message}
                              <span className="chat_time">
                                    {
                                          new Date(message.timestamp?.seconds*1000).
                                          toLocaleTimeString([],{timeStyle: 'short'})
                                    }
                              </span>
                              </div>}
                        </>
                        ))
                        }
                       <div ref={messagesEnd}/>
                  </div>
                  
                  <div className="chat_footer">
                      
                        <React.Fragment>
                              <Tooltip title="Emoji">
                              <IconButton onClick={openEmoji}>
                              <EmojiEmotionsIcon/>
                              </IconButton>
                              </Tooltip>
                              <Menu
                                    anchorEl={anchorEmoji}
                                    open={openE}
                                    onClose={closeEmoji}
                                    PaperProps={{
                                    elevation: 5,
                                    sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: -10.5,
                                    "& .MuiAvatar-root": {
                                          width: 45,
                                          height: 45,
                                          ml: -0.5,
                                          mr: 1
                                    },
                                    "&:before": {
                                          content: '""',
                                          display: "block",
                                          position: "absolute",
                                          top: 375,
                                          right: 197,
                                          width: 10,
                                          height: 10,
                                          bgcolor: "background.paper",
                                          transform: "translateY(-50%) rotate(45deg)",
                                          zIndex: 0
                                    }
                                    }
                                    }}
                                    transformOrigin={{ horizontal: "center", vertical: "top" }}
                                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                              >
                                
                              <Picker set='google' onSelect={addEmoji}/>
                            
                              </Menu>
                        </React.Fragment>

                        <React.Fragment>
                              <Tooltip title="Add Files">
                              <IconButton onClick={handleClick}>
                              <AttachFileIcon/>
                              </IconButton>
                              </Tooltip>
                              <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                    elevation: 5,
                                    sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: -10.5,
                                    "& .MuiAvatar-root": {
                                          width: 45,
                                          height: 45,
                                          ml: -0.5,
                                          mr: 1
                                    },
                                    "&:before": {
                                          content: '""',
                                          display: "block",
                                          position: "absolute",
                                          top: 76.4,
                                          right: 20,
                                          width: 10,
                                          height: 10,
                                          bgcolor: "background.paper",
                                          transform: "translateY(-50%) rotate(45deg)",
                                          zIndex: 0
                                    }
                                    }
                                    }}
                                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                              >
                              <MenuItem>
                              <ListItemIcon>
                                   
                                    <label htmlFor="icon-button-file">
                                    <Input accept="image/*" id="icon-button-file" type="file"  />
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                    </IconButton>
                                    </label>  
                                    
                              </ListItemIcon>
                              </MenuItem>
                              </Menu>
                              </React.Fragment>


                              <form onSubmit={sendMessage}>
                              <input type="text" value={input} placeholder="Send a Message..."
                              onChange={e=>setInput(e.target.value)} />
                              <button className="send-message-btn" type="submit">
                              <SendIcon color="primary"/> 
                              </button>   
                              </form>
                        <IconButton>
                              <MicIcon/>
                        </IconButton>
                  </div>
            </div>
      )
}
