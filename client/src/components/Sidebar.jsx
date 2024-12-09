import React from 'react'
import { sidebars } from '../utils/contants'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
    const noActive = 'flex items-center gap-4 p-3 cursor-pointer rounded-md hover:bg-[#f2f2f2]';
    const active = 'flex items-center gap-4 p-3 cursor-pointer rounded-md hover:bg-[#f2f2f2] font-bold';
    return (
        // <div
        //     className='w-[244px] border-r-[1px] border-gray-400 flex justify-center'>
        //     <div
        //         className='flex flex-col gap-1'>
        //         <Link
        //             className='text-2xl font-whisper p-3 mb-4 cursor-pointer'>
        //             Instagram
        //         </Link>
        //         {sidebars.map(el => {
        //             return (
        //                 <NavLink
        //                     key={el.id}
        //                     to={el.path}
        //                     className={({ isActive }) => isActive ? active : noActive}>
        //                     <span>{el.icon}</span>
        //                     <span>{el.text}</span>
        //                 </NavLink>
        //             )
        //         })}
        //     </div>
        // </div>
        <div className="w-1/4 bg-white h-full border-r border-gray-200">
            <div className="flex flex-col gap-6 justify-between p-4 fixed w-1/4 h-screen bg-white">
                <div className="flex flex-col gap-6">
                    <div className="text-2xl font-bold mb-6">Instagram</div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-home"></i>
                            <span>Trang chủ</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-search"></i>
                            <span>Tìm kiếm</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-compass"></i>
                            <span>Khám phá</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-video"></i>
                            <span>Reels</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-paper-plane"></i>
                            <span>Tin nhắn</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-heart"></i>
                            <span>Thông báo</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-plus-square"></i>
                            <span>Tạo</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-user-circle"></i>
                            <span>Trang cá nhân</span>
                        </div>

                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <i className="fas fa-bars"></i>
                    <span>Xem thêm</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar