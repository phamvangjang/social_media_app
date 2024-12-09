import path from "./path";
import {
    MdHomeFilled,
    MdExplore,
    MdVideoCameraFront,
    MdMessage,
    MdAccountCircle,
    MdLibraryAdd
} from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";

export const sidebars = [
    {
        id: 1,
        path: '/',
        text: 'Trang chủ',
        icon: <MdHomeFilled size={30} />
    },
    {
        id: 2,
        path: '/tim-kiem',
        text: 'Tìm kiếm',
        icon: <CiSearch size={30} />
    },
    {
        id: 3,
        path: `/${path.EXPLORE}`,
        text: 'Khám phá',
        icon: <MdExplore size={30} />
    },
    {
        id: 4,
        path: `/${path.REELS}`,
        text: 'Reels',
        icon: <MdVideoCameraFront size={30} />
    },
    {
        id: 5,
        path: `/tin-nhan`,
        text: 'Tin nhắn',
        icon: <MdMessage size={30} />
    },
    {
        id: 6,
        path: `/thong-bao`,
        text: 'Thông báo',
        icon: <FaRegHeart size={30} />
    },
    {
        id: 7,
        path: `/tao-bai-viet`,
        text: 'Tạo',
        icon: <MdLibraryAdd size={30} />
    },
    {
        id: 8,
        path: `/${path.PROFILE}`,
        text: 'Trang cá nhân',
        icon: <MdAccountCircle size={30} />
    },
]