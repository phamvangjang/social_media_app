import axios from "../axios";

export const apiGetPosts = config =>
  axios({
    url: "/post/getPosts",
    method: "get",
    ...config
  });
export const apiGetPost = pid =>
  axios({
    url: "/post/getCurrentPost",
    method: "get",
    params: { pid }
  });
export const apiGetComments = pid =>
  axios({
    url: "/post/getCommentInPost/" + pid,
    method: "get"
  });
export const apiLikePost = data =>
  axios({
    url: "/post/likePost",
    method: "put",
    data
  });

export const apiLikeComment = data =>
  axios({
    url: "/post/likeComment",
    method: "put",
    data
  });

export const apiCommentPost = data =>
  axios({
    url: "/post/commentPost",
    method: "post",
    data
  });

export const apiCreatePost = data =>
  axios({
    url: "/post/create",
    method: "post",
    data
  });

export const apiGetPostsByuid = id =>
  axios({
    url: `/post/getPostsByuid/${id}`,
    method: "get"
  });

export const apiGetPostsByShortCode = id =>
  axios({
    url: `/post/getPostsByShortCode/${id}`,
    method: "get"
  });
