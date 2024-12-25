import moment from 'moment'
import React from 'react'

const Comments = ({ data }) => {
    const post = data?.post;
    const comments = data?.comments;
    console.log(comments);
    return (
        <div className='flex flex-col h-[420px] overflow-y-scroll no-scrollbar'>
            <div className="flex items-center mb-4 mt-2">
                <img crossOrigin='anonymous' 
                //src="https://instagram.fsgn4-1.fna.fbcdn.net/v/t51.2885-19/118982623_353024589077161_7490638455124782637_n.jpg?stp=dst-jpg_tt6&_nc_ht=instagram.fsgn4-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=ejpoFY0pDsAQ7kNvgHoajPq&_nc_gid=60ae2c75195147dfabaf16d95bc0bc66&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCKcYOfOVyE-GkUBkEYfjJCBtpALC4lKNKMmr0s3YY51A&oe=6749CAE8&_nc_sid=7a9f4b" 
                src={post?.ownerAvatar}
                alt="Profile picture" 
                className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <div>
                        <span className="font-bold">{post?.ownerUsername}
                            <i className="fas fa-check-circle text-blue-500 mx-2"></i>
                        </span>
                        <span>
                            {post?.caption}
                        </span>
                    </div>
                    <div className="text-gray-500 text-sm">{moment(post?.timestamp).fromNow()}</div>
                </div>
            </div>
            {comments && comments.map((el) => (
                <div className="flex items-center mb-4 mt-2 justify-between">
                    <div className='flex items-center'>
                        <img crossOrigin='anonymous'
                            // src={el?.ownerProfilePicUrl
                            //     ? el?.ownerProfilePicUrl
                            //     : 'https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg'}
                            // src='https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg'
                            src={el?.ownerProfilePicUrl}
                            alt="Profile picture"
                            className="w-10 h-10 rounded-full mr-3 object-contain" />
                        <div>
                            <div>
                                <div>
                                    <span className="font-bold mr-2">{el?.ownerUsername}</span>
                                    <span>{el?.text}</span>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <div className="text-gray-500 text-sm">{moment(el?.timestamp).fromNow()}</div>
                                <div className="text-gray-500 text-sm">
                                    <span className='mr-2 cursor-pointer'>{`${el?.likesCount} lượt thích`}</span>
                                    <span className='mr-2 cursor-pointer'>Trả lời </span>
                                </div>
                            </div>
                            {/* <div className="ml-12 text-gray-500 text-sm">Xem câu trả lời (2)</div> */}
                        </div>
                    </div>
                    <span><i className="far fa-heart text-sm mr-2"></i></span>
                </div>
            ))}
        </div>
    )
}

export default Comments