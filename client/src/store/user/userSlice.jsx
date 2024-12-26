// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

const initialState = {
  isLoggedIn: false,
  current: null,
  token: null,
  isLoading: false,
  mes: "",
  users: [],
  friends: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.success;
      state.current = action.payload.data;
      state.token = action.payload.accessToken;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.current = null;
      state.token = null;
      state.isLoading = false;
      state.mes = "";
    },
    clearMessage: state => {
      state.mes = "";
    },
    likePost: (state, action) => {
      // Cập nhật mảng likePost bằng cách thêm user_id vào mảng hoặc loại bỏ nếu đã có
      const userId = action.payload.userId; // Lấy userId từ payload

      // Lấy postId từ action.payload
      const postId = action.payload.postId;

      // Kiểm tra xem postId đã có trong mảng likePost chưa
      if (state.current.likePostId.includes(postId)) {
        // Nếu bài viết đã được like, bỏ like (loại bỏ postId khỏi mảng)
        state.current.likePostId = state.current.likePostId.filter(
          id => id !== postId
        );
      } else {
        // Nếu bài viết chưa được like, thêm postId vào mảng likePost
        state.current.likePostId = [...state.current.likePostId, postId];
      }
    },
    likeComment: (state, action) => {
      // Cập nhật mảng likeComment bằng cách thêm user_id vào mảng hoặc loại bỏ nếu đã có
      const userId = action.payload.userId; // Lấy userId từ payload

      // Lấy postId từ action.payload
      const commentId = action.payload.commentId;

      // Kiểm tra xem commentId đã có trong mảng likeComment chưa
      if (state.current.likeCommentId.includes(commentId)) {
        // Nếu bài viết đã được like, bỏ like (loại bỏ commentId khỏi mảng)
        state.current.likeCommentId = state.current.likeCommentId.filter(
          id => id !== commentId
        );
      } else {
        // Nếu bài viết chưa được like, thêm commentId vào mảng likeComment
        state.current.likeCommentId = [...state.current.likeCommentId, commentId];
      }
    },

    fetchAllUser: (state, action) => {
      state.users = action.payload.data;
    },
    fetchFriends: (state, action) => {
      state.friends = action.payload.data;
    }
  },

  // Code logic xử lý aync action
  extraReducers: builder => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(actions.getCurrent.pending, state => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.current = action.payload;
      state.isLoggedIn = true;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.current = null;
      state.isLoggedIn = false;
      state.token = null;
      state.mes = "Login session has expired. Please log in again";
    });
  }
});

export const {
  login,
  logout,
  clearMessage,
  likePost,
  likeComment,
  fetchAllUser,
  fetchFriends
} = userSlice.actions;
export default userSlice.reducer;
