import axios from "../axios";

export const apiGetCurrent = () =>
  axios({
    url: "/user/getCurrent",
    method: "get"
  });

export const apiGetCurrentUser = id =>
  axios({
    url: `/user/get-user/${id}`,
    method: "get"
  });

export const apiGetFollower = (id, token) =>
  axios({
    url: `/user/get-follower/${id}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}` // Thay YOUR_TOKEN bằng token thực tế
    }
  });

export const apiGetFollowing = (id, token) =>
  axios({
    url: `/user/get-following/${id}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}` // Thay YOUR_TOKEN bằng token thực tế
    }
  });

export const apiGetAllUser = token =>
  axios({
    url: `/user/get-users`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}` // Thay YOUR_TOKEN bằng token thực tế
    }
  });

export const apiGetFriend = (token, id) =>
  axios({
    url: `/user/get-friends/${id}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}` // Thay YOUR_TOKEN bằng token thực tế
    }
  });

export const apiFollow = data =>
  axios({
    url: "/user/follow",
    method: "put",
    data
  });

export const apiRemoveToken = id =>
  axios({
    url: `/user/remove-token/${id}`,
    method: "put"
  });

export const apiStatusFollow = (id, username) =>
  axios({
    url: "/user/statusFollow",
    method: "get",
    params: { id, username }
  });

export const apiUpdateCurrent = (data, _id) => axios({
  url: `/user/current/${_id}`,
  method: 'put',
  data
})
