import axios from 'axios';

import { GET_POSTS,
     POST_ERROR,
     UPDATE_LIKES,
     ADD_POST,
    DELETE_POST,
    GET_POST ,
    ADD_COMMENT,
     DELETE_COMMENT

 } from './types';
 import { setAlert } from './alert';
//getPosts
 export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    const dis = dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
    console.log(dis);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};
//getPost a single post
 export const getPost = id => async (dispatch) => {
  console.log(id);
  try {
    const res = await axios.get(`/api/posts/${id}`);
    const dis = dispatch({
      type: GET_POST,
      payload: res.data,
    });
    console.log(dis);
    console.log(res);
  


  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};
//update likes
export const addLike =id=> async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    const dis = dispatch({
      type: UPDATE_LIKES,
      payload: {id,likes:res.data},
    });
    console.log(dis);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};
//Remove likes
export const removeLike =id=> async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    const dis = dispatch({
      type: UPDATE_LIKES,
      payload: {id,likes:res.data},
    });
    console.log(dis);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};
//Delete Post
export const deletePost =id=> async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);
    const dis = dispatch({
      type: DELETE_POST,
      payload:id,
    });
    dispatch(setAlert('Post removed','success'));
    console.log(dis);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};
//Add Post
export const addPost =(formData)=> async (dispatch) => {
    const config={
        headers:{
            'Content-type':'application/json'
        }
        
    }
  try {
    const res = await axios.post(`/api/posts/`,formData,config);
    const dis = dispatch({
      type: ADD_POST,
      payload:res.data,
    });
    dispatch(setAlert('Post Created','success'));
    console.log(dis);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};
//Add Comment
export const addComment =(postId,formData)=> async (dispatch) => {
  const config={
      headers:{
          'Content-type':'application/json'
      }
      
  }
try {
  const res = await axios.post(`/api/posts/comment/${postId}`,formData,config);
  const dis = dispatch({
    type: ADD_COMMENT,
    payload:res.data,
  });
  dispatch(setAlert('Comment Added','success'));
  console.log(dis);
} catch (err) {
  dispatch({
    type: POST_ERROR,
    payload: { msg: err.response.data.msg, status: err.response.status },
  });
}
};
//Delete Comment
export const deleteComment =(postId,commentId)=> async (dispatch) => {
try {
  const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
  const dis = dispatch({
    type: DELETE_COMMENT,
    payload:commentId,
  });
  dispatch(setAlert('Comment deleted','success'));
  console.log(dis);
} catch (err) {
  dispatch({
    type: POST_ERROR,
    payload: { msg: err.response.data.msg, status: err.response.status },
  });
}
};