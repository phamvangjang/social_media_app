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
import { useSelector } from "react-redux";
const user_id = window.location.hash.split("/")[1];
console.log(user_id);

export const sidebars = [
  {
    id: 1,
    path: "/",
    text: "Trang chủ",
    icon: <MdHomeFilled size={30} />
  },
  {
    id: 2,
    path: "/tim-kiem",
    text: "Tìm kiếm",
    icon: <CiSearch size={30} />
  },
  {
    id: 3,
    path: `/${path.EXPLORE}`,
    text: "Khám phá",
    icon: <MdExplore size={30} />
  },
  {
    id: 4,
    path: `/${path.REELS}`,
    text: "Reels",
    icon: <MdVideoCameraFront size={30} />
  },
  {
    id: 5,
    path: `/tin-nhan`,
    text: "Tin nhắn",
    icon: <MdMessage size={30} />
  },
  {
    id: 6,
    path: `/thong-bao`,
    text: "Thông báo",
    icon: <FaRegHeart size={30} />
  },
  {
    id: 7,
    path: `/tao-bai-viet`,
    text: "Tạo",
    icon: <MdLibraryAdd size={30} />
  },
  {
    id: 8,
    path: `/${path.PROFILE}/${user_id}`,
    text: "Trang cá nhân",
    icon: <MdAccountCircle size={30} />
  }
];

const path2 = {
  HOME: `#loaded/${current?._id}` // Đường dẫn sẽ có dạng #loaded/{user_id}
};

export const menubars = [
  
  {
    id: 1,
    icon: <i className="fas fa-home" />,
    path: path.HOME,
    text: "Trang chủ"
  },
  {
    id: 2,
    icon: <i className="fas fa-compass" />,
    path: path.EXPLORE,
    text: "Khám phá"
  },
  {
    id: 3,
    icon: <i className="fas fa-video" />,
    path: path.REELS,
    text: "Reels"
  },
  {
    id: 4,
    icon: <i className="fas fa-paper-plane" />,
    path: path.DIRECT_INBOX,
    text: "Tin nhắn"
  },
  {
    id: 5,
    icon: <i className="fas fa-user-circle" />,
    path: `/${path.PROFILE}/${user_id}`,
    text: "Trang cá nhân"
  }
];
