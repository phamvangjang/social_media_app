import React, { useEffect, useState } from 'react'
import { menubars } from '../utils/contants'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Avatar, CreatePost, Notification, Search } from '.';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader } from '@/components/ui/dialog';
import { NavLink } from 'react-router-dom';
import path from '@/utils/path';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { connectSocket, socket } from "../socket";
import { toast } from 'react-toastify';
import { fetchNoti } from '@/store/user/userSlice';
const Sidebar = () => {
    const [activeId, setActiveId] = useState(null);
    const noActive = 'flex items-center gap-4 p-3 cursor-pointer rounded-md hover:bg-[#f2f2f2]';
    const active = 'flex items-center gap-4 p-3 cursor-pointer rounded-md hover:bg-[#f2f2f2] font-extrabold';
    // const { current } = useSelector((state) => state.user);
    // const user_id = window.location.hash ? window.location.hash.split("/")[1] : current?._id;
    // console.log(activeId);
    const { current } = useSelector((state) => state.user);
    const currentUser = useSelector(state => state.user.current);
    const [prev, setPrev] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    // State để quản lý badgeContent
    const [badgeContent, setBadgeContent] = useState(currentUser?.notification ?? 0);
    const dispatch = useDispatch();
    // Hàm xử lý khi bấm vào Badge
    const handleBadgeClick = () => {
        setBadgeContent(0); // Đặt badgeContent về 0
        setIsSheetOpen(true);
        dispatch(delteNoti())
    };
    useEffect(() => {
        if (currentUser?._id) {
            connectSocket(currentUser._id);
            socket.on("message", (data) => {
                console.log(data); // Handle incoming messages here
            });
        }

        return () => {
            socket.disconnect();
        };
    }, [currentUser?._id]);

    useEffect(() => {
        // Kết nối socket nếu chưa kết nối
        if (!socket.connected) {
            socket.connect();
        }

        // Lắng nghe sự kiện "new_friend_request"
        socket.on("new_friend_request", (data) => {
            console.log("New friend request received:", data.to.username);
            setBadgeContent((prev) => prev + 1);
            dispatch(fetchNoti(badgeContent));
            // toast.info(`Bạn có một yêu cầu kết bạn mới: ${data.to.username}`);
            toast.info(
                `Bạn có một yêu cầu kết bạn mới: ${data.to.username}`,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    onClick: () => {
                        // Chuyển hướng hoặc mở modal chi tiết
                        setIsSheetOpen(true);
                        console.log("Clicked on toast! Xem chi tiết về", data.to.username);


                    }
                }
            );
            // alert(data.to.username); // Hiển thị thông báo cho User 2
        });

        // Dọn dẹp khi component unmount
        return () => {
            socket.off("new_friend_request");
        };
    }, [socket]);
    useEffect(() => {
        // Lắng nghe sự kiện "request_send"
        socket.on("request_send", (data) => {
            console.log("Received event:", data);
            // alert(`Message: ${data.message}, To: ${JSON.stringify(data.to)}`);
        });

        // Dọn dẹp khi component bị unmount
        return () => {
            socket.off("request_send");
        };
    }, []);

    console.log(badgeContent);




    return (
        <div className="w-1/4 bg-white h-full border-r border-gray-200">
            <div className="flex flex-col gap-6 justify-between p-4 fixed w-1/4 h-screen bg-white">
                <div className="flex flex-col gap-6">
                    <div className="text-2xl font-bold mb-6">Instagram</div>
                    <div className="space-y-1">
                        <NavLink
                            replace={false}
                            to={`/#loader/${current?._id}`}
                            className={prev ? active : noActive}
                            onClick={() => setActiveId((prev) => setPrev(!prev))}
                        >
                            <span className='text-2xl'><i className="fas fa-home" /></span>
                            <span>Trang chủ</span>
                        </NavLink>
                        {menubars?.map(el => {
                            return (
                                <NavLink
                                    to={el.path}
                                    key={el?.id}
                                    className={activeId === el.id ? active : noActive}
                                    onClick={() => setActiveId(el.id)}>
                                    <span className='text-2xl'>{el?.icon}</span>
                                    <span>{el?.text}</span>
                                </NavLink>
                            )
                        })}
                        {/* Notification */}
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <div onClick={handleBadgeClick} className={noActive}>
                                    <span className='text-2xl'>

                                        {/* <IconButton onClick={() => {
                                            // handleOpenDialog()
                                        }}> */}
                                        <Badge anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }} badgeContent={badgeContent} color="primary">
                                            <i className="fas fa-heart"></i>

                                        </Badge>
                                        {/* <i className="fas fa-heart"></i> */}
                                        {/* </IconButton> */}
                                    </span>
                                    <span>Thông báo</span>
                                </div>
                            </SheetTrigger>
                            <SheetContent className='min-w-[460px]'>
                                <SheetHeader>
                                    <SheetTitle className='text-center'>Thông báo</SheetTitle>
                                </SheetHeader>
                                <Notification />
                            </SheetContent>
                        </Sheet>

                        {/* Create Post */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className={noActive}>
                                    <span className='text-2xl'>
                                        <i className="fas fa-plus-square"></i>
                                    </span>
                                    <span>Tạo</span>
                                </div>
                            </DialogTrigger>
                            <DialogContent className='h-[80%]'>
                                <CreatePost />
                            </DialogContent>
                        </Dialog>

                        {/* Search */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <div className={noActive}>
                                    <span className='text-2xl'>
                                        <i className="fas fa-search"></i>
                                    </span>
                                    <span>Tìm kiếm</span>
                                </div>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Tìm kiếm</SheetTitle>
                                    <SheetDescription>

                                    </SheetDescription>
                                </SheetHeader>
                                <Search />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <div className={noActive}>
                            <span className='text-2xl'><i className="fas fa-bars"></i></span>
                            <span>Xem thêm</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent >
                        <Avatar />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Sidebar