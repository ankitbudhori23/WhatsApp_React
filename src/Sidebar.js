import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState} from 'react'
import "./css/sidebar.css"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import Sidebar_chat from './Sidebar_chat';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
// For more options
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';




function Sidebar() {
      const [rooms, setRooms] = useState([]);
      const[{user},dispatch] =useStateValue();
                  useEffect(()=>{
                        db.collection("rooms").onSnapshot(snapshot=>{
                              setRooms(snapshot.docs.map(doc=>({
                                    id:doc.id,
                                    data:doc.data()
                              })))
                        })
                        
                  },[])
      // for more option in menu
      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const [searchTerm,setSearchTerm]=useState("");
      return (
            <div className="sidebar">
                  <div className="sidebar_header">
                        <Tooltip title={user.displayName} placement="right" arrow>
                        <IconButton>
                        <Avatar src={user.photoURL} />
                        </IconButton>
                        </Tooltip>

                        <div className="sidebar_header_right">

                              <Tooltip title="Status">
                              <IconButton>
                              <DonutLargeIcon/>
                              </IconButton>
                              </Tooltip>

                              <Tooltip title="">
                              <IconButton> 
                              <ChatIcon/>
                              </IconButton>
                              </Tooltip>

                              <React.Fragment>
                              <Tooltip title="More Options">
                              <IconButton onClick={handleClick}>
                              <MoreVertIcon/>
                              </IconButton>
                              </Tooltip>
                              <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                    elevation: 3,
                                    sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
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
                                          top: 0,
                                          right: 18,
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
                             
                              <div className='main-sidebar-img'>
                              <Avatar src={user.photoURL}/>
                              </div>
                              <div className='main-sidebar-name'>
                              <strong>{user.displayName}</strong><br/>
                              {user.email}
                              </div>
                             
                              <Divider />
                              <MenuItem>
                              <ListItemIcon>
                              <PersonAdd />
                              </ListItemIcon>
                              Add another account    
                              </MenuItem>
                        
                              <MenuItem>
                              <ListItemIcon>
                              <Settings />
                              </ListItemIcon>
                              Settings
                              </MenuItem>
                        
                              <MenuItem onClick={e=>firebase.auth().signOut()}>
                              <ListItemIcon>
                              <Logout />
                              </ListItemIcon>
                              Logout
                              </MenuItem>
                              </Menu>
                              </React.Fragment>

                        </div>
                  </div>


                  <div className="sidebar_search">
                        <div className="sidebar_search_a">  
                        <SearchIcon/>
                        <input type="text" placeholder="Search or Start a new Chat" onChange={(event)=>{
                              setSearchTerm(event.target.value);
                        }}/>
                        </div>
                  </div>
                  <div className="sidebar_chats">
                        <Sidebar_chat addnewchat/>
                        {
                              rooms
                              // .filter((val)=>{
                              //       if(searchTerm==""){
                              //             return val
                              //       }else if(.toLowerCase().includes(searchTerm.toLowerCase())){
                              //             return val
                              //       }
                              // })
                              .map(room=>{
                                    return <Sidebar_chat key={room.id} id={room.id} name={room.data.name}
                                    image={room.data.CreatedBy_Image}/>
                              })
                        }
                        
                      
                  </div>
            </div>
            
      )
}

export default Sidebar

