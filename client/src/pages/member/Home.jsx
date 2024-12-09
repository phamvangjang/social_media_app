import path from '@/utils/path'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Post } from '.'

const Home = () => {
  const { isLoggedIn, current } = useSelector(state => state.user);
  const navigate = useNavigate();
  if (!isLoggedIn || !current) return <Navigate to={`${path.ACCOUNTS}/${path.LOGIN}`} replace={true} />
  return (
    <div className='flex'>
      {/* Main Content */}
      <div className="w-2/3 p-4">
        {/* Stories */}
        <div className="flex space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full border-2 border-pink-500 overflow-hidden">
            <img src="https://placehold.co/64x64" alt="Story 1" />
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-pink-500 overflow-hidden">
            <img src="https://placehold.co/64x64" alt="Story 2" />
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-pink-500 overflow-hidden">
            <img src="https://placehold.co/64x64" alt="Story 3" />
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-pink-500 overflow-hidden">
            <img src="https://placehold.co/64x64" alt="Story 4" />
          </div>
        </div>

        {/* Post */}
        <Post />
      </div>

      {/* Suggestions */}
      <div className="w-1/3 p-4">
        <div className="flex items-center mb-4">
          <img src="https://placehold.co/32x32" alt="User" className="w-8 h-8 rounded-full mr-2" />
          <div>
            <div className="font-bold">vanngiangg2k3</div>
            <div className="text-gray-500">Văn Giang</div>
          </div>
          <span className="text-blue-500 ml-auto">Chuyển</span>
        </div>
        <div className="text-gray-500 font-bold mb-2">Gợi ý cho bạn</div>
        <div className="space-y-4">
          <div className="flex items-center">
            <img src="https://placehold.co/32x32" alt="Suggestion 1" className="w-8 h-8 rounded-full mr-2" />
            <div>
              <div className="font-bold">instagram</div>
              <div className="text-gray-500">Có ttnammm_299 và 2 người ...</div>
            </div>
            <span className="text-blue-500 ml-auto">Theo dõi</span>
          </div>
          <div className="flex items-center">
            <img src="https://placehold.co/32x32" alt="Suggestion 2" className="w-8 h-8 rounded-full mr-2" />
            <div>
              <div className="font-bold">huongnguyen.59</div>
              <div className="text-gray-500">Có uyenphi1509 và 2 người ...</div>
            </div>
            <span className="text-blue-500 ml-auto">Theo dõi</span>
          </div>
          <div className="flex items-center">
            <img src="https://placehold.co/32x32" alt="Suggestion 3" className="w-8 h-8 rounded-full mr-2" />
            <div>
              <div className="font-bold">dangquy_</div>
              <div className="text-gray-500">Có ttnammm_299 và 7 người ...</div>
            </div>
            <span className="text-blue-500 ml-auto">Theo dõi</span>
          </div>
          <div className="flex items-center">
            <img src="https://placehold.co/32x32" alt="Suggestion 4" className="w-8 h-8 rounded-full mr-2" />
            <div>
              <div className="font-bold">tranchithank</div>
              <div className="text-gray-500">Có ttnammm_299 và 5 người ...</div>
            </div>
            <span className="text-blue-500 ml-auto">Theo dõi</span>
          </div>
          <div className="flex items-center">
            <img src="https://placehold.co/32x32" alt="Suggestion 5" className="w-8 h-8 rounded-full mr-2" />
            <div>
              <div className="font-bold">nguyen.ngoc.tieu.thu</div>
              <div className="text-gray-500">Có ttnammm_299 và 3 người ...</div>
            </div>
            <span className="text-blue-500 ml-auto">Theo dõi</span>
          </div>
        </div>
        <div className="text-gray-500 text-xs mt-6">
          Giới thiệu • Trợ giúp • Báo chí • API • Việc làm • Quyền riêng tư • Điều khoản • Vị trí • Ngôn ngữ
        </div>
        <div className="text-gray-500 text-xs mt-2">
          Meta đã xác minh
        </div>
        <div className="text-gray-500 text-xs mt-2">
          © 2024 INSTAGRAM FROM META
        </div>
      </div>

    </div>
  )
}

export default Home