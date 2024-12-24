import { apiGetFollower, apiGetFollowing, apiGetPostsByuid } from "@/apis";
import { Likes, ModelFollower, ModelFollowing, Share } from "@/components";
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
  const [posts, setPosts] = useState([])
  const [uid, setUid] = useState('')
  const currentUser = useSelector(state => state.user.current);
  // if (!currentUser) {
  //   return <div>Loading...</div>;
  // }
  const { id } = useParams(); // Lấy id từ URL

  const [countFollower, setcountFollower] = useState(null);
  const [countFollowing, setcountFollowing] = useState(null);
  const [arrayFollower, setArrayFollower] = useState([]);
  const [arrayFollowing, setArrayFollowing] = useState([]);
  useEffect(
    () => {
      if (id) {
        apiGetFollower(id, currentUser?.token) // Hàm giả lập gọi API
          .then(response => {
            if (response.status === 'success') {
              setcountFollower(response.count); // Cập nhật countFollower
              setArrayFollower(response.data);
            }
          })
          .catch(error => console.error("Error fetching user:", error));
      }
    },
    [id]
  );

  useEffect(
    () => {
      if (id) {
        apiGetFollowing(id, currentUser?.token) // Hàm giả lập gọi API
          .then(response => {
            if (response.status === 'success') {
              setcountFollowing(response.count); // Cập nhật countFollower
              setArrayFollowing(response.data);
            }
          })
          .catch(error => console.error("Error fetching user:", error));
      }
    },
    [id]
  );
  // setUid(currentUser._id);
  // useEffect(() => {
  //   const response = apiGetPostsByuid(uid)
  //   console.log(response)
  // }, [currentUser._id, uid]);
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
            <button class="ml-4 px-4 py-1 border rounded font-medium bg-[#DBDBDB]">
              Edit profile
            </button>
            <button class="ml-2 px-4 py-1 border rounded font-medium bg-[#DBDBDB]">
              View archive
            </button>
            <i class="fas fa-ellipsis-h ml-2" />
          </div>

          <div class="mt-2 flex items-center gap-4">
            <div class="flex items-center gap-1">
              <span className="font-bold">1.186</span>
              <span>bài viết</span>
            </div>

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
      <div class="grid grid-cols-3 gap-1 mt-4">
        <img
          src="https://placehold.co/300x300"
          alt="Post 1"
          class="w-full h-full object-cover"
        />
        <img
          src="https://placehold.co/300x300"
          alt="Post 2"
          class="w-full h-full object-cover"
        />
        <img
          src="https://placehold.co/300x300"
          alt="Post 3"
          class="w-full h-full object-cover"
        />
        <img
          src="https://placehold.co/300x300"
          alt="Post 4"
          class="w-full h-full object-cover"
        />
        <img
          src="https://placehold.co/300x300"
          alt="Post 5"
          class="w-full h-full object-cover"
        />
        <img
          src="https://placehold.co/300x300"
          alt="Post 6"
          class="w-full h-full object-cover"
        />
        <img
          src="https://placehold.co/300x300"
          alt="Post 1"
          class="w-full h-full object-cover"
        />
        <img
          src="https://placehold.co/300x300"
          alt="Post 2"
          class="w-full h-full object-cover"
        />
        <img
          src="https://placehold.co/300x300"
          alt="Post 3"
          class="w-full h-full object-cover"
        />
        <img
          src="https://placehold.co/300x300"
          alt="Post 4"
          class="w-full h-full object-cover"
        />
        <img
          src="https://placehold.co/300x300"
          alt="Post 5"
          class="w-full h-full object-cover"
        />
        <img
          src="https://placehold.co/300x300"
          alt="Post 6"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default MyProfile;
