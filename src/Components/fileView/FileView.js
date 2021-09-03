import React from 'react'
import { useEffect, useState } from 'react';
import '../../Styles/FileView.css'
import Avatar from '@material-ui/core/Avatar';
import {db} from '../../firebase';
import firebase from 'firebase/compat/app';
import { Button } from '@material-ui/core';

function FileView({postId,user,username,caption,imageUrl}) {
    const [comments,setComments]=useState([]);
    const [comment,setComment]=useState('');
    useEffect(()=>{
        db.collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snap) => {
          setComments(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
       
    
    
},[postId]);
    const postComment=(event)=>{
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text:comment,
            username:user.displayName,
            timestam:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setComment('');
    }
    return (
        <div className="post" >
        <div className="post__header">
        <Avatar
            className="post__avatar"
            alt='RafehQazi'
            src="https://pbs.twimg.com/profile_images/1268956476292268038/pcd90R0K.jpg"
        />
        <h3>{username}</h3>
        </div>
        {/* header ->avatar + username */}
        <img className="post__image"
        src={imageUrl}
        alt=""
        />
       
        <h4 className="post__text"><strong>{username}</strong> {caption} </h4>
        <Button className="file__button">Get Files!!</Button>
        <div className="post__comments">
            {
               
                comments.map((comment)=>{
                    <p>
                         <h1>Hello</h1>
                        <strong>{comment.username}</strong>{comment.text}
                    </p>
                })
            }
        </div>
        <from className="post__commentBox">
            <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            />
            <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
            >Post</button>
        </from>    
    </div>
    )
}

export default FileView
