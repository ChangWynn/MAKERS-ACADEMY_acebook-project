import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import UserBanner from '../userBanner/UserBanner';
import Navbar from '../navbar/Navbar';
import NewPostForm from '../newForm/NewPostForm';

import './Feed.css';


const Feed = ({ navigate }) => {
  const [userData, setUserData] = useState({})
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("")
  const [likes, setLikes] = useState(0) // to be used for count of like
  const [comments, setComments] = useState(0) // to be used for count of comments

  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts); 
          setUserData(data.user)
        })
    }
  }, [])
    

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const new_post = async (event) => {
    if (!newPost) return
    event.preventDefault();
    fetch( '/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({message: newPost})
    })
    .then(response => {
      if(response.status === 201) {
        navigate('/posts');
        window.location.reload(); // should be changed to be more React'ful
      } else {
        throw new Error('Failed to create post');
      }
    })
  }

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value);
  }

  if (token) {
    return(
      <>
        <Navbar logout={logout} />
        <div id='main-container' >
          <div id="user-banner-container">
            <UserBanner userData={userData} />
            <NewPostForm newPost={ newPost } handleNewPostChange={handleNewPostChange} new_post={new_post}/>
          </div>
          <div id='feed' role="feed">
            {posts.map(
              (post) => (<Post post={ post } key={ post._id } /> )
            )}
          </div>
        </div>     
      </>
    )
  } else {
    navigate('/signin')
  }
}

export default Feed;