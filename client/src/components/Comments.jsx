import React, { useState, useEffect } from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { apiLikeComment } from '@/apis';
import { likeComment } from '@/store/user/userSlice'; // Redux action

const Comments = ({ data }) => {
    const { current } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [comments, setComments] = useState([]);

    // Đồng bộ lại likesCount khi likeCommentId thay đổi
    useEffect(() => {
        if (data?.comments) {
            setComments(data.comments.map((comment) => ({
                ...comment,
                isLiked: current?.likeCommentId.includes(comment._id),
                // Tính lại likesCount dựa vào trạng thái likeCommentId từ Redux
                likesCount: current?.likeCommentId.includes(comment._id)
                    ? comment.likesCount + 1
                    : comment.likesCount,
            })));
        }
    }, [data?.comments, current?.likeCommentId]);

    // Xử lý sự kiện like/unlike
    const handleToggleLike = async (commentId) => {
        // Cập nhật trực tiếp vào UI mà không cần gọi lại API
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment._id === commentId
                    ? {
                        ...comment,
                        isLiked: !comment.isLiked, // Đảo trạng thái like/unlike
                        likesCount: comment.isLiked
                            ? comment.likesCount - 1
                            : comment.likesCount + 1,
                    }
                    : comment
            )
        );

        try {
            await apiLikeComment({ uid: current?._id, cid: commentId });
            // Cập nhật Redux store với commentId đã like
            dispatch(likeComment({ commentId }));
        } catch (error) {
            console.error("Failed to toggle like:", error);
            // Khôi phục lại trạng thái nếu API thất bại
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment._id === commentId
                        ? {
                            ...comment,
                            isLiked: !comment.isLiked, // Đảo lại trạng thái để đảm bảo UI khớp
                            likesCount: comment.isLiked
                                ? comment.likesCount + 1
                                : comment.likesCount - 1,
                        }
                        : comment
                )
            );
        }
    };

    return (
        <div className="flex flex-col h-[420px] overflow-y-scroll no-scrollbar">
            {comments.map((comment) => (
                <div key={comment._id} className="flex items-center mb-4 mt-2 justify-between">
                    <div className="flex items-center">
                        <img
                            crossOrigin="anonymous"
                            src={comment.ownerProfilePicUrl}
                            alt="Profile picture"
                            className="w-10 h-10 rounded-full mr-3 object-contain"
                        />
                        <div>
                            <div>
                                <span className="font-bold mr-2">{comment.ownerUsername}</span>
                                <span>{comment.text}</span>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-gray-500 text-sm">
                                    {moment(comment.createdAt).fromNow()}
                                </div>
                                <div className="text-gray-500 text-sm">
                                    <span className="mr-2 cursor-pointer">
                                        {`${comment.likesCount} like`}
                                    </span>
                                    <span className="mr-2 cursor-pointer">Trả lời</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span
                        className="cursor-pointer"
                        onClick={() => handleToggleLike(comment._id)}
                    >
                        {current?.likeCommentId?.includes(comment._id) ? (
                            <FaHeart size={20} color="#ff2929" />
                        ) : (
                            <CiHeart size={20} />
                        )}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Comments;
