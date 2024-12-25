import { apiGetAllUser } from "@/apis";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const recentSearches = [
    {
      username: "championsleague",
      name: "UEFA Champions League",
      followers: "118 triệu",
      img: "https://placehold.co/50x50",
      verified: true
    },
    {
      username: "leomessi",
      name: "Leo Messi",
      followers: "504 triệu người theo dõi",
      img: "https://placehold.co/50x50",
      verified: true
    },
    {
      username: "cristiano",
      name: "Cristiano Ronaldo",
      followers: "Đang theo dõi",
      img: "https://placehold.co/50x50",
      verified: true
    },
    {
      username: "taylorswift",
      name: "Taylor Swift",
      followers: "Đang theo dõi",
      img: "https://placehold.co/50x50",
      verified: true
    },
    {
      username: "sontungmtp",
      name: "Sơn Tùng M-TP",
      followers: "7,9 triệu người theo dõi",
      img: "https://placehold.co/50x50",
      verified: true
    },
    {
      username: "instagram",
      name: "Instagram",
      followers: "683 triệu người theo dõi",
      img: "https://placehold.co/50x50",
      verified: true
    },
    {
      username: "jennierubyjane",
      name: "J",
      followers: "Đang theo dõi",
      img: "https://placehold.co/50x50",
      verified: true
    },
    {
      username: "therock",
      name: "The Rock",
      followers: "Đang theo dõi",
      img: "https://placehold.co/50x50",
      verified: true
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiGetAllUser(current.token);
        // console.log(response);
        setUsers(response.data); // Sử dụng setUsers đúng
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (current?.token) fetchUsers();
  }, [current?.token]);
  // console.log(users);
  const filteredSearches = users.filter(
    search =>
      search.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      search.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      search.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleToProfile = (userId) => {
    navigate(`/profile/${userId}`)
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="relative my-4 border-b-2 pb-6">
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="w-full p-2 border rounded-lg pl-8 bg-[#EFEFEF] outline-none"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search absolute top-3 left-3 text-gray-400" />
      </div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Gần đây</h2>
        <a href="#" className="text-blue-500">
          Xóa tất cả
        </a>
      </div>
      <div className="overflow-y-auto no-scrollbar h-[500px]">
        {filteredSearches.map((search, index) =>
          <div key={index} className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => {
            handleToProfile(search._id)
          }}>
            <div className="flex items-center">
              <img
                crossOrigin="anonymous"
                src={search.avatar}
                alt={`${search.name} profile picture`}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <div className="flex items-center">
                  <span className="font-semibold">
                    {search.username}
                  </span>
                  {search.verified &&
                    <i className="fas fa-check-circle text-blue-500 ml-1" />}
                </div>
                <p className="text-gray-500 text-sm">
                  {search.firstName} {search.lastName} • {search.followers}
                </p>
              </div>
            </div>
            <i className="fas fa-times text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
