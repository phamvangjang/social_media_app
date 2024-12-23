import React from "react";
import UserLike from "./UserLike";

const Likes = data => {
  const users = [
    {
      username: "anh_quoc2004",
      name: "Anh Quốc",
      img: "https://placehold.co/50x50",
      alt: "Profile picture of Anh Quốc"
    },
    {
      username: "_orla_15",
      name: "",
      img: "https://placehold.co/50x50",
      alt: "Profile picture of _orla_15"
    },
    {
      username: "jiuwoichi",
      name: "Khánh Linh",
      img: "https://placehold.co/50x50",
      alt: "Profile picture of Khánh Linh"
    },
    {
      username: "imhudang",
      name: "Dan",
      img: "https://placehold.co/50x50",
      alt: "Profile picture of Dan"
    },
    {
      username: "_minh_yen",
      name: "Minh Yến",
      img: "https://placehold.co/50x50",
      alt: "Profile picture of Minh Yến"
    },
    {
      username: "thamphanvien.dayne",
      name: "mún dc bế negav",
      img: "https://placehold.co/50x50",
      alt: "Profile picture of mún dc bế negav"
    }
  ];
  console.log(data);
  return (
    <div className="w-full mx-auto bg-white rounded-lg h-[356px] overflow-y-auto no-scrollbar">
      {data.data.arrayUserLike?.map((id) =>
        <div key={id} className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={"https://placehold.co/50x50"}
              alt={"user.alt"}
              className="w-12 h-12 rounded-full mr-4"
            />
          
                <UserLike key={id} id={id} />

            {/* <div>
              <div className="font-bold text-sm">
                {user.username}
              </div>
              <div className="text-gray-500 text-sm">
                {user.name}
              </div>
            </div> */}
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
