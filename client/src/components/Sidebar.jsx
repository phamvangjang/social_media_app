import React, { useState } from 'react'
import { menubars } from '../utils/contants'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { CreatePost, Notification, Search } from '.';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader } from '@/components/ui/dialog';
import { NavLink } from 'react-router-dom';
import path from '@/utils/path';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const [activeId, setActiveId] = useState(null);
    const noActive = 'flex items-center gap-4 p-3 cursor-pointer rounded-md hover:bg-[#f2f2f2]';
    const active = 'flex items-center gap-4 p-3 cursor-pointer rounded-md hover:bg-[#f2f2f2] font-extrabold';
    // const { current } = useSelector((state) => state.user);
    // const user_id = window.location.hash ? window.location.hash.split("/")[1] : current?._id;
    // console.log(activeId);
    const { current } = useSelector((state) => state.user);
    const [prev, setPrev] = useState(false);
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
                        <Sheet>
                            <SheetTrigger asChild>
                                <div className={noActive}>
                                    <span className='text-2xl'>
                                        <i className="fas fa-heart"></i>
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
                <div className={noActive}>
                    <span className='text-2xl'><i className="fas fa-bars"></i></span>
                    <span>Xem thêm</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar