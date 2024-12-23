import React, { useEffect, useState } from "react";
import { connectSocket, socket } from "../socket";
import { useParams } from "react-router-dom";


const ModelFollower = ({data}) => {
  // const followers = [
  //     { name: "tester", username: "khidot705 và vangiang10.01", img: "https://placehold.co/50x50", verified: false },
  //     { name: "Van Giang", username: "vangiang10.01", img: "https://placehold.co/50x50", verified: false },
  //     { name: "Anh Tân", username: "khidot705", img: "https://placehold.co/50x50", verified: false },
  //     { name: "Võ Tấn Lịch", username: "lich.vo.14", img: "https://placehold.co/50x50", verified: false },
  //     { name: "Dwayne Johnson", username: "therock", img: "https://placehold.co/50x50", verified: true },
  //     { name: "tester", username: "khidot705 và vangiang10.01", img: "https://placehold.co/50x50", verified: false },
  //     { name: "Van Giang", username: "vangiang10.01", img: "https://placehold.co/50x50", verified: false },
  //     { name: "Anh Tân", username: "khidot705", img: "https://placehold.co/50x50", verified: false },
  //     { name: "Võ Tấn Lịch", username: "lich.vo.14", img: "https://placehold.co/50x50", verified: false },
  //     { name: "Dwayne Johnson", username: "therock", img: "https://placehold.co/50x50", verified: true },
  // ];
  const params = useParams();
  console.log(params.id);
    const [trigger, setTrigger] = useState(false);
    const [userId , setUserId] = useState();
    // Socket connection
    useEffect(() => {
        if (params.id) {
          connectSocket(params.id);
          socket.on("message", (data) => {
            console.log(data); // Handle incoming messages here
          });
        }
    
        return () => {
          socket.disconnect();
        };
      }, [params.id]);

  const handleSendRequest = (_id) => {
    console.log("Sending friend request...");
    socket.emit("friend_request", { to: _id, from: params.id }, (error, result) => {
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
    socket.emit("cancel_send_request", { to: _id, from: params.id }, (error, result) => {
      if (error) {
        console.error("Failed to cancel friend request:", error);
      } else {
        setTrigger((prev) => !prev);
        console.log("Friend request cancelled:", result);
      }
    });
  };
   

  return (
    <div className="max-w-sm">
      <div className="">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full pl-10 pr-4 py-1 border rounded-md focus:outline-none bg-[#EFEFEF]"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {data.length === 0
          ? <p>No followers found.</p>
          : <div
              className="space-y-4 overflow-y-auto no-scrollbar"
              style={{ maxHeight: "300px" }}
            >
              {data.map((follower, index) =>
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://placehold.co/50x50"
                      alt={`Profile of ${follower.sender?.username}`}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">
                          {follower.sender?.username}
                        </span>
                        {follower.recipient ? (
                          <span className="text-blue-500 text-sm hover:cursor-pointer" onClick={() => handleSendRequest(follower.sender?._id)}>
                            · Theo dõi
                          </span>) : (
                            <span className="text-blue-500 text-sm hover:cursor-pointer" onClick={() => handleCancelRequest(follower.sender?._id)}>
                            · Đang theo dõi
                          </span>
                          )}
                      </div>
                      <span className="text-gray-500 text-sm">
                        {follower.sender?.firstName} {follower.sender?.lastName}
                      </span>
                    </div>
                  </div>
                  <button className="text-red-500 font-semibold hover:cursor-pointer" onClick={() => handleCancelRequest(follower.sender?._id)}>Xóa</button>
                </div>
              )}
            </div>}
      </div>
    </div>
  );
};

export default ModelFollower;
