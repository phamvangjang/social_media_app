import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: ''
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        resetEmail: (state) => {
            state.email = '';
        }
    },
});

export const { setEmail, resetEmail} = authSlice.actions;
export default authSlice.reducer;   