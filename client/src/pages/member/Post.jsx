import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import * as apis from '../../apis'
import moment from 'moment';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { formatComment } from '@/utils/helpers';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DetailPost } from '../../components';
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const Post = () => {
    const { current } = useSelector((state) => state.user)
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const fetchPosts = async () => {
        try {
            const response = await apis.apiGetPosts({ params: { page, limit: 5 } });
            setPosts((prevPosts) => [...prevPosts, ...response?.posts ]);
            setHasMore(response?.hasMore)
        } catch (error) {
            console.log('error at fetchPosts ' + error)
        }
    }
    useEffect(() => {
        fetchPosts();
    }, [page])
    const handleToggleExpand = (index) => {
        // Toggle the current caption; collapse it if already expanded
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    const toggleLikePost = async (data) => {
        const uid = current?._id;
        const pid = data;
        const payload = { uid, pid };
        console.log(payload)
        // try {
        //     const responseLikePost = await apis.apiLikePost(payload);
        //     const updatePost = responseLikePost?.post;
        //     setPosts((prevPosts) => {
        //         prevPosts.map((post) =>
        //             post?._id === data ? updatePost : post
        //         )
        //     });
        // } catch (error) {
        //     console.log('error at toggle like post ' + error)
        // }
    }
    return (
        <div>
            <InfiniteScroll
                dataLength={posts?.length}
                next={() => setPage((prevPage) => prevPage + 1)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={hasMore === false && <p className='text-center'>{response?.mess}</p>}
            >
                {posts?.map((el, index) => (
                    <div key={el?.id} className="bg-white border border-gray-200 rounded-lg p-4 mb-2">
                        <div className="flex items-center mb-4">
                            <img crossOrigin='anonymous' src="https://instagram.fsgn4-1.fna.fbcdn.net/v/t51.2885-19/118982623_353024589077161_7490638455124782637_n.jpg?stp=dst-jpg_tt6&_nc_ht=instagram.fsgn4-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=ejpoFY0pDsAQ7kNvgHoajPq&_nc_gid=60ae2c75195147dfabaf16d95bc0bc66&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCKcYOfOVyE-GkUBkEYfjJCBtpALC4lKNKMmr0s3YY51A&oe=6749CAE8&_nc_sid=7a9f4b" alt="avatar" className="w-8 h-8 rounded-full mr-2 object-contain" />
                            <span className="font-bold">{el?.ownerUsername}</span>
                            <span className="text-gray-500 ml-2">{moment(el?.timestamp).fromNow()}</span>
                            <i className="fas fa-ellipsis-h ml-auto"></i>
                        </div>
                        {el?.type !== 'Sidecar'
                            ? <img crossOrigin='anonymous' src={el?.displayUrl} alt={el?.alt} className="w-full mb-4 object-contain" />
                            : <Carousel className="w-full max-w-xs">
                                <CarouselContent>
                                    {el?.images.map((ix, index) => (
                                        <CarouselItem key={index}>
                                            <img crossOrigin='anonymous' src={ix} alt="" className="w-full mb-4 object-contain" />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>}

                        <div className="flex items-center space-x-4 mb-2">
                            <span className='cursor-pointer' onClick={() => toggleLikePost(el?._id)}>
                                {el?.arrayUserLike.includes(current?._id)
                                    ? (<FaHeart size={26} color="#ff2929" />)
                                    : (<CiHeart size={26} />)}
                            </span>
                            <i className="far fa-comment cursor-pointer"></i>
                            <i className="far fa-paper-plane cursor-pointer"></i>
                        </div>
                        <div className="text-sm font-bold mb-2">{`${formatComment(el?.likesCount)} lượt thích`}</div>
                        <div className="text-sm">
                            <span className="font-bold">{el?.ownerUsername}</span>
                            <p>
                                {expandedIndex === index ? (<>
                                    {el?.caption}{' '}
                                    <span className="cursor-pointer italic hover:underline" onClick={() => handleToggleExpand(index)}>
                                        Thu gọn
                                    </span>
                                </>) : (<>
                                    {el?.caption.length > 165 ? (
                                        <>
                                            {el?.caption.substr(0, 164)}{' '}
                                            <span className="cursor-pointer italic hover:underline" onClick={() => handleToggleExpand(index)}>
                                                ...Xem thêm
                                            </span>
                                        </>
                                    ) : (
                                        el?.caption
                                    )}
                                </>)}
                            </p>
                        </div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="text-sm text-gray-500 cursor-pointer">{`Xem tất cả ${formatComment(el?.commentsCount)} bình luận`}</div>
                            </DialogTrigger>
                            <DialogContent className="w-full h-[90%]">
                                <DetailPost data={{ id: el?.id, pid: el?._id, shortCode: el?.shortCode }} />
                            </DialogContent>
                        </Dialog>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    )
}

export default Post