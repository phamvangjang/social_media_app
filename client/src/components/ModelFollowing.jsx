import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connectSocket, socket } from "../socket";


const ModelFollowing = ({data}) => {
  //   const users = [
  //     {
  //       username: "nguyentienduc2602",
  //       name: "Nguyễn Tiến Đức",
  //       img: "https://placehold.co/50x50",
  //       following: true
  //     },
  //     {
  //       username: "nguyen.huyphu",
  //       name: "Nguyen Huy Phú",
  //       img: "https://placehold.co/50x50",
  //       following: true
  //     },
  //     {
  //       username: "selenagomez",
  //       name: "Selena Gomez",
  //       img: "https://placehold.co/50x50",
  //       following: true,
  //       verified: true
  //     },
  //     {
  //       username: "hung_heoo",
  //       name: "Hùng Trọng Đình",
  //       img: "https://placehold.co/50x50",
  //       following: true
  //     },
  //     {
  //       username: "._tuongvi_",
  //       name: "Tường Vi",
  //       img: "https://placehold.co/50x50",
  //       following: true
  //     },
  //     {
  //       username: "nguyentienduc2602",
  //       name: "Nguyễn Tiến Đức",
  //       img: "https://placehold.co/50x50",
  //       following: true
  //     },
  //     {
  //       username: "nguyen.huyphu",
  //       name: "Nguyen Huy Phú",
  //       img: "https://placehold.co/50x50",
  //       following: true
  //     },
  //     {
  //       username: "selenagomez",
  //       name: "Selena Gomez",
  //       img: "https://placehold.co/50x50",
  //       following: true,
  //       verified: true
  //     },
  //     {
  //       username: "hung_heoo",
  //       name: "Hùng Trọng Đình",
  //       img: "https://placehold.co/50x50",
  //       following: true
  //     },
  //     {
  //       username: "._tuongvi_",
  //       name: "Tường Vi",
  //       img: "https://placehold.co/50x50",
  //       following: true
  //     }
  //   ];
  const params = useParams();
  console.log(data);
  const [trigger, setTrigger] = useState(false);
  const [userId, setUserId] = useState();
  // Socket connection
  useEffect(
    () => {
      if (params.id) {
        connectSocket(params.id);
        socket.on("message", data => {
          console.log(data); // Handle incoming messages here
        });
      }

      return () => {
        socket.disconnect();
      };
    },
    [params.id]
  );

  const handleSendRequest = _id => {
    console.log("Sending friend request...");
    socket.emit(
      "friend_request",
      { to: _id, from: params.id },
      (error, result) => {
        if (error) {
          console.error("Failed to send friend request:", error);
        } else {
          setTrigger(prev => !prev);
          console.log("Friend request sent:", result);
        }
      }
    );
  };

  // Cancel friend request
  const handleCancelRequest = _id => {
    console.log("Cancelling friend request...");
    socket.emit(
      "cancel_send_request",
      { to: _id, from: params.id },
      (error, result) => {
        if (error) {
          console.error("Failed to cancel friend request:", error);
        } else {
          setTrigger(prev => !prev);
          console.log("Friend request cancelled:", result);
        }
      }
    );
  };
  return (
    <div className="max-w-sm">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="w-full p-2 pl-10 border rounded-lg focus:outline-none"
        />
        <i className="fas fa-search absolute left-3 top-3 text-gray-400" />
      </div>
      {data.length === 0
          ? <p>No followers found.</p>
          :
      <div
        className="overflow-y-auto no-scrollbar"
        style={{ maxHeight: "300px" }}
      >
        {data.map((user, index) =>
          <div key={index} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src= {user.recipient?.avatar}
                alt={`Profile of ${user.recipient?.firstName} ${user.recipient?.lastName}`}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <span className="font-semibold">
                    {user.recipient?.username}
                  </span>
                  {user.recipient?.verified &&
                    <i className="fas fa-check-circle text-blue-500 ml-1" />}
                </div>
                <span className="text-gray-500 text-sm">
                  {user.recipient?.firstName} {user.recipient?.lastName}
                </span>
              </div>
            </div>
            <button className="bg-gray-200 text-gray-800 px-4 py-1 rounded-lg">
              Đang theo dõi
            </button>
          </div>
        )}
      </div>
}
    </div>

  );
};

export default ModelFollowing;
