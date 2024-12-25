import { apiGetCurrentUser, apiGetFollower, apiGetFollowing, apiGetPostsByuid } from "@/apis";
import { Likes, ModelFollower, ModelFollowing, Share } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { login } from "@/store/user/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [posts, setPosts] = useState([])

  const { id } = useParams(); // Lấy id từ URL
  // console.log(id);
  const [countFollower, setcountFollower] = useState(null);
  const [countFollowing, setcountFollowing] = useState(null);
  const [arrayFollower, setArrayFollower] = useState([]);
  const [arrayFollowing, setArrayFollowing] = useState([]);
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([])
  
  const dispatch = useDispatch();
  // Fetch current user info
  useEffect(() => {
    if (id) {
      apiGetCurrentUser(id)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [id, dispatch]);

  
    useEffect(
      () => {
        if (id) {
          apiGetPostsByuid(id, currentUser?.token) // Hàm giả lập gọi API
            .then(response => {
              if (response.success) {
                setPost(response.data)
                console.log(response);
                console.log(post);
              }
            })
            .catch(error => console.error("Error fetching user:", error));
        }
      },
      [id]
    );
  const currentUser = useSelector(state => state.user.current);
  if (!currentUser) {
    return <div>Loading...</div>;
  }
  useEffect(
    () => {
      if (id) {
        apiGetFollower(id,currentUser?.token) // Hàm giả lập gọi API
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

  console.log()

  useEffect(
    () => {
      if (id) {
        apiGetFollowing(id,currentUser?.token) // Hàm giả lập gọi API
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

  console.log(user);


  // console.log(currentUser.avatar);
  return (
    <div class="max-w-4xl mx-auto p-4">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <img
            src={user?.avatar || "https://placehold.co/150x150"}
            alt="Profile"
            class="w-36 h-36 rounded-full border-4 border-white"
          />
          <div class="absolute inset-0 rounded-full border-2 border-pink-500" />
        </div>
        <div class="flex-1 gap-3 flex flex-col items-start">
          <div class="flex items-center space-x-2">
            <h2 class="text-2xl font-bold">{user.username}</h2>
            <i class="fas fa-check-circle text-blue-500" />
            <button class="ml-4 px-4 py-1 border rounded font-medium bg-[#DBDBDB]">
              Đang theo dõi
            </button>
            <button class="ml-2 px-4 py-1 border rounded font-medium bg-[#DBDBDB]">
              Nhắn tin
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
                  <span className="font-bold">85,9 Tr</span>
                  <span>người theo dõi</span>
                </div>
              </DialogTrigger>
              <DialogContent className="w-96">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Người theo dõi
                  </DialogTitle>
                </DialogHeader>
                <ModelFollower />
              </DialogContent>
            </Dialog>

            {/* Đang theo dõi */}
            <Dialog>
              <DialogTrigger asChild>
                <div class="flex items-center gap-2 cursor-pointer">
                  <span>Đang theo dõi</span> <strong>0</strong>{" "}
                  <span>người dùng</span>
                </div>
              </DialogTrigger>
              <DialogContent className="w-96">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Đang theo dõi
                  </DialogTitle>
                </DialogHeader>
                <ModelFollowing />
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
        {post ? post.map((el) => (
          <img
            key={el.id}
            src={el.images[0] || el.displayUrl}
            alt={`Post ${el.id}`}
            class="w-full h-full object-cover"
          />
        )) : null}
      </div>
    </div>
  );
};

export default Profile;
