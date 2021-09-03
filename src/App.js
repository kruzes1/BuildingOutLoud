import './App.css';
import   Header from './Components/Header/Header';
import Sidebar from './Components/sidebar';
import FileView from './Components/fileView/FileView';
import {db,auth} from './firebase';
import firebase from 'firebase/compat/app';
import { useEffect, useState } from 'react';
import sideIcon from './Components/sideIcon'
function App() {
  const [username,setUsername]=useState('');
  const [user,setUser] =useState(null);
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    const unsubscribse=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //userLogged In
        console.log(authUser);
        setUser(authUser);
        
        if(authUser.displayName){

        }
        else{
          return authUser.updateProfile({
            displayName:username,
          });
        }
      }
      else{
        //userLogged Out
        setUser(null);
      }
    })

    return ()=>{
      //perform somecleanup effect
      unsubscribse();
    }
  },[user,username])
  //useEfeccts runs peice of code based on specific function
  useEffect(()=>{
    
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{setPosts(snapshot.docs.map(doc => ({
      id:doc.id,
      post:doc.data()})))});      
 
  },[]);
  return (

    <div className="App">
      <Header />
      <div className="app__main">
              <Sidebar  user={user}/>
              <div className="app_post">
              {
              posts.map(({id,post}) => (
                <FileView key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
              ))

            }
           
            </div>
             <sideIcon/>
              
            </div>
    
      {/*no auth: log in */}
    </div>
  );
}

export default App;
