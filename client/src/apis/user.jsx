import axios from "../axios";

export const apiGetCurrent = () => axios({
    url: '/user/getCurrent',
    method: 'get',
});

export const apiFollow = (data) => axios({
    url: '/user/follow',
    method: 'put',
    data
});

export const apiStatusFollow = (id, username) => axios({
    url: '/user/statusFollow',
    method: 'get',
    params: { id, username }
});