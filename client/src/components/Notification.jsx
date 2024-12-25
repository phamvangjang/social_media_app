import { apiGetFollower, apiGetFollowing } from '@/apis';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { connectSocket, socket } from "../socket";

const Notification = () => {
    // const friendRequests = [
    //     { username: 'tdanh_n', name: 'Danh Nguyễn', img: 'https://placehold.co/50x50' },
    //     { username: 'akiofood', name: 'Akio Food', img: 'https://placehold.co/50x50' },
    //     { username: 'musthave.perfume', name: 'Luxury Items', img: 'https://placehold.co/50x50' },
    //     { username: 'itzz.irtuuh_', name: 'itrs.wuhx', img: 'https://placehold.co/50x50' },
    //     { username: 'fiiver.studio', name: 'Fiiver™', img: 'https://placehold.co/50x50' },
    //     { username: '34holic', name: '34 Holic', img: 'https://placehold.co/50x50' },
    //     { username: 'giay.kledkid', name: 'Koko.kokoo', img: 'https://placehold.co/50x50' },
    //     { username: 'tiem_giay_gp', name: 'GIÀY SNEAKER', img: 'https://placehold.co/50x50' },
    //     { username: 'sneaker.rep1', name: 'sneaker.rep1', img: 'https://placehold.co/50x50' },
    //     { username: 'anhthw_0208', name: 'anhthw', img: 'https://placehold.co/50x50' },
    //     { username: 'safari.thanhly', name: 'Tủ đồ xinh', img: 'https://placehold.co/50x50' },
    //     { username: '_han.clothes_', name: 'Han.clothes', img: 'https://placehold.co/50x50' },
    //     { username: 'ph.w.ng24', name: 'Phương', img: 'https://placehold.co/50x50' },
    //     { username: 'sutu8505', name: 'Sư Tử', img: 'https://placehold.co/50x50' },
    //     { username: '_thuylinh20.01', name: 'Nguyễn Thị Thùy Linh', img: 'https://placehold.co/50x50' },
    //     { username: 'fanta.2hand', name: 'fanta.2hand', img: 'https://placehold.co/50x50' },
    // ];

    const currentUser = useSelector(state => state.user.current);
  if (!currentUser) {
    return <div>Loading...</div>;
  }
const { id } = useParams(); // Lấy id từ URL
// console.log(id);
  const [countFollower, setcountFollower] = useState(null);
  const [countFollowing, setcountFollowing] = useState(null);
  const [arrayFollower, setArrayFollower] = useState([]);
  const [arrayFollowing, setArrayFollowing] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  useEffect(
    () => {
      if (currentUser?._id) {
        
        apiGetFollower(currentUser?._id,currentUser?.token) // Hàm giả lập gọi API
        .then(response => {

          if (response.status === 'success') {
            console.log(response.data);

              setcountFollower(response.count); // Cập nhật countFollower
              setArrayFollower(response.data);

            }

      })
          .catch(error => console.error("Error fetching user:", error));
      }
    }
,
    [currentUser?._id]
  );

  console.log(arrayFollower);



  useEffect(
    () => {
      if (currentUser?._id) {
        apiGetFollowing(currentUser?._id,currentUser?.token) // Hàm giả lập gọi API
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
  console.log(arrayFollowing);
  useEffect(() => {
    // Lọc các yêu cầu không trùng lặp
    if (arrayFollower.length > 0 && arrayFollowing.length > 0) {
        const filtered = arrayFollower.filter(follower =>
            !arrayFollowing.some(following => following.recipient._id === follower.sender._id)
        );
        setFilteredRequests(filtered);
    } else {
        setFilteredRequests(arrayFollower); // Hiển thị toàn bộ yêu cầu nếu không có sự giao nhau
    }
}, [arrayFollower, arrayFollowing]);
 // Socket connection
 useEffect(() => {
    if (currentUser?._id) {
      connectSocket(currentUser._id);
      socket.on("message", (data) => {
        console.log(data); // Handle incoming messages here
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [currentUser?._id]);
const handleSendRequest = (_id) => {
    console.log("Sending friend request...");
    socket.emit("friend_request", { to: _id, from: currentUser?._id }, (error, result) => {
      if (error) {
        console.error("Failed to send friend request:", error);
      } else {
        // setTrigger((prev) => !prev);
        console.log("Friend request sent:", result);
      }
    });
  };

  // Cancel friend request
  const handleCancelRequest = (_id) => {
    console.log("Cancelling friend request...");
    socket.emit("cancel_send_request", { to: _id, from: currentUser?._id }, (error, result) => {
      if (error) {
        console.error("Failed to cancel friend request:", error);
      } else {
        // setTrigger((prev) => !prev);
        console.log("Friend request cancelled:", result);
      }
    });
  };
console.log(filteredRequests)
    return (
        <div className='h-screen'>
            <div className='h-[700px] overflow-y-auto'>
                {filteredRequests.map((request, index) => (
                    <div key={index} className="items-center justify-between p-2 border-b w-full grid grid-cols-2">

                        <div className="flex items-center space-x-4 col-span-1">
                            <img src={request.sender.avatar} alt={`Profile picture of ${request.sender?.name}`} className="w-12 h-12 rounded-full" />
                            <div className='flex items-start justify-start flex-col'>
                                <div className="font-bold">{request.sender?.username}</div>
                                <div className="text-gray-500">{request.sender?.name}</div>
                            </div>
                        </div>

                        <div className="flex gap-1 justify-end">
                            <button className="bg-blue-500 text-white hover:bg-blue-500/90 px-4 py-1 rounded cursor-pointer" onClick={() => handleSendRequest(request.sender?._id)}>Confirm</button>
                            <button className="bg-gray-200 text-black hover:bg-gray-200/90 px-4 py-1 rounded cursor-pointer" onClick={() => handleSendRequest(request.sender?._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notification