import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'

export const getCurrent = createAsyncThunk('user/current', async (data, { rejecWithValue }) => {
    const response = await apis.getCurrent()
    if (!response.success) return rejecWithValue(response)
    return response.user
})