import axios from "../axios";

export const apiGetPosts = (config) => axios({
    url: '/post/getPosts',
    method: 'get',
    ...config,
});
export const apiGetPost = (pid) => axios({
    url: '/post/getCurrentPost',
    method: 'get',
    params: { pid }
})
export const apiGetComments = (pid) => axios({
    url: '/post/getCommentInPost/' + pid,
    method: 'get',
})
export const apiLikePost = (data) => axios({
    url: '/post/likePost',
    method: 'put',
    data
})
