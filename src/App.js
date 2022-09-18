
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import React, { useEffect } from "react";
import Login from './Login';
import { BrowserRouter as Router ,Switch, Route} from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import Chat_no from './Chat_no';

function App() {
    const [{user},dispatch] = useStateValue();
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            dispatch({
                type:"SET_USER",
                user:user
            })
        })
    },[])
return (
    <Router>
        <Switch>
            { !user ?(<Login/>):(
                    <div className="App">
                    <div className="app_body">
                       <Sidebar/>
                   
                       <Route exact path="/">
                        <Chat_no/>
                        </Route>
       
                        <Route path="/:roomId">
                        <Chat/>
                        </Route>
                    </div>
                    </div>)
            }
            
        </Switch>
    </Router>
);
}
export default App;
