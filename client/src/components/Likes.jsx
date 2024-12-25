import React from "react";
import UserLike from "./UserLike";

const Likes = (data) => {
  return (
    <div className="w-full mx-auto bg-white rounded-lg overflow-y-auto no-scrollbar">
      {data.data.arrayUserLike?.map((id) =>
        <div key={id} className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={"https://placehold.co/50x50"}
              alt={"user.alt"}
              className="w-12 h-12 rounded-full mr-4"
            />
            <UserLike key={id} id={id} />
          </div>
          <button className="bg-blue-500 text-white text-sm font-semibold py-1 px-4 rounded">
            Theo dõi
          </button>
        </div>
      )}
    </div>
  );
};

export default Likes;
