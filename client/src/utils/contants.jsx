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
// console.log(user_id);


// const path2 = {
//   HOME: `#loaded/${current?._id}` // Đường dẫn sẽ có dạng #loaded/{user_id}
// };

export const menubars = [
  // {
  //   id: 1,
  //   icon: <i className="fas fa-home" />,
  //   path: path.HOME,
  //   text: "Trang chủ"
  // },
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
    path: `/${path.MYPROFILE}/${user_id}`,
    text: "Trang cá nhân"
  }
];
