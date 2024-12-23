import { apiGetCurrentUser } from "@/apis";
import React, { useEffect, useState } from "react";

const UserLike = id => {
  const [user, setUser] = useState([]);
  console.log(id.id);
  useEffect(
    () => {
      // Gọi API để lấy thông tin người dùng
      apiGetCurrentUser(id.id)
        .then(response => {
          console.log(response.data);
          //   const users = response.map((res) => res.data);
          setUser(response.data);
          // Lưu thông tin người dùng
        })
        .catch(error => {
          console.error("Error fetching user:", error);
        });
    },
    [id]
  );
  console.log(user.username);
  return (
    <div>
      <div key={user._id}>
        {" "}{/* Ensure each child has a unique key */}
        <div className="font-bold text-sm">{user.username}</div>
        <div className="text-gray-500 text-sm">{user.firstName}</div>
      </div>
    </div>
  );
};

export default UserLike;
