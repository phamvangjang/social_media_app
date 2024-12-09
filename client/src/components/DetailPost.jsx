import React, { useEffect, useState } from 'react'
import * as apis from '../apis'
import { useNavigate } from 'react-router-dom';
import { Comments } from '.';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { formatComment } from '@/utils/helpers';

const DetailPost = ({ data }) => {
    const [statusFollow, setStatusFollow] = useState(false);
    const { current } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const pid = data?.pid;
    const [post, setPost] = useState('');
    const fetchPost = async () => {
        const response = await apis.apiGetPost(pid);
        if (response?.success) setPost(response?.post);
    }
    const fetchComment = async () => {
        const response = await apis.apiGetComments(pid);
        if (response?.success) setComments(response?.comments);
    }
    const statusData = { id: current?._id, fid: post?.ownerId }
    const statusFollowFunc = async () => {
        const { id, fid } = statusData;
        const response = await apis.apiStatusFollow(id, fid);
        if (response.success) setStatusFollow(response.success);
    }
    useEffect(() => {
        if (pid) {
            fetchPost();
            fetchComment();
            statusFollowFunc();
            toggleFollow(data);
        }
        navigate(`/p/${data?.shortCode}`);
    }, [pid, post?.ownerId])
    const toggleFollow = async (data) => {
        const uid = current?._id;
        const pid = data;
        const payload = { uid, pid };
        try {
            const response = await apis.apiFollow(payload);
            console.log(response)
            if (response?.mes === 'Unfollowed successfully') setStatusFollow(false);
            else if (response?.mes === 'Followed successfully') setStatusFollow(true);
        } catch (error) {
            console.log('error at toggleFollow' + error)
        }
    }
    return (
        <div className='w-full flex'>
            <div className='flex-1'>
                <img crossOrigin='anonymous' className='object-cover h-[600px] w-full flex mx-auto' src={post?.displayUrl} />
            </div>
            <div className='flex-1 flex-col justify-between p-2 h-full relative'>
                <div className='flex flex-col'>
                    {/* Header */}
                    <div className='flex flex-col'>
                        <div className='flex items-center'>
                            <img crossOrigin='anonymous'
                                src="https://instagram.fsgn4-1.fna.fbcdn.net/v/t51.2885-19/118982623_353024589077161_7490638455124782637_n.jpg?stp=dst-jpg_tt6&_nc_ht=instagram.fsgn4-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=ejpoFY0pDsAQ7kNvgHoajPq&_nc_gid=60ae2c75195147dfabaf16d95bc0bc66&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCKcYOfOVyE-GkUBkEYfjJCBtpALC4lKNKMmr0s3YY51A&oe=6749CAE8&_nc_sid=7a9f4b"
                                alt="Profile picture"
                                className="w-10 h-10 rounded-full mr-3" />
                            <div>
                                <div className="font-bold">{post?.ownerUsername}
                                    <i className="fas fa-check-circle text-blue-500 ml-2 mr-2"></i>
                                    <span onClick={() => toggleFollow(post?._id, current?._id)} className='text-[#0095f6] font-semibold cursor-pointer hover:text-[#00376b]'>{statusFollow === true ? 'Đang theo dõi' : 'Theo dõi'}</span>
                                </div>
                            </div>
                            <i className="fas fa-ellipsis-h ml-auto"></i>
                        </div>
                        <div className='mt-3 border-gray-200 border-b-[1px]'></div>
                    </div>

                    {/* Comment */}
                    <Comments data={{ post: post, comments: comments }} />
                </div>

                {/* Footer */}
                <div className='flex flex-col absolute bottom-0 w-full'>

                    <span className='mb-1 border-gray-200 border-b-[1px]'></span>
                    <div className='pb-2'>
                        <div className="flex items-center mt-4">
                            <i className="far fa-heart text-2xl mr-4"></i>
                            <i className="far fa-comment text-2xl mr-4"></i>
                            <i className="far fa-paper-plane text-2xl"></i>
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500 text-sm font-bold">{`${formatComment(post?.likesCount)} lượt thích`}</div>
                        <div className="text-gray-500 text-sm">{moment(post?.timestamp).fromNow()}</div>
                    </div>
                    <div className="mt-4 flex justify-between w-full ">
                        <input type="text" placeholder="Thêm bình luận..." className="w-full border-none focus:outline-none" />
                        <button className="text-blue-500">Đăng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPost