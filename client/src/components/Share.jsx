import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { connectSocket, socket } from "../socket";
function containsUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}
function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
}
const Share = ({ data }) => {
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { friends, current } = useSelector((state) => state.user)
  const [arrayUser, setArrayUser] = useState([]);
  const contacts = [
    {
      id: 1,
      name: "tester",
      username: "khidot705 và vangiang10.01",
      img: "https://placehold.co/50x50",
      verified: false
    },
    {
      id: 2,
      name: "Van Giang",
      username: "vangiang10.01",
      img: "https://placehold.co/50x50",
      verified: false
    },
    {
      id: 3,
      name: "Anh Tân",
      username: "khidot705",
      img: "https://placehold.co/50x50",
      verified: false
    },
    {
      id: 4,
      name: "Võ Tấn Lịch",
      username: "lich.vo.14",
      img: "https://placehold.co/50x50",
      verified: false
    },
    {
      id: 5,
      name: "Dwayne Johnson",
      username: "therock",
      img: "https://placehold.co/50x50",
      verified: true
    },
    {
      id: 6,
      name: "tester",
      username: "khidot705 và vangiang10.01",
      img: "https://placehold.co/50x50",
      verified: false
    },
    {
      id: 7,
      name: "Van Giang",
      username: "vangiang10.01",
      img: "https://placehold.co/50x50",
      verified: false
    },
    {
      id: 8,
      name: "Anh Tân",
      username: "khidot705",
      img: "https://placehold.co/50x50",
      verified: false
    },
    {
      id: 9,
      name: "Võ Tấn Lịch",
      username: "lich.vo.14",
      img: "https://placehold.co/50x50",
      verified: false
    },
    {
      id: 10,
      name: "Dwayne Johnson",
      username: "therock",
      img: "https://placehold.co/50x50",
      verified: true
    }
  ];
  console.log(friends);
  console.log(data?.img)

  const handleToggle = (q) => {
    setToggle(true)
    console.log(q)
    setArrayUser(q);
  }

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

  // Send friend request
  console.log(data?.shortCode)
  console.log(arrayUser)
  const share = () => {
    console.log("Sending friend request...");
    console.log(arrayUser)
    const value = `http://localhost:5173/p/${data?.shortCode}`
    const newMessage = {
      message: linkify(value),
      conversation_id: arrayUser,
      from: current?._id,
      to: arrayUser,
      type: containsUrl(value) ? "Link" : "Text",
      preview: data?.img,
      // subtype: containsUrl(value) ? "link" : null,
    };
    socket.emit("text_message", newMessage, (response) => {
      console.log("Sending friend request...");

      console.log("server response", response);
      // dispatch(AddDirectMessage({ message: newMessage }));
      dispatch(UpdateDirectConversations({ conversation: current, message: newMessage }));
      // socket.emit("start_conversations", { to: current?.user_id, from: user_id });
    });
  }


  return (
    <div className=" w-full h-full">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="w-full p-2 border rounded-lg"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-y-scroll h-[256px] no_scrollbar">
        {friends
          .filter(friend =>
            friend.firstName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((contact, index) =>
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={contact.avatar}
                  alt={`${contact.firstName} ${contact.lastName}'s profile`}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold">
                      {contact.firstName} {contact.lastName}
                    </span>
                    {contact.verified &&
                      <i className="fas fa-check-circle text-blue-500 ml-1" />}
                  </div>
                  <span className="text-gray-500 text-sm">
                    {contact.username}
                  </span>
                </div>
              </div>
              <input
                onClick={() => handleToggle(contact._id,)}
                type="radio"
                name="contact"
                className="form-radio" />
            </div>
          )}
      </div>

      {toggle && <Button
        onClick={() => share()}
        className='bg-blue-600 w-full text-white mt-7 hover:bg-blue-500 hover:text-white'
        variant={'outline'}>Gửi</Button>}
    </div>
  );
};

export default Share;
