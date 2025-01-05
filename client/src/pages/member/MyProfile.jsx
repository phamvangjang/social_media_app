import { apiGetFollower, apiGetFollowing, apiGetPostsByuid } from "@/apis";
import { Avatar, DetailPost, Likes, ModelFollower, ModelFollowing, Share } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MyProfile = () => {
  const currentUser = useSelector(state => state.user.current);
  const { id } = useParams(); // Lấy id từ URL
  const [countFollower, setcountFollower] = useState(null);
  const [countFollowing, setcountFollowing] = useState(null);
  const [arrayFollower, setArrayFollower] = useState([]);
  const [arrayFollowing, setArrayFollowing] = useState([]);
  const [posts, setPosts] = useState([])
  useEffect(
    () => {
      if (id) {
        apiGetFollower(currentUser?._id, currentUser?.token) // Hàm giả lập gọi API
          .then(response => {
            if (response.status === 'success') {
              setcountFollower(response.count); // Cập nhật countFollower
              setArrayFollower(response.data);
            }
          })
          .catch(error => console.error("Error fetching user:", error));
      }
    },
    [currentUser?._id]
  );

  useEffect(
    () => {
      if (id) {
        apiGetFollowing(currentUser?._id, currentUser?.token) // Hàm giả lập gọi API
          .then(response => {
            if (response.status === 'success') {
              setcountFollowing(response.count); // Cập nhật countFollower
              setArrayFollowing(response.data);
            }
          })
          .catch(error => console.error("Error fetching user:", error));
      }
    },
    [currentUser?._id]
  );

  useEffect(
    () => {
      if (currentUser?._id) {
        apiGetPostsByuid(currentUser?._id, currentUser?.token) // Hàm giả lập gọi API
          .then(response => {
            if (response.success) {
              // console.log(response);
              setPosts(response?.data)
            }
          })
          .catch(error => console.error("Error fetching user:", error));
      }
    },
    [currentUser?._id]
  );
  // console.log(posts);
  return (
    <div class="max-w-4xl mx-auto p-4">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <img
            src={currentUser?.avatar || "https://placehold.co/150x150"}
            alt="Profile"
            class="w-36 h-36 rounded-full border-4 border-white"
          />
          <div class="absolute inset-0 rounded-full border-2 border-pink-500" />
        </div>
        <div class="flex-1 gap-3 flex flex-col items-start">
          <div class="flex items-center space-x-2">
            <h2 class="text-2xl font-bold">
              {currentUser.username}
            </h2>
            <i class="fas fa-check-circle text-blue-500" />

            <Dialog>
              <DialogTrigger asChild>
                <button class="ml-4 px-4 py-1 border rounded font-medium bg-[#DBDBDB]">
                  Edit profile
                </button>
              </DialogTrigger>
              <DialogContent >
                <Avatar />
              </DialogContent>
            </Dialog>


            <button class="ml-2 px-4 py-1 border rounded font-medium bg-[#DBDBDB]">
              View archive
            </button>
            <i class="fas fa-ellipsis-h ml-2" />
          </div>

          <div class="mt-2 flex items-center gap-4">
            <div class="flex items-center gap-1">
              <span className="font-bold">{posts?.length || 0}</span>
              <span>bài viết</span>
            </div>

            {/* Người khác theo dõi */}
            <Dialog>
              <DialogTrigger asChild>
                <div class="ml-4 flex items-center gap-1 cursor-pointer">
                  <span className="font-bold">{countFollower || 0}</span>
                  <span>người theo dõi</span>
                </div>
              </DialogTrigger>
              <DialogContent className="w-96">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Người theo dõi
                  </DialogTitle>
                </DialogHeader>
                <ModelFollower data={arrayFollower} />
              </DialogContent>
            </Dialog>

            {/* Đang theo dõi */}
            <Dialog>
              <DialogTrigger asChild>
                <div class="flex items-center gap-2 cursor-pointer">
                  {/* <span>Đang theo dõi</span> */}
                  <strong>{countFollowing}</strong> <span>Đang theo dõi</span>
                </div>
              </DialogTrigger>
              <DialogContent className="w-96">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Đang theo dõi
                  </DialogTitle>
                </DialogHeader>
                <ModelFollowing data={arrayFollowing} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div class="mt-4 border-t">
        <div class="flex justify-around text-sm font-medium text-gray-500">
          <button class="py-2 cursor-pointer border-t-2 border-black">
            BÀI VIẾT
          </button>
          <button class="py-2 cursor-pointer">REELS</button>
          <button class="py-2 cursor-pointer">ĐƯỢC GẮN THẺ</button>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-1 mt-4 ">
        {posts?.length > 0 && posts.map((el) => (
          <Dialog key={el._id}>
            <DialogTrigger asChild>
              <img
                crossOrigin="anonymous"
                src={el.images.length > 0 ? `${el.images[0]}` : el.images}
                alt={`Post ${el._id}`}
                className="w-full mb-4 object-cover cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent className='w-full h-[90%]'>
              <DetailPost data={{ id: el?._id, pid: el?._id, shortCode: el?.shortCode }} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
