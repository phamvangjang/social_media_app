// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncActions'

const initialState = {
    isLoggedIn: false,
    current: null,
    token: null,
    isLoading: false,
    mes: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.success;
            state.current = action.payload.userData;
            state.token = action.payload.accessToken
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.current = null;
            state.token = null;
            state.isLoading = false;
            state.mes = ''
        },
        clearMessage: (state) => {
            state.mes = ''
        }
    },

    // Code logic xử lý async action
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action login (Promise pending)
        builder.addCase(actions.getCurrent.pending, (state) => {
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
            state.mes = 'Login session has expired. Please log in again';
        });
    },
});

export const { login, logout, clearMessage } = userSlice.actions;
export default userSlice.reducer