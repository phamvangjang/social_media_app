import path from "@/utils/path";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Post } from ".";
import { connectSocket, socket } from "../../socket";
import { apiGetAllUser, apiGetCurrentUser, apiGetFriend, apiRemoveToken } from "@/apis";
import { fetchAllUser, fetchFriends, login } from "@/store/user/userSlice";
import Cookies from 'js-cookie';

// Centralize token handling
const getToken = () => Cookies.get('jwt');
const token = getToken();

const Home = () => {
  const { friends, users, isLoggedIn, current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trigger, setTrigger] = useState(false);
  
  // Determine user ID from URL or current user
  const user_id = window.location.hash ? window.location.hash.split("/")[1] : current?._id;

  // Login check
  useEffect(() => {
    if (!current?._id) {
      window.location.replace("http://localhost:3001/auth/login");
    }
  }, [current]);

  // Fetch current user info
  useEffect(() => {
    if (user_id) {
      apiGetCurrentUser(user_id)
        .then((response) => {
          dispatch(login(response));
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [user_id, dispatch, trigger]);

  // Socket connection
  useEffect(() => {
    if (current?._id) {
      connectSocket(current._id);
      socket.on("message", (data) => {
        console.log(data); // Handle incoming messages here
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [current?._id]);

  // Fetch all users
  useEffect(() => {
    if (current?.token) {
      apiGetAllUser(current.token)
        .then((response) => {
          dispatch(fetchAllUser(response));
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [current?.token, dispatch]);

  // Fetch friends
  useEffect(() => {
    if (current?.token) {
      apiGetFriend(current.token, user_id)
        .then((response) => {
          dispatch(fetchFriends(response));
        })
        .catch((error) => {
          console.error("Error fetching friends:", error);
        });
    }
  }, [current?.token, user_id, dispatch]);

  // Handle token removal and redirect
  const handleRedirect = () => {
    apiRemoveToken(current?._id)
      .then((response) => {
        console.log(response);
        window.location.href = "http://localhost:5173/accounts/login";
      })
      .catch((error) => {
        console.error("Error removing token:", error);
      });
  };

  // Send friend request
  const handleSendRequest = (_id) => {
    console.log("Sending friend request...");
    socket.emit("friend_request", { to: _id, from: current?._id }, (error, result) => {
      if (error) {
        console.error("Failed to send friend request:", error);
      } else {
        setTrigger((prev) => !prev);
        console.log("Friend request sent:", result);
      }
    });
  };

  // Cancel friend request
  const handleCancelRequest = (_id) => {
    console.log("Cancelling friend request...");
    socket.emit("cancel_send_request", { to: _id, from: current?._id }, (error, result) => {
      if (error) {
        console.error("Failed to cancel friend request:", error);
      } else {
        setTrigger((prev) => !prev);
        console.log("Friend request cancelled:", result);
      }
    });
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="w-2/3 p-4">
        {/* Stories */}
        <div className="flex space-x-4 mb-6">
          {["1", "2", "3", "4"].map((_, index) => (
            <div key={index} className="w-16 h-16 rounded-full border-2 border-pink-500 overflow-hidden">
              <img src="https://placehold.co/64x64" alt={`Story ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Post */}
        <Post />
      </div>

      {/* Suggestions */}
      <div className="w-1/3 p-4">
        <div className="flex items-center mb-4">
          <img
            src={current?.avatar||"https://placehold.co/32x32"}
            alt="User"
            className="w-8 h-8 rounded-full mr-2"
          />
          <div>
            <div className="font-bold">{current?.username || "null"}</div>
            <div className="text-gray-500">{current?.firstName} {current?.lastName}</div>
          </div>
          <span className="text-blue-500 ml-auto cursor-pointer" onClick={handleRedirect}>Chuyển</span>
        </div>
        <div className="text-gray-500 font-bold mb-2">Gợi ý cho bạn</div>
        <div className="space-y-4">
          {users ? users.map((el) => (
            <div key={el._id} className="flex items-center">
              <img
                src="https://placehold.co/32x32"
                alt="Suggestion"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <div className="font-bold">{el.username}</div>
                <div className="text-gray-500">
                  {el.friends ? `Có ${el.firstName} và 2 người khác ...` : "Chưa có người theo dõi"}
                </div>
              </div>
              {current?.arrayUserFollowed?.includes(el._id) ? (
                <span className="text-blue-500 ml-auto cursor-pointer" onClick={() => handleCancelRequest(el._id)}>Đang theo dõi</span>
              ) : (
                <span className="text-blue-500 ml-auto cursor-pointer" onClick={() => handleSendRequest(el._id)}>Theo dõi</span>
              )}
            </div>
          )) : (
            <div className="flex items-center">
              <div className="font-bold">Chưa có dữ liệu</div>
            </div>
          )}
        </div>
        <div className="text-gray-500 text-xs mt-6">
          Giới thiệu • Trợ giúp • Báo chí • API • Việc làm • Quyền riêng tư • Điều khoản • Vị trí • Ngôn ngữ
        </div>
        <div className="text-gray-500 text-xs mt-2">Meta đã xác minh</div>
        <div className="text-gray-500 text-xs mt-2">© 2024 INSTAGRAM FROM META</div>
      </div>
    </div>
  );
};

export default Home;
